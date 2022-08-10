package com.quarzumagencia.kya.Services.PreAnnotations;

import com.quarzumagencia.kya.Entities.Post;
import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UsuarioValidationServiceImpl implements IValidationService<UsuarioExtends>{

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;


    @Override
    public void prePersist(UsuarioExtends entidadParaModificar) throws Exception {

    }

    @Override
    public void preUpdate(UsuarioExtends entidadParaActualizar) throws Exception {

    }

    @Override
    public void preRemove(UsuarioExtends entidadParaBorrar) throws Exception {
        this.unlinkRelations(entidadParaBorrar);
    }

    @Override
    public void postPersist(UsuarioExtends entidadActualizada) throws Exception {

    }

    @Override
    public void postUpdate(UsuarioExtends entidadActualizada) throws Exception {

    }

    @Override
    public void postRemove(UsuarioExtends entidadBorrada) throws Exception {

    }

    private void unlinkRelations(UsuarioExtends entidadParaBorrar) throws Exception {
        Set<Post> posts = entidadParaBorrar.getPosts().stream().map(
                post -> {
                    post.setAuthors(null);
                    return post;
                }
        ).collect(Collectors.toSet());
        Set<Rol> roles = entidadParaBorrar.getRoles().stream().map(
                rol -> {
                    rol.getUsersHavingRole().remove(entidadParaBorrar);
                    return rol;
                }
        ).collect(Collectors.toSet());
        entidadParaBorrar.setRoles(roles);
        entidadParaBorrar.setPosts(posts);
    }
}
