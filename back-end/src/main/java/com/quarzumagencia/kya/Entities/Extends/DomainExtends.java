package com.quarzumagencia.kya.Entities.Extends;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quarzumagencia.kya.Entities.Domain;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Services.PreAnnotations.DomainValidationServiceImpl;
import com.quarzumagencia.kya.Services.Utils.SpringAutoWireTool;

import javax.persistence.*;
import java.util.Set;

@Entity
public class DomainExtends extends Domain {

    @Transient
    @JsonIgnore
    DomainValidationServiceImpl domainValidatorService;

    public DomainExtends(Long id, String domainName, String domainDescription, String domainUrl, String domainLogo) {
        super(id, domainName, domainDescription, domainUrl, domainLogo);
    }

    public DomainExtends() {
    }

    @PreUpdate
    private void preUpdate() throws Exception {
        if (domainValidatorService == null) {
            domainValidatorService = SpringAutoWireTool.bean(DomainValidationServiceImpl.class);
        }
        domainValidatorService.preUpdate(this);
    }

    @PostUpdate
    private void postUpdate() throws Exception {
        if (domainValidatorService == null) {
            domainValidatorService = SpringAutoWireTool.bean(DomainValidationServiceImpl.class);
        }
        domainValidatorService.postUpdate(this);
    }

    @PrePersist
    private void prePersist() throws Exception {
        if (domainValidatorService == null) {
            domainValidatorService = SpringAutoWireTool.bean(DomainValidationServiceImpl.class);
        }
        domainValidatorService.prePersist(this);
    }

    @PostPersist
    private void postPersist() throws Exception {
        if (domainValidatorService == null) {
            domainValidatorService = SpringAutoWireTool.bean(DomainValidationServiceImpl.class);
        }
        domainValidatorService.postPersist(this);
    }

    @PreRemove
    private void preRemove() throws Exception {
        if (domainValidatorService == null) {
            domainValidatorService = SpringAutoWireTool.bean(DomainValidationServiceImpl.class);
        }
        domainValidatorService.preRemove(this);
    }

    @PostRemove
    private void postRemove() throws Exception {
        if (domainValidatorService == null) {
            domainValidatorService = SpringAutoWireTool.bean(DomainValidationServiceImpl.class);
        }
        domainValidatorService.postRemove(this);
    }

}
