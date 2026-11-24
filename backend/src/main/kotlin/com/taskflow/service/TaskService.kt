package com.taskflow.service
import com.taskflow.dto.*
import com.taskflow.entity.*
import com.taskflow.repository.*
import org.springframework.data.jpa.domain.Specification
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import java.time.LocalDate
@Service
class TaskService(
    private val taskRepository: TaskRepository,
    private val projectRepository: ProjectRepository,
    private val userRepository: UserRepository
) {
    private fun findOwnedProject(id: Long, email: String) =
        projectRepository.findByIdAndUser_Id(
            id, userRepository.findByEmail(email)?.id
                ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        ) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found")
    private fun findTask(taskId: Long, projectId: Long) =
        taskRepository.findByIdAndProject_Id(taskId, projectId)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found")
    private fun findAssignee(id: Long?) = id?.let {
        userRepository.findById(it).orElseThrow {
            ResponseStatusException(HttpStatus.NOT_FOUND, "Assignee not found")
        }
    }
    private fun toResponse(task: Task) = TaskResponse(
        id = task.id!!, title = task.title, description = task.description,
        status = task.status, priority = task.priority, dueDate = task.dueDate,
        assigneeId = task.assignee?.id, assigneeName = task.assignee?.name,
        projectId = task.project.id!!, createdAt = task.createdAt,
        updatedAt = task.updatedAt
    )
    fun createTask(projectId: Long, request: CreateTaskRequest, userEmail: String) =
        toResponse(taskRepository.save(Task(
            title = request.title.trim(),
            description = request.description?.trim(),
            priority = request.priority,
            dueDate = request.dueDate,
            assignee = findAssignee(request.assigneeId),
            project = findOwnedProject(projectId, userEmail)
        )))
    fun getProjectTasks(
        projectId: Long, userEmail: String,
        status: TaskStatus?, priority: Priority?
    ): List<TaskResponse> {
        findOwnedProject(projectId, userEmail)
        var spec = Specification<Task> { root, _, cb ->
            cb.equal(root.get<Project>("project").get<Long>("id"), projectId)
        }
        status?.let {
            spec = spec.and(Specification { root, _, cb ->
                cb.equal(root.get<TaskStatus>("status"), it)
            })
        }
        priority?.let {
            spec = spec.and(Specification { root, _, cb ->
                cb.equal(root.get<Priority>("priority"), it)
            })
        }
        return taskRepository.findAll(spec).map(::toResponse)
    }
    fun getTaskById(projectId: Long, taskId: Long, userEmail: String): TaskResponse {
        findOwnedProject(projectId, userEmail)
        return toResponse(findTask(taskId, projectId))
    }
    fun updateTask(
        projectId: Long, taskId: Long,
        request: UpdateTaskRequest, userEmail: String
    ) = findOwnedProject(projectId, userEmail).let {
        val task = findTask(taskId, projectId).apply {
            title = request.title.trim()
            description = request.description?.trim()
            priority = request.priority
            dueDate = request.dueDate
            assignee = findAssignee(request.assigneeId)
        }
        toResponse(taskRepository.save(task))
    }
    fun updateTaskStatus(
        projectId: Long, taskId: Long,
        request: UpdateTaskStatusRequest, userEmail: String
    ) = findOwnedProject(projectId, userEmail).let {
        toResponse(taskRepository.save(
            findTask(taskId, projectId).apply { status = request.status }
        ))
    }
    fun deleteTask(projectId: Long, taskId: Long, userEmail: String) {
        findOwnedProject(projectId, userEmail)
        taskRepository.delete(findTask(taskId, projectId))
    }
    fun getProjectSummary(projectId: Long, userEmail: String): ProjectSummaryResponse {
        findOwnedProject(projectId, userEmail)
        val tasks = taskRepository.findAllByProject_Id(projectId)
        val today = LocalDate.now()
        return ProjectSummaryResponse(
            totalTasks = tasks.size.toLong(),
            todoCount = tasks.count { it.status == TaskStatus.TODO }.toLong(),
            inProgressCount = tasks.count { it.status == TaskStatus.IN_PROGRESS }.toLong(),
            doneCount = tasks.count { it.status == TaskStatus.DONE }.toLong(),
            overdueCount = tasks.count {
                it.status != TaskStatus.DONE && it.dueDate?.isBefore(today) == true
            }.toLong()
        )
    }
}
