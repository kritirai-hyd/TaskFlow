package com.taskflow.controller
import com.taskflow.dto.CreateProjectRequest
import com.taskflow.dto.ProjectResponse
import com.taskflow.dto.UpdateProjectRequest
import com.taskflow.service.ProjectService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*
@RestController
@RequestMapping("/api/projects")
class ProjectController(private val projectService: ProjectService) {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createProject(@Valid @RequestBody request: CreateProjectRequest, authentication: Authentication): ProjectResponse =
        projectService.createProject(request, authentication.name)
    @GetMapping
    fun getAllProjects(authentication: Authentication): List<ProjectResponse> =
        projectService.getAllProjects(authentication.name)
    @GetMapping("/{id}")
    fun getProjectById(@PathVariable id: Long, authentication: Authentication): ProjectResponse =
        projectService.getProjectById(id, authentication.name)
    @PutMapping("/{id}")
    fun updateProject(@PathVariable id: Long, @Valid @RequestBody request: UpdateProjectRequest, authentication: Authentication): ProjectResponse =
        projectService.updateProject(id, request, authentication.name)
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteProject(@PathVariable id: Long, authentication: Authentication) =
        projectService.deleteProject(id, authentication.name)
}
