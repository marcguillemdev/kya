package com.quarzumagencia.kya.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.quarzumagencia.kya.Entities.Extends.RolExtends;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Domain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String domainName;
    private String domainDescription;
    private String domainUrl;
    private String domainLogo;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonBackReference
    private Set<RolExtends> requiredRole;

    @OneToMany(mappedBy = "domain", fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonIgnore
    private List<Post> posts;

    public Domain() {
    }

    public Domain(Long id, String domainName, String domainDescription, String domainUrl, String domainLogo) {
        this.id = id;
        this.domainName = domainName;
        this.domainDescription = domainDescription;
        this.domainUrl = domainUrl;
        this.domainLogo = domainLogo;
    }

    public Set<RolExtends> getRequiredRole() {
        return requiredRole;
    }

    public void setRequiredRole(Set<RolExtends> requiredRole) {
        this.requiredRole = requiredRole;
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public String getDomainDescription() {
        return domainDescription;
    }

    public void setDomainDescription(String domainDescription) {
        this.domainDescription = domainDescription;
    }

    public String getDomainUrl() {
        return domainUrl;
    }

    public void setDomainUrl(String domainUrl) {
        this.domainUrl = domainUrl;
    }

    public String getDomainLogo() {
        return domainLogo;
    }

    public void setDomainLogo(String domainLogo) {
        this.domainLogo = domainLogo;
    }
}
