package com.SWP391_G5_EventFlowerExchange.LoginAPI;

import jakarta.persistence.Entity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication

public class LoginApiApplication {


	public static void main(String[] args) {
		SpringApplication.run(LoginApiApplication.class, args);
	}

}
