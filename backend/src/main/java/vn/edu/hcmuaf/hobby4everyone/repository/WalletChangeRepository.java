package vn.edu.hcmuaf.hobby4everyone.repository;

import vn.edu.hcmuaf.hobby4everyone.entities.Wallet;
import vn.edu.hcmuaf.hobby4everyone.entities.WalletChange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletChangeRepository extends JpaRepository<WalletChange, Long> {
    WalletChange findByWallet(Wallet wallet);
}
