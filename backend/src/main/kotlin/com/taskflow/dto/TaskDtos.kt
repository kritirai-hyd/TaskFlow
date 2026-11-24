package com.taskflow.dto
import com.taskflow.entity.Priority
import com.taskflow.entity.TaskStatus
import jakarta.validation.constraints.FutureOrPresent
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.LocalDate
import java.time.LocalDateTime
data class CreateTaskRequest(
    @field:NotBlank
    @field:Size(max = 120)
    val title: String,
    @field:Size(max = 2000)
    val description: String? = null,
    val priority: Priority = Priority.MEDIUM,
    @field:NotNull
    @field:FutureOrPresent
    val dueDate: LocalDate,
    val assigneeId: Long? = null
)
data class UpdateTaskRequest(
    @field:NotBlank
    @field:Size(max = 120)
    val title: String,
    @field:Size(max = 2000)
    val description: String? = null,
    val priority: Priority = Priority.MEDIUM,
    @field:NotNull
    @field:FutureOrPresent
    val dueDate: LocalDate,
    val assigneeId: Long? = null
)
data class UpdateTaskStatusRequest(
    @field:NotNull
    val status: TaskStatus
)
data class TaskResponse(
    val id: Long,
    val title: String,
    val description: String?,
    val status: TaskStatus,
    val priority: Priority,
    val dueDate: LocalDate,
    val assigneeId: Long?,
    val assigneeName: String?,
    val projectId: Long,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
data class ProjectSummaryResponse(
    val totalTasks: Long,
    val todoCount: Long,
    val inProgressCount: Long,
    val doneCount: Long,
    val overdueCount: Long
)
