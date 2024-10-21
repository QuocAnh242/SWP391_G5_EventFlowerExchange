package com.SWP391_G5_EventFlowerExchange.LoginAPI.configuration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class VNPayConfig {
    public static final String vnp_TmnCode = "2FCLB0LY";
    public static final String vnp_HashSecret = "6MSE4RMSB3BF3ZV72ESVL3BJE82YFMHH";
    public static final String vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";  // URL VNPay sandbox
    public static final String vnp_ReturnUrl = "http://localhost:8080/identity/payments/";  // URL trả về khi thanh toán thành công
}
