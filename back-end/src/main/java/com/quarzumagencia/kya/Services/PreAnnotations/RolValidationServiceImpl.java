package com.quarzumagencia.kya.Services.PreAnnotations;

import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RolValidationServiceImpl implements IValidationService<RolExtends> {

    @Override
    public void prePersist(RolExtends entidadParaModificar) throws Exception {

    }

    @Override
    public void preUpdate(RolExtends entidadParaActualizar) throws Exception {

    }

    @Override
    public void preRemove(RolExtends entidadParaBorrar) throws Exception {
        this.unlinkUsersFromRole(entidadParaBorrar);
    }

    @Override
    public void postPersist(RolExtends entidadActualizada) throws Exception {

    }

    @Override
    public void postUpdate(RolExtends entidadActualizada) throws Exception {

    }

    @Override
    public void postRemove(RolExtends entidadBorrada) throws Exception {

    }

    private void unlinkUsersFromRole(RolExtends role) throws Exception {
        Set<Usuario> usersHavingRole = role.getUsersHavingRole().stream().map(
                user -> {
                    user.getRoles().remove(role);
                    return user;
                }
        ).collect(Collectors.toSet());
        role.setUsersHavingRole(usersHavingRole);
    }
}
