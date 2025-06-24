package vn.edu.hcmuaf.hobby4everyone.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.hcmuaf.hobby4everyone.entities.Pay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PayRepository extends JpaRepository<Pay, String> {

    @Query("SELECT DATE(p.payDate), SUM(p.payAmount) FROM pay p " +
            "WHERE (:startDate IS NULL OR p.payDate >= :startDate) " +
            "AND (:endDate IS NULL OR p.payDate <= :endDate) " +
            "GROUP BY DATE(p.payDate) ORDER BY DATE(p.payDate)")
    List<Object[]> getRevenueByDate(@Param("startDate") LocalDateTime start,
                                    @Param("endDate") LocalDateTime end);
}
