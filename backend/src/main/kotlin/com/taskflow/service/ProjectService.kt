package com.taskflow.service
import com.taskflow.dto.*
import com.taskflow.entity.Project
import com.taskflow.repository.*
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
@Service
class ProjectService(
    private val projectRepository: ProjectRepository,
    private val userRepository: UserRepository
) {
    private fun findUser(email: String) =
        userRepository.findByEmail(email)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
    private fun findOwnedProject(id: Long, email: String) =
        projectRepository.findByIdAndUser_Id(id, findUser(email).id!!)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found")
    private fun toResponse(project: Project) = ProjectResponse(
        id = project.id!!, name = project.name,
        description = project.description, ownerId = project.user.id!!,
        createdAt = project.createdAt
    )
    fun createProject(request: CreateProjectRequest, userEmail: String) =
        toResponse(projectRepository.save(Project(
            name = request.name.trim(),
            description = request.description?.trim(),
            user = findUser(userEmail)
        )))
    fun getAllProjects(userEmail: String) =
        projectRepository.findAllByUser_IdOrderByCreatedAtDesc(findUser(userEmail).id!!)
            .map(::toResponse)
    fun getProjectById(projectId: Long, userEmail: String) =
        toResponse(findOwnedProject(projectId, userEmail))
    fun updateProject(projectId: Long, request: UpdateProjectRequest, userEmail: String) =
        findOwnedProject(projectId, userEmail).let {
            it.name = request.name.trim()
            it.description = request.description?.trim()
            toResponse(projectRepository.save(it))
        }
    fun deleteProject(projectId: Long, userEmail: String) =
        projectRepository.delete(findOwnedProject(projectId, userEmail))
}
