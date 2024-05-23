package com.ideal.soft.service;

import com.ideal.soft.dao.repository.UserDetailsRepository;
import com.ideal.soft.model.User;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(UserDetailsService.class);
    private final UserDetailsRepository userDetailsRepository;

    public boolean validateLoginUser(User loginuser) {
        var loginFlag = false;
        if (StringUtils.isNotEmpty(loginuser.getUserName()) && StringUtils.isNotEmpty(loginuser.getPassword())) {
            var result = userDetailsRepository.findByUserNameAndPassword(loginuser.getUserName(), loginuser.getPassword());
            if (Objects.nonNull(result)) {
                log.debug("Logged in User ===>{}", result.toString());
                loginFlag = true;
            }
        }
        return loginFlag;
    }
}
