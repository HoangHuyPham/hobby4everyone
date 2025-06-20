package vn.edu.hcmuaf.hobby4everyone.security;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import vn.edu.hcmuaf.hobby4everyone.exceptions.ApplicationException;
import vn.edu.hcmuaf.hobby4everyone.exceptions.CustomException;
import vn.edu.hcmuaf.hobby4everyone.exceptions.ErrorCode;
import vn.edu.hcmuaf.hobby4everyone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username).orElseThrow(()-> new ApplicationException(ErrorCode.USER_NOT_EXISTED));
        return UserPrincipal.builder().user(user).build();
    }
}
