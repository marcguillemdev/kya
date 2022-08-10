package com.quarzumagencia.kya.Entities;

import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Entities.Usuario;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class PasswordTokenRecovery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String uuid;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "usuario_id")
    private UsuarioExtends usuario;


    public PasswordTokenRecovery(String uuid, UsuarioExtends usuario) {
        this.uuid = uuid;
        this.usuario = usuario;
    }

    public PasswordTokenRecovery() {
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public UsuarioExtends getUsuario() {
        return usuario;
    }

    public void setUsuario(UsuarioExtends usuario) {
        this.usuario = usuario;
    }
}
