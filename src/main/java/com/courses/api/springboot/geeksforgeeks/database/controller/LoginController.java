package com.courses.api.springboot.geeksforgeeks.database.controller;

import com.courses.api.springboot.geeksforgeeks.database.model.dao.question.Question;
import com.courses.api.springboot.geeksforgeeks.database.model.dto.AccountLoginDTO;
import com.courses.api.springboot.geeksforgeeks.database.model.dto.LoginResponseDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

    private static final String LOGIN_ROOT = "/api/login/";

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST, value = LOGIN_ROOT + "/account")
    public LoginResponseDTO markDeleted(@RequestBody AccountLoginDTO loginBody) {
        return LoginResponseDTO.generate();

    }

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET, value =  "/api/currentUser")
    public JsonNode markDeleted() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode rootNode = objectMapper.readTree("{\"success\":true,\"data\":{\"name\":\"Mukesh Singal\",\"avatar\":\"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png\",\"userid\":\"00000001\",\"email\":\"antdesign@alipay.com\",\"signature\":\"海纳百川，有容乃大\",\"title\":\"交互专家\",\"group\":\"蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED\",\"tags\":[{\"key\":\"0\",\"label\":\"很有想法的\"},{\"key\":\"1\",\"label\":\"专注设计\"},{\"key\":\"2\",\"label\":\"辣~\"},{\"key\":\"3\",\"label\":\"大长腿\"},{\"key\":\"4\",\"label\":\"川妹子\"},{\"key\":\"5\",\"label\":\"海纳百川\"}],\"notifyCount\":12,\"unreadCount\":11,\"country\":\"China\",\"access\":\"admin\",\"geographic\":{\"province\":{\"label\":\"浙江省\",\"key\":\"330000\"},\"city\":{\"label\":\"杭州市\",\"key\":\"330100\"}},\"address\":\"西湖区工专路 77 号\",\"phone\":\"0752-268888888\"}}");
            return rootNode;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }
}
