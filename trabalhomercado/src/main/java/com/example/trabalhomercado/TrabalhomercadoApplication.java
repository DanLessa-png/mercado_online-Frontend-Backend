package com.example.trabalhomercado;

import com.example.trabalhomercado.model.Produto;
import com.example.trabalhomercado.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TrabalhomercadoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrabalhomercadoApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(ProdutoRepository produtoRepository) {
        return args -> {
            produtoRepository.save(new Produto("Maçã", 2.50, "Maçã vermelha fresca", "Frutas"));
            produtoRepository.save(new Produto("Banana", 1.80, "Banana prata", "Frutas"));
            produtoRepository.save(new Produto("Arroz", 5.00, "Arroz branco 1kg", "Grãos"));
        };
    }
}
