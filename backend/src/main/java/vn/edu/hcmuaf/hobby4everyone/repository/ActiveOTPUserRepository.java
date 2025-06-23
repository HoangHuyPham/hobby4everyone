package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.ActiveOTPUser;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActiveOTPUserRepository extends JpaRepository<ActiveOTPUser, Long> {
    Optional<ActiveOTPUser> findByUserAndOtp(User user, String otp);

}