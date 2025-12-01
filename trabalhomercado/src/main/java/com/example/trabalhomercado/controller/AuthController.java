package com.example.trabalhomercado.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalhomercado.dto.LoginDto;
import com.example.trabalhomercado.dto.RegisterDto;
import com.example.trabalhomercado.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto login) {
        return authService.authenticate(login);
    }

    @PostMapping("/usuarios")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDto dto) {
        return authService.register(dto);
    }
}
