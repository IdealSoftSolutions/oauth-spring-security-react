package com.ideal.soft.controller;

import com.ideal.soft.model.LoginStatus;
import com.ideal.soft.model.User;
import com.ideal.soft.service.UserDetailsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserDetailsService userDetailsService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @CrossOrigin("*")
    public ResponseEntity<LoginStatus> handleLogin(@RequestBody User loginuser) {
        log.debug("login User Request {}",loginuser.toString());
        var loginFlag = userDetailsService.validateLoginUser(loginuser);
        if (loginFlag) {
            var statusObj = new LoginStatus(loginuser.getUserName(), loginuser.getPassword(), null);
            return new ResponseEntity<>(statusObj, HttpStatus.OK);
        } else {
            log.info("User Name or Password wrong");
            var statusObj = new LoginStatus(null, null, "User Name or Password wrong");
            return new ResponseEntity<>(statusObj, HttpStatus.NOT_FOUND);
        }
    }
}
