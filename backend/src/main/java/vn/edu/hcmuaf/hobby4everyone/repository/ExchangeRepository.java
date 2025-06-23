package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.Exchange;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExchangeRepository extends JpaRepository<Exchange, String> {
    @Query("""
    SELECT DISTINCT e
    FROM exchange e
    LEFT JOIN money_exchange me ON me.exchange = e AND me.buyer.userId = :userId
    LEFT JOIN model_exchange mx ON mx.exchange = e AND mx.model.user.userId = :userId
    WHERE me.exchange IS NOT NULL OR mx.exchange IS NOT NULL
""")
    List<Exchange> findAllRelatedToUser(@Param("userId") String userId);

}
