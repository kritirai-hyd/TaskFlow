package com.taskflow.config
import com.taskflow.repository.UserRepository
import org.springframework.security.core.userdetails.*
import org.springframework.stereotype.Service
@Service
class CustomUserDetailsService(
    private val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByEmail(username)
            ?: throw UsernameNotFoundException("User not found")
        return User.withUsername(user.email)
            .password(user.passwordHash)
            .authorities("ROLE_USER")
            .build()
    }
}
