package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User>  findByUserName(String userName);
    Optional<User>  findByUserId(String userId);
    Optional<User> findByEmail(String email);
    boolean existsByUserId(String userId);
    boolean existsByUserName(String userName);
    boolean existsByEmail(String email);
}
