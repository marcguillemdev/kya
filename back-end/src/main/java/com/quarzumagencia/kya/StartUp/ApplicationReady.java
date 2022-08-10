package com.quarzumagencia.kya.StartUp;

import com.quarzumagencia.kya.Entities.Extends.DomainExtends;
import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import com.quarzumagencia.kya.Entities.Post;
import com.quarzumagencia.kya.Repositories.DomainRepository;
import com.quarzumagencia.kya.Repositories.PostRepository;
import com.quarzumagencia.kya.Security.Enums.RolNombre;
import com.quarzumagencia.kya.Security.Models.NuevoUsuario;
import com.quarzumagencia.kya.Security.Repositories.RolRepository;
import com.quarzumagencia.kya.Security.Repositories.UsuarioRepository;
import com.quarzumagencia.kya.Security.Services.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import javax.transaction.Transactional;
import java.util.*;

@Component
public class ApplicationReady {

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private DomainRepository domainRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PostRepository postRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void setupInitialData() {
        this.addRolesIfNotExists();
        this.addDomainsIfNotExists();
        this.addUsersIfNotExists();
        this.addPostsIfNotExists();
    }

    private void addPostsIfNotExists() {
        postRepository.save(
                new Post(
                        Collections.singletonList(usuarioRepository.findAll().get(0)),
                        new Date(),
                        "Final Fantasy: Los orígenes más raros de sus invocaciones",
                        "Contenido",
                        domainRepository.findById(1L).get()
                )
        );
        postRepository.save(
                new Post(
                        Collections.singletonList(usuarioRepository.findAll().get(0)),
                        new Date(),
                        "Esta semana en GTA Online: Descuentos, Luxury Autos, vehículos y más",
                        "Contenido",
                        domainRepository.findById(1L).get()
                )
        );
        postRepository.save(
                new Post(
                        Arrays.asList(usuarioRepository.findAll().get(2)),
                        new Date(),
                        "Koch Media recibe un cambio de nombre y pasa a llamarse PLAION",
                        "Contenido",
                        domainRepository.findById(1L).get()
                )
        );
    }

    private void addRolesIfNotExists() {
        if(rolRepository.findByRolNombre(RolNombre.ROLE_ADMIN.toString()).isEmpty()) {
            rolRepository.save(new RolExtends(RolNombre.ROLE_ADMIN.toString()));
            rolRepository.flush();
        }
        /*if(rolRepository.findByRolNombre("ROLE_CBSOL.ES").isEmpty()) {
            rolRepository.save(new Rol("ROLE_CBSOL.ES"));
            rolRepository.flush();
        }
        if(rolRepository.findByRolNombre("ROLE_QUARZUMAGENCIA.COM").isEmpty()) {
            rolRepository.save(new Rol("ROLE_QUARZUMAGENCIA.COM"));
            rolRepository.flush();
        }*/
    }

    private void addDomainsIfNotExists() {
        if(domainRepository.findByDomainName("quarzumagencia.com").isEmpty()) {
            domainRepository.save(new DomainExtends(null, "quarzumagencia.com", "Web de Quazum Agencia de diseño web", "https://quarzumagencia.com", null));
        }
        if(domainRepository.findByDomainName("cbsol.es").isEmpty()) {
            domainRepository.save(new DomainExtends(null, "cbsol.es", "Web de CBSOL coordinacion de servicios y reformas", "https://cbsol.es", null));
        }
    }

    private void addUsersIfNotExists() {
        if(usuarioRepository.findByNombreUsuario("admin").isEmpty()) {
            authenticationService.register(
                    new NuevoUsuario(
                            "admin",
                            "admin",
                            "a@a.a",
                            "admin",
                            new HashSet<>(Set.of("ROLE_ADMIN")))
            );
        }
        if(usuarioRepository.findByNombreUsuario("user").isEmpty()) {
            authenticationService.register(
                    new NuevoUsuario(
                            "user",
                            "user",
                            "u@u.u",
                            "user",
                            new HashSet<>(Arrays.asList("ROLE_CBSOL.ES")))
            );
        }
        if(usuarioRepository.findByNombreUsuario("user2").isEmpty()) {
            authenticationService.register(
                    new NuevoUsuario(
                            "user2",
                            "user2",
                            "u2@u.u",
                            "user2",
                            null)
            );
        }
    }

}
