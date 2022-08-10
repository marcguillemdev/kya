package com.quarzumagencia.kya.Entities;

import com.quarzumagencia.kya.Security.Entities.Extends.UsuarioExtends;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo_post;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
    @JoinTable(name = "usuario_post", joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id"))
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<UsuarioExtends> authors;

    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    private String title;
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @LazyCollection(LazyCollectionOption.FALSE)
    private Domain domain;

    public Post() {
    }

    public Post(List<UsuarioExtends> authors, Date creationDate, String title, String content, Domain domain) {
        this.authors = authors;
        this.creationDate = creationDate;
        this.title = title;
        this.content = content;
        this.domain = domain;
    }

    public Long getCodigo_post() {
        return codigo_post;
    }

    public void setCodigo_post(Long codigo_post) {
        this.codigo_post = codigo_post;
    }

    public List<UsuarioExtends> getAuthors() {
        return authors;
    }

    public void setAuthors(List<UsuarioExtends> authors) {
        this.authors = authors;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Domain getDomain() {
        return domain;
    }

    public void setDomain(Domain domain) {
        this.domain = domain;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
