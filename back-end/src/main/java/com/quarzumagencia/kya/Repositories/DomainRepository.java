package com.quarzumagencia.kya.Repositories;

import com.quarzumagencia.kya.Entities.Domain;
import com.quarzumagencia.kya.Entities.Extends.DomainExtends;
import com.quarzumagencia.kya.Security.Entities.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DomainRepository extends JpaRepository<DomainExtends, Long> {

    Optional<DomainExtends> findByDomainName(String domainName);
    DomainExtends findByRequiredRole(Rol requiredRole);

}
