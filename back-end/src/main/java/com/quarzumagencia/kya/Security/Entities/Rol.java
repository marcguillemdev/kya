package com.quarzumagencia.kya.Security.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quarzumagencia.kya.Entities.Domain;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String rolNombre;

    @ManyToMany(mappedBy = "requiredRole", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Domain> requiredDomain;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonIgnore
    private Set<Usuario> usersHavingRole = new HashSet<>();

    public Rol() {
    }

    public Set<Usuario> getUsersHavingRole() {
        return usersHavingRole;
    }

    public void setUsersHavingRole(Set<Usuario> usersHavingRole) {
        this.usersHavingRole = usersHavingRole;
    }

    public Set<Domain> getRequiredDomain() {
        return requiredDomain;
    }

    public void setRequiredDomain(Set<Domain> requiredDomain) {
        this.requiredDomain = requiredDomain;
    }

    public Rol(String rolNombre) {
        this.rolNombre = rolNombre;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRolNombre() {
        return rolNombre;
    }

    public void setRolNombre(String rolNombre) {
        this.rolNombre = rolNombre;
    }
}
