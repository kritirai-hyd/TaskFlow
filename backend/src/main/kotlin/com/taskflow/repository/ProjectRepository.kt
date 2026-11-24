package com.taskflow.repository
import com.taskflow.entity.Project
import org.springframework.data.jpa.repository.JpaRepository
interface ProjectRepository : JpaRepository<Project, Long> {
    fun findAllByUser_IdOrderByCreatedAtDesc(userId: Long): List<Project>
    fun findByIdAndUser_Id(id: Long, userId: Long): Project?
}