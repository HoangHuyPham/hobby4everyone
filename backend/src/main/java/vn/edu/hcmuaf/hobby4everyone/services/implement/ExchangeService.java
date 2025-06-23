package vn.edu.hcmuaf.hobby4everyone.services.implement;

import vn.edu.hcmuaf.hobby4everyone.constant.ExchangeStatus;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.exchange.PayRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.vnpay.PayVNPResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.*;
import vn.edu.hcmuaf.hobby4everyone.repository.*;
import vn.edu.hcmuaf.hobby4everyone.services.template.IExchangeService;
import vn.edu.hcmuaf.hobby4everyone.services.template.IVNPService;
import vn.edu.hcmuaf.hobby4everyone.util.entity_mapper.PayMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ExchangeService implements IExchangeService {

    @Autowired
    PayRepository payRepository;

    @Autowired
    IVNPService vnpService;

    @Autowired
    ExchangeRepository exchangeRepository;

    @Autowired
    ModelExchangeRepository exchangeModelRepository;

    @Autowired
    MoneyExchangeRepository exchangeMoneyRepository;

    @Autowired
    ModelRepository modelRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    WalletChangeRepository walletChangeRepository;

    @Autowired
    private PayMapper payMapper;

    @Override
    public String createPayModel(PayRequestDTO payRequestDTO) {
        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userValue = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));

        Model model = modelRepository.findById(payRequestDTO.getModelId()).orElseThrow(()-> new RuntimeException("Model không tồn tại"));

        Exchange exchange = Exchange.builder()
                .type("pay_model")
                .build();
        Exchange exchangeSaved = exchangeRepository.save(exchange);
        MoneyExchange moneyExchange = MoneyExchange.builder()
                .exchange(exchangeSaved)
                .buyer(userValue)
                .money(Double.parseDouble(payRequestDTO.getPayAmount()))
                .build();
        MoneyExchange moneyExchangeSaved = exchangeMoneyRepository.save(moneyExchange);
        ModelExchange modelExchange = ModelExchange.builder()
                .exchange(exchangeSaved)
                .model(model)
                .quantity(payRequestDTO.getQuantity())
                .moneyCompensation(0)
                .build();
        ModelExchange modelExchangeSaved = exchangeModelRepository.save(modelExchange);
        model.setQuantity(model.getQuantity()-payRequestDTO.getQuantity());
        modelRepository.save(model);
        return "Ok";
    }

    @Override
    public String handleReturnDTO(PayVNPResponseDTO payVNPResponseDTO) {
        if (payVNPResponseDTO.getPayResponseCode()==0){
            String info = payVNPResponseDTO.getPayOrderInfo();
            String exchangeId = "";
            String userId = "";
            Pattern pattern = Pattern.compile("Thanh toan ([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}) cua user ([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})");

            Matcher matcher = pattern.matcher(info);

            System.out.println(info);
            System.out.println("Hello world");
            if (matcher.find()) {
                exchangeId = matcher.group(1);
                userId = matcher.group(2);

                System.out.println("exchangeId = " + exchangeId);
                System.out.println("userId = " + userId);
            } else {
                System.out.println("Chuỗi không đúng định dạng");
            }

            User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("User not found"));

            Exchange exchange = exchangeRepository.findById(exchangeId).orElseThrow(() -> new RuntimeException("Exchange Illegal"));
            Pay pay = payMapper.toEntity(payVNPResponseDTO);
            pay.setExchange(exchange);
            Pay paySaved = payRepository.save(pay);

            Wallet wallet = walletRepository.findByUser(user).orElseThrow(()-> new RuntimeException("Wallet not found"));

            WalletChange walletChange = WalletChange.builder()
                    .pay(paySaved)
                    .wallet(wallet)
                    .type("Thanh toan")
                    .build();
            walletChangeRepository.save(walletChange);

            MoneyExchange moneyExchange = exchangeMoneyRepository.findByExchange(exchange).orElseThrow(() -> new RuntimeException("Exchange Not Exist"));
            moneyExchange.setStatus(ExchangeStatus.SUCCESS_TRADE);
            MoneyExchange moneyExchangeSaved = exchangeMoneyRepository.save(moneyExchange);
            ModelExchange modelExchange = exchangeModelRepository.findByExchange(exchange).orElseThrow(() -> new RuntimeException("Exchange Not Exist"));
            modelExchange.setStatus(ExchangeStatus.SUCCESS_TRADE);
            ModelExchange modelExchangeSaved = exchangeModelRepository.save(modelExchange);
            exchange.setStatus(ExchangeStatus.SUCCESS_TRADE);
            ModelExchange modelExchangeSavedSaved = exchangeModelRepository.save(modelExchangeSaved);
            if(
                    moneyExchangeSaved.getStatus().equals(ExchangeStatus.SUCCESS_TRADE)
                    && modelExchangeSaved.getStatus().equals(ExchangeStatus.SUCCESS_TRADE)
                    && modelExchangeSavedSaved.getStatus().equals(ExchangeStatus.SUCCESS_TRADE)
            ){
                return "Success";
            }
        }
        return "Fail";
    }

    @Override
    public String VNPPay(String exchangeId, String clientIp) throws UnsupportedEncodingException {
        Exchange exchange = exchangeRepository.findById(exchangeId).orElseThrow(() -> new RuntimeException("Exchange Not Exist"));
        MoneyExchange moneyExchange = exchangeMoneyRepository.findByExchange(exchange).orElseThrow(() -> new RuntimeException("Exchange Not Exist"));
        double num = moneyExchange.getMoney();
        String money = Double.toString(num);
        return vnpService.createPaymentUrl(money,clientIp,exchangeId);
    }

    @Override
    public List<Exchange> getExchangesByUser() {
        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userValue = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        return exchangeRepository.findAllRelatedToUser(userValue.getUserId());
    }
}
