package com.quarzumagencia.kya.Security.Controllers;

import com.quarzumagencia.kya.Models.Exceptions.BadRequestException;
import com.quarzumagencia.kya.Models.Mensaje;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import com.quarzumagencia.kya.Security.Enums.RolNombre;
import com.quarzumagencia.kya.Security.JWT.JwtProvider;
import com.quarzumagencia.kya.Security.Models.*;
import com.quarzumagencia.kya.Security.Services.AuthenticationService;
import com.quarzumagencia.kya.Security.Services.RolService;
import com.quarzumagencia.kya.Security.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    RolService rolService;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    private AuthenticationService authenticationService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/nuevo")
    public Mensaje nuevo(@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return new Mensaje("campos mal puestos o email inválido");
        if (usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario()))
            return new Mensaje("ese nombre ya existe");
        if (usuarioService.existsByEmail(nuevoUsuario.getEmail()))
            return new Mensaje("ese email ya existe");
        return authenticationService.register(nuevoUsuario);
    }

    @PostMapping("/login")
    public JwtDto login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new BadRequestException("Usuario o contraseña no válidos");
        return authenticationService.login(loginUsuario);
    }

    @PostMapping("/change-password")
    public Mensaje changePassword(@Valid @RequestBody ChangePassword changePassword, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new BadRequestException("Error en los campos");
        if (authenticationService.changePassword(changePassword)) {
            return new Mensaje("contraseña cambiada");
        }
        throw new BadCredentialsException("Error al cambiar la contraseña");
    }

    @PostMapping("/forgot-password")
    public Mensaje forgotPassword(@Valid @RequestBody ForgotPassword email, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new BadRequestException("Error en los campos");
        authenticationService.forgotPassword(email);
        return new Mensaje("Si tu email está registrado, te hemos enviado un correo con un enlace para cambiar tu contraseña");

    }

    @PostMapping("/reset-password")
    public Mensaje resetPassword(@Valid @PathVariable String uuid, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new BadRequestException("Error en los campos");
        authenticationService.resetPassword(uuid);
        return new Mensaje("Contraseña cambiada");
    }

    @PostMapping("/validate-token")
    public boolean checkToken(@Valid @RequestBody ValidateToken jwto, BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new BadRequestException("Error al leer el token");
        return authenticationService.validateToken(jwto);
    }

    @PostMapping("/refresh-token")
    public JwtDto refresh(@RequestBody JwtDto jwtDto) throws ParseException, ParseException {
        String token = jwtProvider.refreshToken(jwtDto);
        return new JwtDto(token);
    }

}
