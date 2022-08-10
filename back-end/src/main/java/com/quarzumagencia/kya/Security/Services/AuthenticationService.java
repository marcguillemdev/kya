package com.quarzumagencia.kya.Security.Services;

import com.quarzumagencia.kya.Entities.PasswordTokenRecovery;
import com.quarzumagencia.kya.Models.Exceptions.GenericException;
import com.quarzumagencia.kya.Models.Mensaje;
import com.quarzumagencia.kya.Repositories.PasswordTokenRecoveryRepository;
import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import com.quarzumagencia.kya.Security.Entities.UsuarioPrincipal;
import com.quarzumagencia.kya.Security.JWT.JwtProvider;
import com.quarzumagencia.kya.Security.Models.*;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import com.quarzumagencia.kya.Services.EmailService.IEmailService;
import com.quarzumagencia.kya.Services.Utils.StringUtilsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthenticationService {

    @Value("${frontend.url}")
    private String frontendUrl;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private IEmailService emailService;

    @Autowired
    private RolService rolService;

    @Autowired
    private PasswordTokenRecoveryRepository passwordTokenRecoveryRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    public JwtDto login(LoginUsuario loginUsuario) {
        Authentication authentication;
        UserDetails userDetails;
        String jwt;
        try {
            authentication = checkCredentials(loginUsuario.getNombreUsuario(), loginUsuario.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            if (SecurityContextHolder.getContext().getAuthentication().getAuthorities().size() > 0) {
                jwt = jwtProvider.generateToken(authentication);
                return new JwtDto(jwt);
            } else {
                throw new GenericException("Tu usuario no tiene permisos para acceder a ningun recurso");
            }

        } finally {
            authentication = null;
            userDetails = null;
            jwt = null;
        }
    }

    public Mensaje register(NuevoUsuario nuevoUsuario) {
        Set<Rol> roles = new HashSet<>();
        UsuarioExtends usuario =
                new UsuarioExtends(nuevoUsuario.getNombre(), nuevoUsuario.getNombreUsuario(), nuevoUsuario.getEmail(),
                        passwordEncoder.encode(nuevoUsuario.getPassword()));

        if (nuevoUsuario.getRoles() != null && nuevoUsuario.getRoles().size() > 0) {
            for (String rolNombre : nuevoUsuario.getRoles()) {
                roles.add(rolService.getByRolNombre(rolNombre).get());
            }
            usuario.setRoles(roles);
        }
        usuarioService.save(usuario);
        return new Mensaje("usuario guardado");
    }

    public Authentication checkCredentials(String nombreUsuario, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(nombreUsuario, password));
    }

    public boolean changePassword(ChangePassword changePassword) {
        UsuarioPrincipal usuarioPrincipal;
        UsuarioExtends usuario;
        try {
            usuarioPrincipal = (UsuarioPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            usuario = usuarioService.getByNombreUsuario(usuarioPrincipal.getUsername()).get();
            if (passwordEncoder.matches(changePassword.getActualPassword(), usuario.getPassword())) {
                usuario.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
                usuario.setNombreUsuario(usuarioPrincipal.getUsername());
                usuario.setEmail(usuarioPrincipal.getEmail());
                usuario.setNombre(usuarioPrincipal.getNombre());
                usuarioService.save(usuario);
                return true;
            }
            return false;
        } finally {
            usuarioPrincipal = null;
            usuario = null;
        }
    }

    public void changePasswordToUser(ChangePassword changePassword, String nombreUsuario) {
        UsuarioExtends usuario;
        try {
            usuario = usuarioService.getByNombreUsuario(nombreUsuario).get();
            usuario.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
            usuarioService.save(usuario);
        } finally {
            usuario = null;
        }
    }

    public void forgotPassword(ForgotPassword email) {
        PasswordTokenRecovery passwordTokenRecovery;
        String uuid;
        if (usuarioService.existsByEmail(email.getEmail())) {

            uuid = StringUtilsService.getUuid();
            passwordTokenRecovery = new PasswordTokenRecovery();
            passwordTokenRecovery.setUsuario(usuarioService.getByEmail(email.getEmail()).get());
            passwordTokenRecovery.setUuid(uuid);
            passwordTokenRecoveryRepository.save(passwordTokenRecovery);

            emailService.sendEmail(email.getEmail(), "Recuperar contraseña", "Hola " + email.getEmail() + ",\n\n" +
                    "Para recuperar tu contraseña, ingresa al siguiente link: \n\n" +
                    frontendUrl + "/forgot-password/" + uuid + "\n\n" +
                    "Gracias,\n" +
                    "Equipo KYA");
        }
    }

    public void resetPassword(String uuid) {
        UsuarioExtends usuario;
        PasswordTokenRecovery passwordTokenRecovery = passwordTokenRecoveryRepository.findByUuid(uuid);

        if (passwordTokenRecovery != null) {
            usuario = passwordTokenRecoveryRepository.findByUuid(uuid).getUsuario();
            usuario.setPassword(passwordEncoder.encode(uuid));
            usuarioService.save(usuario);
            passwordTokenRecoveryRepository.delete(passwordTokenRecovery);
        }
    }

    public boolean validateToken(ValidateToken jwtDto) {
        return this.jwtProvider.validateToken(jwtDto.getToken());
    }

}
