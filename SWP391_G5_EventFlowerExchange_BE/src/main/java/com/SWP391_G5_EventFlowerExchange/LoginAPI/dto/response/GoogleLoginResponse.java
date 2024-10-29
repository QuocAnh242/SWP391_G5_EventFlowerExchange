package com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoogleLoginResponse {
    private String token;
    private User user;
}
