package com.SWP391_G5_EventFlowerExchange.LoginAPI.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlowerBatchDTO {
    private String flowerName;
    private int quantity;
    private String status;
    private String description;
    private double price;
    private String imageUrl;
    private int categoryID;
}
