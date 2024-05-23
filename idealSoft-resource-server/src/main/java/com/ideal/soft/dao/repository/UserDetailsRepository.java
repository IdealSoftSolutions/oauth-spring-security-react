package com.ideal.soft.dao.repository;

import com.ideal.soft.dao.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {
    UserDetails findByUserNameAndPassword(String userName, String password);
}
