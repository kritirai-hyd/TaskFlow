package com.taskflow.controller
import com.taskflow.dto.*
import com.taskflow.entity.Priority
import com.taskflow.entity.TaskStatus
import com.taskflow.service.TaskService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
@RestController
@RequestMapping("/api/projects/{projectId}/tasks")
class TaskController(private val taskService: TaskService) {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createTask(@PathVariable projectId: Long, @Valid @RequestBody request: CreateTaskRequest, authentication: Authentication): TaskResponse =
        taskService.createTask(projectId, request, authentication.name)
    @GetMapping
    fun getProjectTasks(@PathVariable projectId: Long, @RequestParam(required = false) status: TaskStatus?, @RequestParam(required = false) priority: Priority?, authentication: Authentication): List<TaskResponse> =
        taskService.getProjectTasks(projectId, authentication.name, status, priority)
    @GetMapping("/{taskId}")
    fun getTaskById(@PathVariable projectId: Long, @PathVariable taskId: Long, authentication: Authentication): TaskResponse =
        taskService.getTaskById(projectId, taskId, authentication.name)
    @PutMapping("/{taskId}")
    fun updateTask(@PathVariable projectId: Long, @PathVariable taskId: Long, @Valid @RequestBody request: UpdateTaskRequest, authentication: Authentication): TaskResponse =
        taskService.updateTask(projectId, taskId, request, authentication.name)
    @PatchMapping("/{taskId}/status")
    fun updateTaskStatus(@PathVariable projectId: Long, @PathVariable taskId: Long, @Valid @RequestBody request: UpdateTaskStatusRequest, authentication: Authentication): TaskResponse =
        taskService.updateTaskStatus(projectId, taskId, request, authentication.name)
    @DeleteMapping("/{taskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteTask(@PathVariable projectId: Long, @PathVariable taskId: Long, authentication: Authentication) =
        taskService.deleteTask(projectId, taskId, authentication.name)
    @GetMapping("/summary")
    fun getProjectSummary(@PathVariable projectId: Long, authentication: Authentication): ProjectSummaryResponse =
        taskService.getProjectSummary(projectId, authentication.name)
}
