package com.SWP391_G5_EventFlowerExchange.LoginAPI.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedbackDTO {
    private String comment;  // Nội dung feedback
    private String name;      // Tên người gửi feedback
}
