package vn.edu.hcmuaf.hobby4everyone.services.template;

import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.exchange.PayRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.vnpay.PayVNPResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Exchange;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface IExchangeService {
    public String createPayModel(PayRequestDTO payRequestDTO);
    public String handleReturnDTO(PayVNPResponseDTO payVNPResponseDTO);
    public String VNPPay(String exchangeId, String clientIp) throws UnsupportedEncodingException;
    public List<Exchange> getExchangesByUser();
    public List<Exchange> getExchangesByUserId(String userId);
}
