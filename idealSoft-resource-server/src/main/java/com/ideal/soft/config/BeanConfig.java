package com.ideal.soft.config;

import com.ideal.soft.controller.UserController;
import com.ideal.soft.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean(name = "userController")
    public UserController getUserController() {
        return new UserController(userDetailsService);
    }
}
