package com.example.trabalhomercado.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class CarrinhoDto {

    private Long id;

    @NotNull(message = "O produto é obrigatório")
    private ProdutoDto produto;

    @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 1, message = "A quantidade deve ser pelo menos 1")
    private Integer quantidade;

    public CarrinhoDto() {
        // Construtor vazio necessário para o Spring/Jackson
    }

    public CarrinhoDto(Long id, ProdutoDto produto, Integer quantidade) {
        this.id = id;
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public Long getId() { return id; }

    public ProdutoDto getProduto() { return produto; }

    public Integer getQuantidade() { return quantidade; }

}
