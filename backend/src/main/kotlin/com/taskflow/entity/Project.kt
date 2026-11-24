package com.taskflow.entity
import jakarta.persistence.*
import java.time.LocalDateTime
@Entity
@Table(name = "projects")
data class Project(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    var name: String,
    var description: String? = null,
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    val user: User,
    val createdAt: LocalDateTime = LocalDateTime.now()
)