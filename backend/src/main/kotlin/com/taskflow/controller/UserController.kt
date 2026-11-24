package com.taskflow.controller
import com.taskflow.dto.*
import com.taskflow.service.UserService
import org.springframework.web.bind.annotation.*
@RestController
@RequestMapping("/api/auth")
class UserController(
    private val userService: UserService
) {
    @PostMapping("/register")
    fun register(@RequestBody request: RegisterRequest) =
        userService.register(request)
    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest) =
        userService.login(request)
}