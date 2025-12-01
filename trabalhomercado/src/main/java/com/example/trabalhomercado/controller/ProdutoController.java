package com.example.trabalhomercado.controller;

import com.example.trabalhomercado.dto.ProdutoDto;
import com.example.trabalhomercado.exception.ResourceNotFoundException;
import com.example.trabalhomercado.model.Produto;
import com.example.trabalhomercado.repository.ProdutoRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/produtos")
    public List<ProdutoDto> getProdutos() {
        return produtoRepository.findAll().stream()
                .map(p -> new ProdutoDto(p.getId(), p.getNome(), p.getPreco(), p.getDescricao(), p.getCategoria()))
                .collect(Collectors.toList());
    }

    @GetMapping("/produtos/{id}")
    public ProdutoDto getProduto(@PathVariable Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto não encontrado"));
        return new ProdutoDto(produto.getId(), produto.getNome(), produto.getPreco(), produto.getDescricao(), produto.getCategoria());
    }
}