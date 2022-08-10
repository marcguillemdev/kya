package com.quarzumagencia.kya.Services.Entity.Post;

import com.quarzumagencia.kya.Entities.Post;
import com.quarzumagencia.kya.Repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements IPostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}
