package com.Springboot.online_pharmacy_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.Springboot.online_pharmacy_backend")
@EntityScan("com.Springboot.online_pharmacy_backend.model")
public class OnlinePharmacyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlinePharmacyBackendApplication.class, args);
	}

}
