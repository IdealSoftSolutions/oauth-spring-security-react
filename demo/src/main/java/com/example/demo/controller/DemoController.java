package com.example.demo.controller;

import com.example.demo.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class DemoController {

    private static final Logger log = LoggerFactory.getLogger(DemoController.class);

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public User handleLogin(@RequestBody User user) {
        log.info(user.getUserName());
        log.info(user.getPassword());
        return user;
    }
}
