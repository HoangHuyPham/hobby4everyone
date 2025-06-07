package nlu.modeltradeapi.security;

import lombok.RequiredArgsConstructor;
import nlu.modeltradeapi.entities.User;
import nlu.modeltradeapi.exceptions.ApplicationException;
import nlu.modeltradeapi.exceptions.CustomException;
import nlu.modeltradeapi.exceptions.ErrorCode;
import nlu.modeltradeapi.repository.UserRepository;
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
