package vn.edu.hcmuaf.hobby4everyone.services.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.cart.RevenueDTO;
import vn.edu.hcmuaf.hobby4everyone.repository.PayRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StatisticService {
    @Autowired
    private PayRepository payRepository;

    public List<RevenueDTO> getRevenue(LocalDateTime startDate, LocalDateTime endDate) {
        List<Object[]> results = payRepository.getRevenueByDate(startDate, endDate);
        return results.stream().map(obj -> new RevenueDTO(
                ((java.sql.Date) obj[0]).toLocalDate().toString(),
                ((Double) obj[1])
        )).toList();
    }
}
