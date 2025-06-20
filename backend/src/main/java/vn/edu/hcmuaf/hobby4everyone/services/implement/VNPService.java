package vn.edu.hcmuaf.hobby4everyone.services.implement;

import vn.edu.hcmuaf.hobby4everyone.repository.UserRepository;
import vn.edu.hcmuaf.hobby4everyone.services.template.IVNPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPService implements IVNPService {

    @Value("${vnpay.vnp_TmnCode}")
    private String vnpTmnCode ;

    @Value("${vnpay.vnp_HashSecret}")
    private String vnpHashSecret;

    @Value("${vnpay.vnp_Url}")
    private String vnpUrl;

    @Value("${vnpay.return_Url}")
    private String returnUrl;

    @Autowired
    UserRepository userRepository;

    @Override
    public String createPaymentUrl(String payAmount, String clientIp, String exchangeId) throws UnsupportedEncodingException {
        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userValue = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        String userId = userValue.getUserId();

        System.out.println(vnpTmnCode);
        System.out.println(vnpHashSecret);
        System.out.println(vnpUrl);
        System.out.println(returnUrl);

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        String vnp_OrderInfo = "Thanh toan " + exchangeId + " cua user " + userId;


        long amount = (long) (Double.parseDouble(payAmount) * 100);
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnpTmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", getRandomNumber(8));
        vnp_Params.put("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", returnUrl);
        vnp_Params.put("vnp_IpAddr", clientIp);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        vnp_Params.put("vnp_CreateDate", sdf.format(calendar.getTime()));
        calendar.add(Calendar.MINUTE, 15);
        vnp_Params.put("vnp_ExpireDate", sdf.format(calendar.getTime()));

        // Sắp xếp theo thứ tự từ điển A-Z
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        // Tạo chuỗi hashData KHÔNG encode
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Iterator<String> iterator = fieldNames.iterator(); iterator.hasNext();) {
            String fieldName = iterator.next();
            String fieldValue = vnp_Params.get(fieldName);

            if(fieldValue != null && !fieldValue.isEmpty()) {
                hashData.append(fieldName).append("=").append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII))
                        .append("=")
                        .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if(iterator.hasNext()) {
                    hashData.append("&");
                    query.append("&");
                }
            }
        }

        // Ký SHA512
        String vnp_SecureHash = hmacSHA512(vnpHashSecret, hashData.toString());
        query.append("&vnp_SecureHash=").append(vnp_SecureHash);

        return vnpUrl + "?" + query;
    }

    private String hmacSHA512(String key, String data) {
        try {
            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
