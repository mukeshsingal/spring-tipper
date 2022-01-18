package com.courses.api.springboot.geeksforgeeks.database.model.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
