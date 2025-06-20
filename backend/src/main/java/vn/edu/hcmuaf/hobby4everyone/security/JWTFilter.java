package vn.edu.hcmuaf.hobby4everyone.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.hobby4everyone.repository.UserRepository;
import vn.edu.hcmuaf.hobby4everyone.services.implement.AuthenticationService;
import vn.edu.hcmuaf.hobby4everyone.services.service_sp_object.JWTInfo;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String userName = null;
        String token = authHeader != null
                && authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
        if(token != null) {
            JWTInfo info = authenticationService.extractInfo(token);
            userName = info.getUserName();
            if (userName!=null && SecurityContextHolder.getContext().getAuthentication() == null){
                var userDetails = userDetailsService.loadUserByUsername(userName);
                System.out.println("Ok");
                if(authenticationService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails, null, userDetails.getAuthorities()
                            );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
