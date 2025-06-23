package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.Exchange;
import vn.edu.hcmuaf.hobby4everyone.entities.MoneyExchange;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoneyExchangeRepository extends JpaRepository<MoneyExchange, String> {
    Optional<MoneyExchange> findByExchange(Exchange exchange);
}
