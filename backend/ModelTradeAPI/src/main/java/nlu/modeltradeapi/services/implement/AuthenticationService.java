package nlu.modeltradeapi.services.implement;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import nlu.modeltradeapi.dtos.requestdto.user.UserLoginRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.AuthenticationResponseonseDTO;
import nlu.modeltradeapi.repository.UserRepository;
import nlu.modeltradeapi.services.service_sp_object.JWTInfo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.function.Function;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;


    @NonFinal
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;

    private boolean isExpired(String token) {
        return extractClaim(token, JWTClaimsSet::getExpirationTime).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
            boolean isExpire = isExpired(token);
            boolean verified= signedJWT.verify(verifier);
            final String userName = signedJWT.getJWTClaimsSet().getSubject();
            boolean isSameUser = userName.equals(userDetails.getUsername());
            return !isExpire && verified && isSameUser;
        } catch (JOSEException | ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public String authenticate(UserLoginRequestDTO userLoginRequestDTO) {
        var user = userRepository.findByUserName(userLoginRequestDTO.getUserName()).orElseThrow(() -> new RuntimeException("User không tồn tại")) ;
        if(!user.isActive()) return "";
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(userLoginRequestDTO.getPassword(), user.getPassword());

        if(!authenticated) {
            throw new RuntimeException("Unauthenticated");
        }
        return generateToken(user.getUserName());
    }

    private String generateToken(String username) {
        //Header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        //Payload
        JWTClaimsSet jwtClaimsSet= new JWTClaimsSet.Builder()
                .subject(username)
                .issuer("devnlu.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(24, ChronoUnit.HOURS).toEpochMilli()
                ))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header,payload);

        //Ký token
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return  jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token",e);

            throw new RuntimeException(e);
        }
    }

    private <T> T extractClaim(String token, Function<JWTClaimsSet, T> claimsResolver) {
        try {
            JWTClaimsSet claims = SignedJWT.parse(token).getJWTClaimsSet();
            return claimsResolver.apply(claims);
        } catch (Exception e) {
            throw new RuntimeException("Cannot extract claim", e);
        }
    }

    public JWTInfo extractInfo(String token){
        return JWTInfo.builder()
                .token(token)
                .userName(extractClaim(token,JWTClaimsSet::getSubject))
                .issuer(extractClaim(token,JWTClaimsSet::getIssuer))
                .build();
    }

    private JWTClaimsSet extractClaims(String token) {
        try {
            SignedJWT jwt = SignedJWT.parse(token);
            return jwt.getJWTClaimsSet();
        }catch (Exception e) {
            throw new RuntimeException("Cannot extract claims from token",e);
        }
    }

}
