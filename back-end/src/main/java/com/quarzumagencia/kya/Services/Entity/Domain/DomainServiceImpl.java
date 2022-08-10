package com.quarzumagencia.kya.Services.Entity.Domain;

import com.quarzumagencia.kya.Entities.Domain;
import com.quarzumagencia.kya.Entities.Extends.DomainExtends;
import com.quarzumagencia.kya.Entities.Post;
import com.quarzumagencia.kya.Repositories.DomainRepository;
import com.quarzumagencia.kya.Security.Entities.Rol;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import com.quarzumagencia.kya.Security.Entities.UsuarioPrincipal;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DomainServiceImpl implements IDomainService {

    @Autowired
    private DomainRepository domainRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Override
    public List<DomainExtends> getDomains() {
        UsuarioPrincipal usuarioPrincipal = (UsuarioPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Usuario usuario = usuarioRepository.findByNombreUsuario(usuarioPrincipal.getUsername()).get();
        Set<Rol> roles = usuario.getRoles();
        List<DomainExtends> domain = new ArrayList<>();
        Rol rolTemporal;
        if(usuario.getRoles().stream().anyMatch(rol -> rol.getRolNombre().equals("ROLE_ADMIN"))) {
            return domainRepository.findAll();
        }
        for (Rol rol : roles) {
            rolTemporal = rolRepository.findByRolNombre(rol.getRolNombre()).get();
            domain.add(domainRepository.findByRequiredRole(rolTemporal));
        }
        return domain;
    }

    @Override
    public List<DomainExtends> getAllDomains() {
        return domainRepository.findAll();
    }

    @Override
    public void registerDomain(DomainExtends domain) {
        domainRepository.save(domain);
    }

    @Override
    public void updateDomain(DomainExtends domain) {
        domainRepository.save(domain);
    }

    @Override
    @Transactional
    public void deleteDomain(DomainExtends domain) {
        DomainExtends domainDB = domainRepository.findByDomainName(domain.getDomainName()).get();
        domainRepository.delete(domainDB);
    }
}
