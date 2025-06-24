package vn.edu.hcmuaf.hobby4everyone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ModelTradeApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ModelTradeApiApplication.class, args);
    }

}
