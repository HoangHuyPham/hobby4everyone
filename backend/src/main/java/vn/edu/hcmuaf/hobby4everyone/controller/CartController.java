package vn.edu.hcmuaf.hobby4everyone.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import vn.edu.hcmuaf.hobby4everyone.dtos.requestdto.cart.AddCartItemDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.ApiResponse;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.cart.CartDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.user.UserBasicDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Cart;
import vn.edu.hcmuaf.hobby4everyone.entities.CartItem;
import vn.edu.hcmuaf.hobby4everyone.entities.Model;
import vn.edu.hcmuaf.hobby4everyone.repository.CartItemRepository;
import vn.edu.hcmuaf.hobby4everyone.repository.CartRepository;
import vn.edu.hcmuaf.hobby4everyone.repository.ModelRepository;
import vn.edu.hcmuaf.hobby4everyone.services.template.INotificationService;
import vn.edu.hcmuaf.hobby4everyone.services.template.IUserService;

@RestController
@RequestMapping("/api/carts")
public class CartController {
        @Autowired
        private CartRepository repoCart;

        @Autowired
        private CartItemRepository repoCartItem;

        @Autowired
        private IUserService userService;

        @Autowired
        private ModelRepository modelRepo;

        @Autowired
        private ModelMapper modelMapper;

        @Autowired
        private INotificationService notificationService;

        @GetMapping(value = "self", produces = MediaType.APPLICATION_JSON_VALUE)
        public ApiResponse<?> getSelf() {
                UserBasicDTO userBasic = userService.getUser();
                Cart existCart = repoCart.findById(userBasic.getUserId())
                                .orElseThrow(() -> new RuntimeException("Cart không tồn tại"));

                if (existCart == null) {
                        return ApiResponse.builder()
                                        .code(HttpStatus.NO_CONTENT.value())
                                        .message("Thành công")
                                        .build();
                }

                CartDTO cartDTO = modelMapper.map(existCart, CartDTO.class);

                return ApiResponse.builder()
                                .result(cartDTO)
                                .code(HttpStatus.OK.value())
                                .message("Thành công")
                                .build();
        }

        @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
        @Transactional
        public ApiResponse<?> addCartItem(@RequestBody AddCartItemDTO dto) {
                UserBasicDTO userBasic = userService.getUser();
                Cart existCart = repoCart.findById(userBasic.getUserId())
                                .orElseThrow(() -> new RuntimeException("Cart không tồn tại"));
                Model existModel = modelRepo.findById(dto.getModelId()).orElse(null);
          
                if (existCart == null) {
                        return ApiResponse.builder()
                                        .code(HttpStatus.NOT_FOUND.value())
                                        .result(null)
                                        .message("Không thấy giỏ hàng")
                                        .build();
                }

                CartItem cartItemMatched = repoCartItem.findByCartIdAndModelModelId(existCart.getId(), dto.getModelId());
                if (cartItemMatched != null) {
                        if (existModel.getQuantity() < dto.getQuantity() + cartItemMatched.getQuantity()) {
                                return ApiResponse.builder()
                                                .result(null)
                                                .code(HttpStatus.CONFLICT.value())
                                                .message("Không đủ sản phẩm")
                                                .build();
                        }
                        if (dto.getQuantity() + cartItemMatched.getQuantity() <= 0) {
                                existCart.getCartItems().removeIf(i->i.getId().equals(cartItemMatched.getId()));
                                repoCart.save(existCart);
                                CartDTO cartDTO = modelMapper.map(existCart, CartDTO.class);
                                return ApiResponse.builder()
                                                .result(cartDTO)
                                                .code(HttpStatus.OK.value())
                                                .message("Xóa sản phẩm thành công")
                                                .build();
                        } else {
                                if (dto.getQuantity() + cartItemMatched.getQuantity() != cartItemMatched
                                                .getQuantity()) {
                                        cartItemMatched.setQuantity(dto.getQuantity() + cartItemMatched.getQuantity());
                                        repoCart.save(existCart);
                                        CartDTO cartDTO = modelMapper.map(existCart, CartDTO.class);
                                        return ApiResponse.builder()
                                                        .result(cartDTO)
                                                        .code(HttpStatus.OK.value())
                                                        .message("Cập nhật thành công")
                                                        .build();
                                } else {
                                        CartDTO cartDTO = modelMapper.map(existCart, CartDTO.class);
                                        return ApiResponse.builder()
                                                        .result(cartDTO)
                                                        .code(HttpStatus.CONFLICT.value())
                                                        .message("Số lượng không đổi")
                                                        .build();
                                }

                        }
                } else {
                        CartItem newCartItem = CartItem.builder().quantity(dto.getQuantity()).model(existModel).cart(existCart).build();
                        existCart.getCartItems().add(newCartItem);
                        repoCart.save(existCart);
                        CartDTO cartDTO = modelMapper.map(existCart, CartDTO.class);
                        notificationService.addNotification("Nofication", "Bạn đã thêm sản phẩm: "+existModel.getName()+", số lượng: "+dto.getQuantity(), userService.getUserById(userBasic.getUserId()));
                        notificationService.notifyUser(userService.getUserById(userBasic.getUserId()), "Giỏ hàng vừa được cập nhật!");
                        return ApiResponse.builder()
                                        .code(HttpStatus.OK.value())
                                        .result(cartDTO)
                                        .message("Cập nhật thành công")
                                        .build();
                }
        }
}
