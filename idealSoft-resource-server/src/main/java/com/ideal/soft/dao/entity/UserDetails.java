package com.ideal.soft.dao.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "user_details")
@Data
public class UserDetails {

    @Id
    @Column(name = "user_id" ,nullable = false )
    private Integer id;
    @Column(name = "user_name", nullable = false)
    private String userName;
    @Column(name = "user_password",nullable = false)
    private String password;
}
