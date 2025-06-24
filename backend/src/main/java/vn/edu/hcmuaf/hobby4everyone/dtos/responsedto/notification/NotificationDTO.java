package vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.notification;

import java.time.LocalDateTime;
import lombok.Data;
import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.user.UserBasicDTO;

@Data
public class NotificationDTO {
    private String id;
    private String title;
    private String content;
    private boolean isRead;
    private UserBasicDTO target;
    private LocalDateTime createdAt;
}
