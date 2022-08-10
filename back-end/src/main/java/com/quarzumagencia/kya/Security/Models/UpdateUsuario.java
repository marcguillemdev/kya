package com.quarzumagencia.kya.Security.Models;

import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import com.quarzumagencia.kya.Security.Entities.Usuario;

import java.io.Serializable;

public class UpdateUsuario implements Serializable {

    private UsuarioExtends usuarioOriginal;
    private UsuarioExtends usuarioModificado;

    public UpdateUsuario(UsuarioExtends usuarioOriginal, UsuarioExtends usuarioModificado) {
        this.usuarioOriginal = usuarioOriginal;
        this.usuarioModificado = usuarioModificado;
    }

    public UpdateUsuario() {
    }

    public UsuarioExtends getUsuarioOriginal() {
        return usuarioOriginal;
    }

    public void setUsuarioOriginal(UsuarioExtends usuarioOriginal) {
        this.usuarioOriginal = usuarioOriginal;
    }

    public UsuarioExtends getUsuarioModificado() {
        return usuarioModificado;
    }

    public void setUsuarioModificado(UsuarioExtends usuarioModificado) {
        this.usuarioModificado = usuarioModificado;
    }
}
