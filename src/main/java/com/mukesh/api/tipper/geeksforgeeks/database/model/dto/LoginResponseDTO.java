package com.mukesh.api.tipper.geeksforgeeks.database.model.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginResponseDTO {
    private String status;
    private String type;
    private String currentAuthority;

    public static LoginResponseDTO generate() {
        LoginResponseDTO dto = new LoginResponseDTO();

        dto.setStatus("ok");
        dto.setType("account");
        dto.setCurrentAuthority("admin");

        return dto;
    }

}
