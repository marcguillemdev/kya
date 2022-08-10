package com.quarzumagencia.kya.Security.JWT;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.quarzumagencia.kya.Models.Exceptions.UnauthorizedException;
import com.quarzumagencia.kya.Security.Entities.UsuarioPrincipal;
import com.quarzumagencia.kya.Security.Models.JwtDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtProvider {
    private final static Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;

    public String generateToken(Authentication authentication){
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) authentication.getPrincipal();
        List<String> roles = usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        logger.info("Expiration date: " + new Date(new Date().getTime() + expiration * 180L).getTime());
        return Jwts.builder().setSubject(usuarioPrincipal.getUsername())
                .setIssuedAt(new Date())
                .claim("roles", roles)
                .setExpiration(new Date(new Date().getTime() + expiration * 180L))
                .signWith(getSignedKey())
                .compact();
    }

    public String getNombreUsuarioFromToken(String token){
        return Jwts.parserBuilder().setSigningKey(getSignedKey()).build().parseClaimsJws(token).getBody().getSubject();
    }

    private Key getSignedKey() {
        byte[] keyBytes = this.secret.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(getSignedKey()).build().parseClaimsJws(token);
            return true;
        }catch (MalformedJwtException e){
            logger.error("token mal formado");
        }catch (UnsupportedJwtException e){
            logger.error("token no soportado");
            throw new UnauthorizedException("Token no soportado");
        }catch (ExpiredJwtException e){
            logger.error("token expirado");
            return false;
        }catch (IllegalArgumentException e){
            logger.error("token vacío");
        }catch (SecurityException e){
            logger.error("fail en la firma");
        }
        return false;
    }

    public String refreshToken(JwtDto jwtDto) throws ParseException {
        logger.info("Expiration date: " + new Date(new Date().getTime() + expiration * 180L).getTime());
        JWT jwt = JWTParser.parse(jwtDto.getToken());
        JWTClaimsSet claims = jwt.getJWTClaimsSet();
        String nombreUsuario = claims.getSubject();
        List<String> roles = (List<String>)claims.getClaim("roles");

        return Jwts.builder()
                .setSubject(nombreUsuario)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + expiration * 180L))
                .signWith(getSignedKey())
                .compact();
    }
}