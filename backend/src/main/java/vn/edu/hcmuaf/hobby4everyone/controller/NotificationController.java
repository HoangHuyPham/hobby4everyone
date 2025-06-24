package vn.edu.hcmuaf.hobby4everyone.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.ApiResponse;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.notification.NotificationDTO;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.user.UserBasicDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Notification;
import vn.edu.hcmuaf.hobby4everyone.repository.NotificationRepository;
import vn.edu.hcmuaf.hobby4everyone.services.template.IUserService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {
        @Autowired
        private NotificationRepository notificationRepository;

        @Autowired
        private IUserService userService;

        @Autowired
        private ModelMapper modelMapper;

        @GetMapping(value = "self")
        public ApiResponse<?> getSelf() {
                UserBasicDTO userBasic = userService.getUser();
                List<Notification> notifications = notificationRepository
                                .findAllByTarget_UserIdOrderByCreatedAtDesc(userBasic.getUserId());
                List<NotificationDTO> notificationDTOs = notifications.stream()
                                .map(i -> modelMapper.map(i, NotificationDTO.class)).toList();

                return ApiResponse.builder()
                                .result(notificationDTOs)
                                .code(HttpStatus.OK.value())
                                .message("Thành công")
                                .build();
        }

        @PatchMapping("/{notificationId}/mark-read")
        public ApiResponse<?> markRead(@PathVariable String notificationId) {
                UserBasicDTO userBasic = userService.getUser();

                Notification existNotification = notificationRepository.findById(notificationId).orElse(null);

                if (!userBasic.getUserId().equals(existNotification.getTarget().getUserId())) {
                        ApiResponse.builder()
                                        .result(null)
                                        .code(HttpStatus.CONFLICT.value())
                                        .message("Bạn không có quyền đánh dấu thông báo này 😉")
                                        .build();
                }
                existNotification.setRead(true);
                notificationRepository.save(existNotification);

                return ApiResponse.builder()
                                .result(existNotification)
                                .code(HttpStatus.OK.value())
                                .message("Thành công")
                                .build();
        }
}
