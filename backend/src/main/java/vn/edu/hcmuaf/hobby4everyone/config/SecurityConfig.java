package vn.edu.hcmuaf.hobby4everyone.config;

import lombok.RequiredArgsConstructor;
import org.springframework.security.config.Customizer;
import vn.edu.hcmuaf.hobby4everyone.security.CustomAuthenticationProvider;
import vn.edu.hcmuaf.hobby4everyone.security.JWTFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTFilter jwtFilter;
    private final CustomAuthenticationProvider customAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/api/posts/getAllPosts").permitAll()
                        .requestMatchers("/api/posts/search").permitAll()
                        .requestMatchers("/api/exchange/vnp-return").permitAll()
                        .requestMatchers("/api/posts/getModelIdFromPost/*").permitAll()
                        .requestMatchers(
                                "/api/statistics/**",
                                "/api/models/**",
                                "/api/user/**",
                                "/api/posts/**",
                                "/api/model/**",
                                "/api/exchange/**"
                        ).authenticated()
                        .requestMatchers("/ws/**").permitAll()
                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        return new ProviderManager(List.of(customAuthenticationProvider));
    }
}