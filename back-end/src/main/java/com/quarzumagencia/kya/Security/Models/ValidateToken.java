package com.quarzumagencia.kya.Security.Models;

import java.util.List;
import java.util.Set;

public class ValidateToken {

    private String token;
    private String bearer;
    private String nombreUsuario;
    private Set<Authority> authorities;

    public ValidateToken() {
    }

    public ValidateToken(String token, String bearer, String nombreUsuario, Set<Authority> authorities) {
        this.token = token;
        this.bearer = bearer;
        this.nombreUsuario = nombreUsuario;
        this.authorities = authorities;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getBearer() {
        return bearer;
    }

    public void setBearer(String bearer) {
        this.bearer = bearer;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }
}
