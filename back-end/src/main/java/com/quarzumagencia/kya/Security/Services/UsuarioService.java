package com.quarzumagencia.kya.Security.Services;

import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Models.Exceptions.NotFoundException;
import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import com.quarzumagencia.kya.Security.Models.NuevoUsuario;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    public List<UsuarioExtends> getAllUsers() {
        return usuarioRepository.findAll();
    }

    public void updateUser(UsuarioExtends usuario) {
        UsuarioExtends usuarioBD = usuarioRepository.findByEmail(usuario.getEmail()).get();
        if (usuarioBD != null) {
            usuarioBD.setNombreUsuario(usuario.getNombreUsuario());
            usuarioBD.setEmail(usuario.getEmail());
            usuarioBD.setRoles(getRolesFromDB(usuario.getRoles()));
            usuarioBD.setNombre(usuario.getNombre());
            usuarioRepository.save(usuarioBD);
        } else {
            throw new NotFoundException("Usuario no encontrado");
        }
    }

    public void deleteUser(UsuarioExtends usuario) {
        UsuarioExtends usuarioBD = usuarioRepository.findByEmail(usuario.getEmail()).get();
        usuarioRepository.delete(usuarioBD);
    }

    public List<RolExtends> getAllRoles() {
        return rolRepository.findAll();
    }

    public void registerUser(NuevoUsuario nuevoUsuario) {
        //this.authenticationService.register(nuevoUsuario);
    }

    public Optional<UsuarioExtends> getByNombreUsuario(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario);
    }

    public Optional<UsuarioExtends> getByEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public boolean existsByNombreUsuario(String nombreUsuario) {
        return usuarioRepository.existsByNombreUsuario(nombreUsuario);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public void save(UsuarioExtends usuario) {
        usuarioRepository.save(usuario);
    }

    private Set<Rol> getRolesFromDB(Set<Rol> rolesUser) {
        Set<Rol> roles = new HashSet<>();
        for (Rol r : rolesUser) {
            roles.add(rolRepository.findByRolNombre(r.getRolNombre()).get());
        }
        return roles;
    }
}
