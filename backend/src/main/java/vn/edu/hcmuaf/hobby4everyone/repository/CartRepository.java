package vn.edu.hcmuaf.hobby4everyone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.hcmuaf.hobby4everyone.entities.Cart;

public interface CartRepository extends JpaRepository<Cart, String> {
}
