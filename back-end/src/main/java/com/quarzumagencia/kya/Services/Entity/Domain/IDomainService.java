package com.quarzumagencia.kya.Services.Entity.Domain;

import com.quarzumagencia.kya.Entities.Domain;
import com.quarzumagencia.kya.Entities.Extends.DomainExtends;

import java.util.List;

public interface IDomainService {

    List<DomainExtends> getDomains();
    List<DomainExtends> getAllDomains();

    void registerDomain(DomainExtends domain);

    void updateDomain(DomainExtends domain);

    void deleteDomain(DomainExtends domain);

}
