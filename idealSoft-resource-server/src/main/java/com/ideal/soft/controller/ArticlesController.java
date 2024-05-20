package com.ideal.soft.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ArticlesController {

    private static final Logger log = LoggerFactory.getLogger(ArticlesController.class);

    @GetMapping("/articles")
    @CrossOrigin(origins = "*")
    public String[] getArticles() {
        log.info("Called articles...");
        return new String[]{"Article 1", "Article 2", "Article 3"};
    }
}