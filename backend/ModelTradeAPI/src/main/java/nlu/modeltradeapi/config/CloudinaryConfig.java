package nlu.modeltradeapi.config;



import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        final Map<String, String> config = new HashMap<>();
        config.put("cloud_name", "dxgqzu2vb");
        config.put("api_key", "433666188991452");
        config.put("api_secret", "lfocVFloD2EuigRWFgDrOmNYNCY");
        return new Cloudinary(config);
    }
}