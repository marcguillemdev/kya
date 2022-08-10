package com.quarzumagencia.kya.Security.Entities.Extends;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import com.quarzumagencia.kya.Services.PreAnnotations.UsuarioValidationServiceImpl;
import com.quarzumagencia.kya.Services.Utils.SpringAutoWireTool;

import javax.persistence.*;

@Entity
public class UsuarioExtends extends Usuario {

    @Transient
    @JsonIgnore
    UsuarioValidationServiceImpl usuarioValidationService;

    public UsuarioExtends() {
    }

    public UsuarioExtends(String nombre, String nombreUsuario, String email, String password) {
        super(nombre, nombreUsuario, email, password);
    }

    @PreUpdate
    private void preUpdate() throws Exception {
        if (usuarioValidationService == null) {
            usuarioValidationService = SpringAutoWireTool.bean(UsuarioValidationServiceImpl.class);
        }
        usuarioValidationService.preUpdate(this);
    }

    @PostUpdate
    private void postUpdate() throws Exception {
        if (usuarioValidationService == null) {
            usuarioValidationService = SpringAutoWireTool.bean(UsuarioValidationServiceImpl.class);
        }
        usuarioValidationService.postUpdate(this);
    }

    @PrePersist
    private void prePersist() throws Exception {
        if (usuarioValidationService == null) {
            usuarioValidationService = SpringAutoWireTool.bean(UsuarioValidationServiceImpl.class);
        }
        usuarioValidationService.prePersist(this);
    }

    @PostPersist
    private void postPersist() throws Exception {
        if (usuarioValidationService == null) {
            usuarioValidationService = SpringAutoWireTool.bean(UsuarioValidationServiceImpl.class);
        }
        usuarioValidationService.postPersist(this);
    }

    @PreRemove
    private void preRemove() throws Exception {
        if (usuarioValidationService == null) {
            usuarioValidationService = SpringAutoWireTool.bean(UsuarioValidationServiceImpl.class);
        }
        usuarioValidationService.preRemove(this);
    }

    @PostRemove
    private void postRemove() throws Exception {
        if (usuarioValidationService == null) {
            usuarioValidationService = SpringAutoWireTool.bean(UsuarioValidationServiceImpl.class);
        }
        usuarioValidationService.postRemove(this);
    }


}
