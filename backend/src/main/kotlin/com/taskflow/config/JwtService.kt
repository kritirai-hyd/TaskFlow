package com.taskflow.config
import io.jsonwebtoken.*
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.Date
@Service
class JwtService(
    @Value("\${app.jwt.secret}") secret: String,
    @Value("\${app.jwt.expiration-ms}") private val expirationMs: Long
) {
    private val key by lazy { Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret)) }
    fun generateToken(email: String): String {
        val now = Date()
        return Jwts.builder()
            .subject(email)
            .issuedAt(now)
            .expiration(Date(now.time + expirationMs))
            .signWith(key)
            .compact()
    }
    fun extractUsername(token: String) = parseClaims(token).subject
    fun isTokenValid(token: String, username: String) = try {
        val claims = parseClaims(token)
        claims.subject == username && claims.expiration.after(Date())
    } catch (e: JwtException) {
        false
    } catch (e: IllegalArgumentException) {
        false
    }
    private fun parseClaims(token: String): Claims =
        Jwts.parser().verifyWith(key).build().parseSignedClaims(token).payload
}
