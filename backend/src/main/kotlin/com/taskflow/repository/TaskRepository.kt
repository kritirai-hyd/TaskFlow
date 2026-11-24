package com.taskflow.repository
import com.taskflow.entity.Task
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor
interface TaskRepository :
    JpaRepository<Task, Long>,
    JpaSpecificationExecutor<Task> {
    fun findAllByProject_Id(projectId: Long): List<Task>
    fun findByIdAndProject_Id(id: Long, projectId: Long): Task?
}
