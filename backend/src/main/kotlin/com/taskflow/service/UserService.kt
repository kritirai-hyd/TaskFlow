package com.taskflow.service
import com.taskflow.dto.*
import com.taskflow.entity.User
import com.taskflow.repository.UserRepository
import com.taskflow.config.JwtService
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
@Service
class UserService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService
) {
    fun register(request: RegisterRequest): AuthResponse {
    val email = request.email.trim().lowercase()
    if (userRepository.existsByEmail(email)) {
        throw ResponseStatusException(
            HttpStatus.CONFLICT,
            "Email already exists"
        )
    }
    val user = userRepository.save(
        User(
            name = request.name.trim(),
            email = email,
            passwordHash = passwordEncoder.encode(request.password)
                ?: throw IllegalStateException("Password encoding failed")
        )
    )
    return AuthResponse(
        jwtService.generateToken(user.email),
        user.toResponse()
    )
}
    fun login(request: LoginRequest): AuthResponse {
        val email = request.email.trim().lowercase()
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(email, request.password)
        )
        val user = userRepository.findByEmail(email)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "User not found")
        return AuthResponse(jwtService.generateToken(user.email), user.toResponse())
    }
    fun findByEmail(email: String) = userRepository.findByEmail(email.trim().lowercase())
    private fun User.toResponse() = UserResponse(
        id = requireNotNull(id), name = name, email = email, createdAt = createdAt
    )
}
