package com.quarzumagencia.kya.Entities.Extends;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Services.PreAnnotations.RolValidationServiceImpl;
import com.quarzumagencia.kya.Services.Utils.SpringAutoWireTool;

import javax.persistence.*;

@Entity
public class RolExtends extends Rol {
    @Transient
    @JsonIgnore
    RolValidationServiceImpl rolValidationServiceImpl;

    public RolExtends() {
    }

    public RolExtends(String rolNombre) {
        super(rolNombre);
    }

    @PreUpdate
    private void preUpdate() throws Exception {
        if (rolValidationServiceImpl == null) {
            rolValidationServiceImpl = SpringAutoWireTool.bean(RolValidationServiceImpl.class);
        }
        rolValidationServiceImpl.preUpdate(this);
    }

    @PostUpdate
    private void postUpdate() throws Exception {
        if (rolValidationServiceImpl == null) {
            rolValidationServiceImpl = SpringAutoWireTool.bean(RolValidationServiceImpl.class);
        }
        rolValidationServiceImpl.postUpdate(this);
    }

    @PrePersist
    private void prePersist() throws Exception {
        if (rolValidationServiceImpl == null) {
            rolValidationServiceImpl = SpringAutoWireTool.bean(RolValidationServiceImpl.class);
        }
        rolValidationServiceImpl.prePersist(this);
    }

    @PostPersist
    private void postPersist() throws Exception {
        if (rolValidationServiceImpl == null) {
            rolValidationServiceImpl = SpringAutoWireTool.bean(RolValidationServiceImpl.class);
        }
        rolValidationServiceImpl.postPersist(this);
    }

    @PreRemove
    private void preRemove() throws Exception {
        if (rolValidationServiceImpl == null) {
            rolValidationServiceImpl = SpringAutoWireTool.bean(RolValidationServiceImpl.class);
        }
        rolValidationServiceImpl.preRemove(this);
    }

    @PostRemove
    private void postRemove() throws Exception {
        if (rolValidationServiceImpl == null) {
            rolValidationServiceImpl = SpringAutoWireTool.bean(RolValidationServiceImpl.class);
        }
        rolValidationServiceImpl.postRemove(this);
    }

}
