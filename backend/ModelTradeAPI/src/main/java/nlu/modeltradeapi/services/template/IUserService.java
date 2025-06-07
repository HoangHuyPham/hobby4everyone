package nlu.modeltradeapi.services.template;

import nlu.modeltradeapi.dtos.requestdto.user.OTPVerificationRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserRegisterRequestDTO;
import nlu.modeltradeapi.dtos.requestdto.user.UserUpdateRequestDTO;
import nlu.modeltradeapi.entities.User;
import nlu.modeltradeapi.exceptions.CustomException;

import java.util.List;

public interface IUserService {
    public User registerUser(UserRegisterRequestDTO registerRequest);
    public List<User> getUsers();
    public User getUserById(String userId);
    public User updateUser(UserUpdateRequestDTO updateRequest);
    public void deleteUser(String userId) throws CustomException;
    void verifyOTP(OTPVerificationRequestDTO request);
}
