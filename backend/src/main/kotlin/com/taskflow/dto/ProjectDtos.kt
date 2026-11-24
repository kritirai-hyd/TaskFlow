package com.taskflow.dto
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size
import java.time.LocalDateTime
data class CreateProjectRequest(
    @field:NotBlank(message = "Please enter project name")
    @field:Size(max = 120)
    val name: String,
    @field:Size(max = 2000)
    val description: String? = null
)
data class UpdateProjectRequest(
    @field:NotBlank(message = "Please enter project name")
    @field:Size(max = 120)
    val name: String,
    @field:Size(max = 2000)
    val description: String? = null
)
data class ProjectResponse(
    val id: Long,
    val name: String,
    val description: String?,
    val ownerId: Long,
    val createdAt: LocalDateTime
)
