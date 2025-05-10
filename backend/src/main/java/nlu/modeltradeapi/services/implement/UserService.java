package nlu.modeltradeapi.services.implement;

import nlu.modeltradeapi.dtos.requestdto.user.OTPVerificationRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserRegisterRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserUpdateRequestDTO;
import nlu.modeltradeapi.entities.ActiveOTPUser;
import nlu.modeltradeapi.entities.User;
import nlu.modeltradeapi.repository.ActiveOTPUserRepository;
import nlu.modeltradeapi.repository.UserRepository;
import nlu.modeltradeapi.services.template.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
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

    @Override
    public User registerUser(UserRegisterRequestDTO registerRequest) {
        // Kiểm tra username đã tồn tại
        if (userRepository.findByUserName(registerRequest.getUserName()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
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
        User savedUser = userRepository.save(user);

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
        return userRepository.findById(userId).orElseThrow(() ->new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(String userId, UserUpdateRequestDTO updateRequest) {
        User user = getUserById(userId);
        user.setName(updateRequest.getName());
        user.setEmail(updateRequest.getEmail());
        user.setPassword(updateRequest.getPassword());
        user.setPhoneNumber(updateRequest.getPhoneNumber());
        user.setDateOfBirth(updateRequest.getDateOfBirth());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String userId) {
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
}
