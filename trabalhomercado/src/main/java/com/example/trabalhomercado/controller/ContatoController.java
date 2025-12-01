package com.example.trabalhomercado.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalhomercado.dto.ContatoDto;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ContatoController {

    @PostMapping("/contato")
    public ResponseEntity<String> enviarContato(@Valid @RequestBody ContatoDto contato) {
        // Aqui você poderia persistir a mensagem em um repositório ou enviar um email.
        String mensagem = String.format("Mensagem recebida. Obrigado, %s!", contato.getNome());
        return ResponseEntity.ok(mensagem);
    }
}
