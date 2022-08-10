package com.quarzumagencia.kya.Security.Repositories;

import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Enums.RolNombre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<RolExtends, Integer> {
    Optional<RolExtends> findByRolNombre(String rolNombre);
}
