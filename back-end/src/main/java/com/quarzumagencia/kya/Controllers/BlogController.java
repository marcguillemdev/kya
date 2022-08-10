package com.quarzumagencia.kya.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/blog")
public class BlogController {

    @GetMapping("/")
    public String getPosts() {
        return "Hello World";
    }

}
