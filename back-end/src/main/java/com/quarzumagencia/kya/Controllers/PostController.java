package com.quarzumagencia.kya.Controllers;

import com.quarzumagencia.kya.Entities.Post;
import com.quarzumagencia.kya.Services.Entity.Post.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private IPostService postService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @RequestMapping("/get-all-posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

}
