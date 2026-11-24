package com.taskflow.entity
import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime
enum class TaskStatus {
    TODO,
    IN_PROGRESS,
    DONE
}
enum class Priority {
    LOW,
    MEDIUM,
    HIGH
}
@Entity
@Table(name = "tasks")
class Task(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    @Column(nullable = false, length = 120)
    var title: String,
    @Column(columnDefinition = "TEXT")
    var description: String? = null,
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    var status: TaskStatus = TaskStatus.TODO,
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    var priority: Priority = Priority.MEDIUM,
    @Column(nullable = false)
    var dueDate: LocalDate,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    var project: Project,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignee_id")
    var assignee: User? = null,
    @Column(nullable = false, updatable = false)
    var createdAt: LocalDateTime = LocalDateTime.now(),
    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    @PreUpdate
    fun updateTimestamp() {
        updatedAt = LocalDateTime.now()
    }
}
