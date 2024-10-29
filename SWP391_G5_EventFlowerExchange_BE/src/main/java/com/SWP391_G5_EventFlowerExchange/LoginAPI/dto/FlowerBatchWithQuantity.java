package com.SWP391_G5_EventFlowerExchange.LoginAPI.dto;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.FlowerBatch;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlowerBatchWithQuantity {
    FlowerBatch flowerBatch; // Flower batch details
    int orderQuantity; // Corresponding quantity for the batch
}
