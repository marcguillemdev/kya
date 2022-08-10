package com.quarzumagencia.kya.Security.Services;

import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Enums.RolNombre;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RolService {

    @Autowired
    RolRepository rolRepository;

    public Optional<RolExtends> getByRolNombre(String rolNombre) {
        return rolRepository.findByRolNombre(rolNombre);
    }

    public void save(RolExtends rol) {
        rolRepository.save(rol);
    }
}
