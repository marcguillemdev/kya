package com.quarzumagencia.kya.Services.PreAnnotations;

import com.quarzumagencia.kya.Entities.Extends.DomainExtends;
import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Entities.Post;
import com.quarzumagencia.kya.Repositories.PostRepository;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DomainValidationServiceImpl implements IValidationService<DomainExtends> {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PostRepository postRepository;

    @Override
    public void prePersist(DomainExtends entidadParaModificar) throws Exception {
        this.createRoleIfNotExists(entidadParaModificar);
    }

    @Override
    public void preUpdate(DomainExtends entidadParaActualizar) throws Exception {

    }

    @Override
    public void preRemove(DomainExtends entidadParaBorrar) throws Exception {
        this.unlinkEntities(entidadParaBorrar);
    }

    @Override
    public void postPersist(DomainExtends entidadActualizada) throws Exception {

    }

    @Override
    public void postUpdate(DomainExtends entidadActualizada) throws Exception {

    }

    @Override
    public void postRemove(DomainExtends entidadBorrada) throws Exception {

    }

    private void createRoleIfNotExists(DomainExtends domain) throws Exception {
        String roleName = "ROLE_" + domain.getDomainName().toUpperCase(Locale.ROOT);
        RolExtends rolParaCrear = new RolExtends();
        rolParaCrear.setRolNombre(roleName);
        rolParaCrear.setRequiredDomain(Collections.singleton(domain));
        rolRepository.save(rolParaCrear);
    }

    // Seteamos a null las entidades referenciadas al dominio borrado
    private void unlinkEntities(DomainExtends domain) throws Exception {
        Set<RolExtends> unlinkedRoles;
        List<Post> unlinkedPosts;
        String roleName = "ROLE_" + domain.getDomainName().toUpperCase(Locale.ROOT);
        RolExtends rolParaEliminar = rolRepository.findByRolNombre(roleName).orElse(null);

        if(domain.getPosts() != null && domain.getPosts().size() > 0) {
            unlinkedPosts = unlinkPostsAndReturnList(domain);
            domain.setPosts(unlinkedPosts);
        }
        if(domain.getRequiredRole() != null) {
            unlinkedRoles = unlinkRolesAndReturnList(domain);
            domain.setRequiredRole(unlinkedRoles);

        }
        if(rolParaEliminar != null) {
            rolRepository.delete(rolParaEliminar);
        }
    }

    private List<Post> unlinkPostsAndReturnList(DomainExtends domain) throws Exception {
        List<Post> unlinkedPosts = domain.getPosts().stream().map(post -> {
            post.setDomain(null);
            return post;
        }).collect(Collectors.toList());
        domain.setPosts(Collections.emptyList());
        return unlinkedPosts;
    }

    private Set<RolExtends> unlinkRolesAndReturnList(DomainExtends domain) throws Exception {
        String roleName = "ROLE_" + domain.getDomainName().toUpperCase(Locale.ROOT);
        return domain.getRequiredRole().stream().map(rol -> {
            rol.getRequiredDomain().remove(domain);
            if(rol.getRolNombre().equalsIgnoreCase(roleName)) {
                Set<Usuario> usersHavingRole = rol.getUsersHavingRole().stream().map(user -> {
                    user.getRoles().remove(rol);
                    return user;
                }).collect(Collectors.toSet());
                rol.setUsersHavingRole(usersHavingRole);
            }
            return rol;
        }).collect(Collectors.toSet());
    }

}
