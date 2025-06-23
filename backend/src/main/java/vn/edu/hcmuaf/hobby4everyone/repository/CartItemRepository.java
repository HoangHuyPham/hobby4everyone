package vn.edu.hcmuaf.hobby4everyone.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.edu.hcmuaf.hobby4everyone.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, String> {
    @Query("SELECT c FROM CartItem c WHERE c.cart.id = :cartId AND c.model.modelId = :modelId")
    CartItem findByCartIdAndModelModelId(@Param("cartId") String cartId, @Param("modelId") String modelId);
}
