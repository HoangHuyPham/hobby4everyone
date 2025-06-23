package vn.edu.hcmuaf.hobby4everyone.services.implement;

import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user.OTPVerificationRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user.UserRegisterRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user.UserUpdateRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.user.UserBasicDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.ActiveOTPUser;
import vn.edu.hcmuaf.hobby4everyone.entities.Cart;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import vn.edu.hcmuaf.hobby4everyone.entities.Wallet;
import vn.edu.hcmuaf.hobby4everyone.exceptions.CustomException;
import vn.edu.hcmuaf.hobby4everyone.repository.ActiveOTPUserRepository;
import vn.edu.hcmuaf.hobby4everyone.repository.CartRepository;
import vn.edu.hcmuaf.hobby4everyone.repository.UserRepository;
import vn.edu.hcmuaf.hobby4everyone.repository.WalletRepository;
import vn.edu.hcmuaf.hobby4everyone.services.template.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class UserService implements IUserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    private ActiveOTPUserRepository activeOTPUserRepository;
    @Autowired
    private JavaMailSenderImpl mailSender;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private CartRepository cartRepository;

    private final PasswordEncoder passwordEncoder= new BCryptPasswordEncoder(10);

    @Override
    public User registerUser(UserRegisterRequestDTO registerRequest) {
        System.out.println(registerRequest.getUserName());

        // Kiểm tra username đã tồn tại
        if (userRepository.existsByUserName(registerRequest.getUserName())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .userName(registerRequest.getUserName())
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .phoneNumber(registerRequest.getPhoneNumber())
                .dateOfBirth(registerRequest.getDateOfBirth())
                .createdDate(LocalDateTime.now())
                .build();
        System.out.println(user.getUserName()+user.getEmail()+user.getPassword()+user.getPhoneNumber()+user.getDateOfBirth());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        Wallet wallet = Wallet.builder()
                .user(savedUser)
                .total(0)
                .currency("vnd")
                .spend(0)
                .build();
        walletRepository.save(wallet);

        Cart cart = Cart.builder()
                .user(savedUser)
                .build();
        cartRepository.save(cart);

        // Tạo OTP
        String otp = generateOTP();
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(5);
        ActiveOTPUser otpUser = ActiveOTPUser.builder()
                .otp(otp)
                .user(savedUser)
                .expirationTime(expirationTime)
                .build();
        activeOTPUserRepository.save(otpUser);

        // Gửi email OTP
        sendOTPEmail(savedUser.getEmail(), otp);

        return savedUser;
    }

    private void sendOTPEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP for Account Verification");
        message.setText("Your OTP is: " + otp + "\nThis OTP is valid for 5 minutes.");
        mailSender.send(message);
    }

    private String generateOTP() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }


    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(String userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }


    @Override
    public User updateUser(UserUpdateRequestDTO updateRequest) {
        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var userValue = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        User user = User.builder()
                .userId(userValue.getUserId())
                .userName(userValue.getUserName())
                .email(updateRequest.getEmail())
                .password(passwordEncoder.encode(updateRequest.getPassword()))
                .name(updateRequest.getName())
                .phoneNumber(updateRequest.getPhoneNumber())
                .dateOfBirth(updateRequest.getDateOfBirth())
                .createdDate(userValue.getCreatedDate())
                .active(userValue.isActive())
                .isDelete(updateRequest.isDeleted())
                .build();
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String userId) throws CustomException{
        if(!userRepository.existsById(userId)) {
            throw new CustomException("User not found");
        }
        userRepository.deleteById(userId);
    }

    @Override
    public void verifyOTP(OTPVerificationRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() ->new RuntimeException("User not found"));
        ActiveOTPUser otpUser = activeOTPUserRepository.findByUserAndOtp(user, request.getOtp())
                .orElseThrow(() -> new RuntimeException("Invalid OTP or user"));

        if (otpUser.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP has expired");
        }

        User user2 = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user2.setActive(true);
        userRepository.save(user2);

        // Xóa OTP sau khi xác nhận
        activeOTPUserRepository.delete(otpUser);
    }

    @Override
    public UserBasicDTO getUser() {
        UserDetails userTrue = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUserName(userTrue.getUsername()).orElseThrow(() -> new RuntimeException("User không tồn tại"));
        return UserBasicDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .email(user.getEmail())
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .dateOfBirth(user.getDateOfBirth())
                .createdDate(user.getCreatedDate())
                .role(user.getRole())
                .active(user.isActive())
                .isDelete(user.isDelete())
                .build();
    }

    @Override
    public User deactivateUser(String userId) throws CustomException {
        // Tìm người dùng theo userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException("User not found"));

        // Cập nhật isDelete thành true để "vô hiệu hóa" người dùng
        user.setIsDelete(!user.isDelete());

        // Lưu lại người dùng đã cập nhật
        return userRepository.save(user);
    }
}
