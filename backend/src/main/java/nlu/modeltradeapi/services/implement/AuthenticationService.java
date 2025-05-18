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
import nlu.modeltradeapi.dtos.requestdto.user.IntrospectRequestDTO;
import nlu.modeltradeapi.dtos.responsedto.AuthenticationResponseonseDTO;
import nlu.modeltradeapi.dtos.responsedto.IntrospecResponseonseDTO;
import nlu.modeltradeapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import nlu.modeltradeapi.dtos.requestdto.user.AuthenticationRequestDTO;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;


    @NonFinal
    @Value("${jwt.signerKey}")
    private String SIGNER_KEY;
;


    public IntrospecResponseonseDTO introspect(IntrospectRequestDTO request) throws JOSEException, ParseException {
        var token =request.getToken();
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expirationDate = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified= signedJWT.verify(verifier);

        return IntrospecResponseonseDTO.builder()
                .valid( verified && expirationDate.after(new Date()))
                .build();



    }

    public AuthenticationResponseonseDTO authenticate(AuthenticationRequestDTO authenticationRequestDTO) {
        System.out.println(authenticationRequestDTO.getUserName());

        var user = userRepository.findByUserName(authenticationRequestDTO.getUserName()).orElseThrow(() -> new RuntimeException("User không tồn tại")) ;
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(authenticationRequestDTO.getPassword(), user.getPassword());

        if(!authenticated) {
            throw new RuntimeException("Unauthenticated");
        }
        var token = generateToken(authenticationRequestDTO.getUserName());
        return  AuthenticationResponseonseDTO.builder()
                .token(token)
                .authenticated(true)
                .build();




    }

    private String generateToken(String username) {
        //Header
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        //Payload
        JWTClaimsSet jwtClaimsSet= new JWTClaimsSet.Builder().subject(username).issuer("devnlu.com")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("customClaim", "Custom")
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

}
