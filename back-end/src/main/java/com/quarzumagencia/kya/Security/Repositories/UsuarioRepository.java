package com.quarzumagencia.kya.Security.Repositories;

import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioExtends, Long> {
    Optional<UsuarioExtends> findByNombreUsuario(String nombreUsuario);

    Optional<UsuarioExtends> findByEmail(String email);

    boolean existsByNombreUsuario(String nombreUsuario);

    boolean existsByEmail(String email);

}
