package vn.edu.hcmuaf.hobby4everyone.services.template;

import java.io.UnsupportedEncodingException;

public interface IVNPService {
    String createPaymentUrl(String payAmount, String clientIp, String exchangeId) throws UnsupportedEncodingException;
}
