package vn.edu.hcmuaf.hobby4everyone.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.exchange.PayRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.ApiResponse;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.vnpay.PayVNPResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Exchange;
import vn.edu.hcmuaf.hobby4everyone.services.template.IExchangeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/exchange")
@RequiredArgsConstructor
public class ExchangeController {
    private final IExchangeService exchangeService;

    @PostMapping("createPayModel")
    public ApiResponse<String> createPayModel(@RequestBody PayRequestDTO payRequestDTO) throws UnsupportedEncodingException {
        String result = exchangeService.createPayModel(payRequestDTO);
        if (result == null || result.isEmpty()) {
            result = "Failed";
        }
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }

    @GetMapping("/createPayURL/{exchangeId}")
    public ApiResponse<String> createPayURL(@PathVariable String exchangeId, HttpServletRequest request) throws UnsupportedEncodingException {
        String ipAdress = request.getRemoteAddr();
        try {
            ipAdress = request.getHeader("X-FORWARDED-FOR");
            if (ipAdress == null) {
                ipAdress = request.getRemoteAddr();
            }
        } catch (Exception e) {
            ipAdress = "Invalid IP:" + e.getMessage();
        }
        String url = exchangeService.VNPPay(exchangeId, ipAdress);
        return ApiResponse.<String>builder()
                .result(url)
                .build();
    }

    @GetMapping("vnp-return")
    public ResponseEntity<Void> handleVNP(@RequestParam Map<String, String> params) {
        PayVNPResponseDTO payVNPResponseDTO = PayVNPResponseDTO.builder()
                .payTmnCode(params.get("vnp_TmnCode"))
                .payAmount(Double.parseDouble(params.get("vnp_Amount")))
                .payBankCode(params.get("vnp_BankCode"))
                .payBankTranNo(params.get("vnp_BankTranNo"))
                .payCardType(params.get("vnp_CardType"))
                .payDate(params.get("vnp_PayDate"))
                .payOrderInfo(params.get("vnp_OrderInfo"))
                .payTransactionNo(Double.parseDouble(params.get("vnp_TransactionNo")))
                .payResponseCode(Integer.parseInt(params.get("vnp_ResponseCode")))
                .payTransactionStatus(Integer.parseInt(params.get("vnp_TransactionStatus")))
                .payTxnRef(params.get("vnp_TxnRef"))
                .paySecureHash(params.get("vnp_SecureHash"))
                .build();
        String mess = exchangeService.handleReturnDTO(payVNPResponseDTO);
        String redirectUrl = "http://localhost:5173/return-api?status=" + (mess.contains("Success") ? "Success" : "Fail");
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(redirectUrl)).build();
    }

    @GetMapping("getAllExchangeByUser")
    public ApiResponse<List<Exchange>> getAllExchangeByUser() {
        List<Exchange> list = exchangeService.getExchangesByUser();
        if (list == null || list.isEmpty()) {
            return ApiResponse.<List<Exchange>>builder()
                    .message("Empty")
                    .code(1010)
                    .build();
        }
        return ApiResponse.<List<Exchange>>builder()
                .result(list)
                .build();
    }


}
