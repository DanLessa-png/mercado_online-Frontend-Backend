package com.example.trabalhomercado.repository;

import com.example.trabalhomercado.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}