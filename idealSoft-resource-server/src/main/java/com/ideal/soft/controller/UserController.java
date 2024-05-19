package com.ideal.soft.controller;

import com.ideal.soft.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public User handleLogin(@RequestBody User user) {
        log.info(user.getUserName());
        log.info(user.getPassword());
        return user;
    }
}
