package com.example.trabalhomercado.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.trabalhomercado.dto.LoginDto;
import com.example.trabalhomercado.dto.RegisterDto;
import com.example.trabalhomercado.model.User;
import com.example.trabalhomercado.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<?> register(RegisterDto dto) {
        Optional<User> existing = userRepository.findByEmail(dto.getEmail());
        if (existing.isPresent()) {
            Map<String, String> body = new HashMap<>();
            body.put("mensagem", "Email já cadastrado");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(body);
        }

        User u = new User();
        u.setNome(dto.getNome());
        u.setEmail(dto.getEmail());
        u.setSenha(passwordEncoder.encode(dto.getSenha()));
        userRepository.save(u);

        Map<String, String> body = new HashMap<>();
        body.put("mensagem", "Usuário cadastrado com sucesso");
        body.put("token", UUID.randomUUID().toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    public ResponseEntity<?> authenticate(LoginDto dto) {
        Optional<User> opt = userRepository.findByEmail(dto.getEmail());
        if (opt.isPresent()) {
            User u = opt.get();
            if (passwordEncoder.matches(dto.getSenha(), u.getSenha())) {
                Map<String, String> body = new HashMap<>();
                body.put("message", "Login realizado com sucesso");
                body.put("token", UUID.randomUUID().toString());
                return ResponseEntity.ok(body);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
    }
}
