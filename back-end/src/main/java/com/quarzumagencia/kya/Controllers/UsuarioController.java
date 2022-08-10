package com.quarzumagencia.kya.Controllers;

import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Models.ChangePassword;
import com.quarzumagencia.kya.Security.Models.NuevoUsuario;
import com.quarzumagencia.kya.Security.Models.UpdateUsuario;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import com.quarzumagencia.kya.Security.Services.AuthenticationService;
import com.quarzumagencia.kya.Security.Services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationService authenticationService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<UsuarioExtends> getUsuarios() {
        return usuarioService.getAllUsers();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/rol/all")
    public List<RolExtends> getAllRoles() {
        return usuarioService.getAllRoles();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/register")
    public void registerUser(@RequestBody NuevoUsuario usuario) {
        authenticationService.register(usuario);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/update")
    public void updateUser(@RequestBody UpdateUsuario usuario) {
        if(usuario.getUsuarioModificado().getPassword() != null && !usuario.getUsuarioModificado().getPassword().isEmpty()) {
            authenticationService.changePasswordToUser(
                    new ChangePassword(
                            usuarioRepository.findByNombreUsuario(usuario.getUsuarioOriginal().getNombreUsuario()).get().getPassword(),
                            usuario.getUsuarioModificado().getPassword()), usuario.getUsuarioOriginal().getNombreUsuario()
            );
        }
        usuarioService.updateUser(usuario.getUsuarioModificado());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/delete")
    public void deleteUser(@RequestBody UsuarioExtends usuario) {
        usuarioService.deleteUser(usuario);
    }

}
