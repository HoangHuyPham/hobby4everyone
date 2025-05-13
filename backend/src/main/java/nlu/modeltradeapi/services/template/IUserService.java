package nlu.modeltradeapi.services.template;

import nlu.modeltradeapi.dtos.requestdto.user.OTPVerificationRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserRegisterRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserUpdateRequestDTO;
import nlu.modeltradeapi.entities.User;

import java.util.List;

public interface IUserService {
    public User registerUser(UserRegisterRequestDTO registerRequest);
    public List<User> getUsers();
    public User getUserById(String userId);
    public User updateUser(String userId, UserUpdateRequestDTO updateRequest);
    public void deleteUser(String userId);
    void verifyOTP(OTPVerificationRequestDTO request);
}
