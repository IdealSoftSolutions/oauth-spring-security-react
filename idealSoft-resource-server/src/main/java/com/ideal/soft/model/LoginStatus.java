package com.ideal.soft.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginStatus {
    private String userName;
    private String status;
    private String errorMessage;
}
