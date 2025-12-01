package com.example.trabalhomercado.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trabalhomercado.dto.CarrinhoDto;
import com.example.trabalhomercado.dto.ProdutoDto;
import com.example.trabalhomercado.model.Carrinho;
import com.example.trabalhomercado.model.Produto;
import com.example.trabalhomercado.repository.CarrinhoRepository;
import com.example.trabalhomercado.repository.ProdutoRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CarrinhoController {

    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/carrinho")
    public List<CarrinhoDto> getCarrinho() {
        return carrinhoRepository.findAll().stream()
                .map(c -> new CarrinhoDto(c.getId(),
                        new ProdutoDto(c.getProduto().getId(), c.getProduto().getNome(), c.getProduto().getPreco(), c.getProduto().getDescricao(), c.getProduto().getCategoria()),
                        c.getQuantidade()))
                .collect(Collectors.toList());
    }

    @PostMapping("/carrinho")
    public ResponseEntity<String> addToCarrinho(@Valid @RequestBody CarrinhoRequest request) {
        Produto produto = produtoRepository.findById(request.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        Carrinho item = new Carrinho(produto, request.getQuantidade());
        carrinhoRepository.save(item);
        return ResponseEntity.ok("Item adicionado ao carrinho");
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout() {
        carrinhoRepository.deleteAll();  // Simula processamento
        return ResponseEntity.ok("Compra finalizada com sucesso!");
    }

    // Classe interna para validação
    public static class CarrinhoRequest {
        @NotNull(message = "Produto ID é obrigatório")
        @Min(value = 1, message = "Produto ID deve ser maior que 0")
        private Long produtoId;

        @NotNull(message = "Quantidade é obrigatória")
        @Min(value = 1, message = "Quantidade deve ser pelo menos 1")
        private Integer quantidade;

        // Getters e Setters
        public Long getProdutoId() { return produtoId; }
        public void setProdutoId(Long produtoId) { this.produtoId = produtoId; }
        public Integer getQuantidade() { return quantidade; }
        public void setQuantidade(Integer quantidade) { this.quantidade = quantidade; }
    }
}