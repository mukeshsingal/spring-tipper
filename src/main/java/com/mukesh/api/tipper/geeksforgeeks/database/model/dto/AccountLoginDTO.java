package com.mukesh.api.tipper.geeksforgeeks.database.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccountLoginDTO {
    private String username;
    private String password;
    private boolean autoLogin;
    private String type;
}
