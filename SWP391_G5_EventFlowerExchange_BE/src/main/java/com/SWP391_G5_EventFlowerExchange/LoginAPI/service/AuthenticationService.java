package com.SWP391_G5_EventFlowerExchange.LoginAPI.service;

import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.AuthenticationRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.AuthenticationResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.request.IntrospectRequest;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.dto.response.IntrospectResponse;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.entity.User;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.AppException;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.exception.ErrorCode;
import com.SWP391_G5_EventFlowerExchange.LoginAPI.repository.IUserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationService.class);
    IUserRepository IUserRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token= request.getToken();

        JWSVerifier verifier =new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT= SignedJWT.parse(token);

        Date expityTime= signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        return  IntrospectResponse.builder()
                .valid(verified && expityTime.after(new Date()))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user= IUserRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated= passwordEncoder.matches(request.getPassword(), user.getPassword());

        if(!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        var token= generateToken(user);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimSet= new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("EventFlowerExchange")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("userID", user.getUserID())
                .claim("email", user.getEmail())
                .claim("address", user.getAddress())
                .claim("phoneNumber", user.getPhoneNumber())
                .claim("roles", user.getRoles())
                .claim("scope", buildScope(user))
                .build();


        Payload payload= new Payload(jwtClaimSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
            StringJoiner stringJoiner= new StringJoiner(" ");
            if(!CollectionUtils.isEmpty(user.getRoles())) {
                user.getRoles().forEach(stringJoiner::add);
            }
            return stringJoiner.toString();
    }
}