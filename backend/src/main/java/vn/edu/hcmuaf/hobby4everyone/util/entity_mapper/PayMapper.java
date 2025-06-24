package vn.edu.hcmuaf.hobby4everyone.util.entity_mapper;

import vn.edu.hcmuaf.hobby4everyone.dtos.responsedto.vnpay.PayVNPResponseDTO;
import vn.edu.hcmuaf.hobby4everyone.entities.Pay;
import org.mapstruct.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface PayMapper {

    DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    @Mapping(source = "payDate", target = "payDate", qualifiedByName = "stringToLocalDateTime")
    Pay toEntity(PayVNPResponseDTO dto);

    @Named("stringToLocalDateTime")
    public static LocalDateTime stringToLocalDateTime(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return null;
        return LocalDateTime.parse(dateStr, FORMATTER);
    }

    // Nếu cần map ngược (entity → DTO)
    @Mapping(source = "payDate", target = "payDate", qualifiedByName = "localDateTimeToString")
    PayVNPResponseDTO toDto(Pay entity);

    @Named("localDateTimeToString")
    public static String localDateTimeToString(LocalDateTime date) {
        if (date == null) return null;
        return date.format(FORMATTER);
    }
}
