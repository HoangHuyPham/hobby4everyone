package vn.edu.hcmuaf.hobby4everyone.services.template;

import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user.OTPVerificationRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user.UserRegisterRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.user.UserUpdateRequestDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.user.UserBasicDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.User;
import vn.edu.hcmuaf.hobby4everyone.exceptions.CustomException;

import java.util.List;

public interface IUserService {
    public User registerUser(UserRegisterRequestDTO registerRequest);
    public List<User> getUsers();
    public User getUserById(String userId);
    public User updateUser(UserUpdateRequestDTO updateRequest);
    public void deleteUser(String userId) throws CustomException;
    void verifyOTP(OTPVerificationRequestDTO request);
    public UserBasicDTO getUser();

}
