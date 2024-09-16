package com.devteria.hello_spring_boot.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloSpringbootController {
    @GetMapping("/hello")
    String sayHello() {
        return "Khoi Nguyen Bu Cac Quoc Anh";
    }
}
