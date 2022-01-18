package com.courses.api.springboot.geeksforgeeks.database.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountLoginDTO {
    public String username;
    public String password;
    public boolean autoLogin;
    public String type;
}
