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
            produtoRepository.save(new Produto("Arroz", 5.89, "Arroz branco", "Grãos"));
            produtoRepository.save(new Produto("Feijão", 7.43, "Feijão preto", "Grãos"));
            produtoRepository.save(new Produto("Farinha", 3.34, "Farinha branca", "Grãos"));
            produtoRepository.save(new Produto("Café", 10.45, "Café gão", "Grãos"));
            produtoRepository.save(new Produto("Macarrão", 7.34, "Macarrão", "Industrializados"));
            produtoRepository.save(new Produto("Carne", 25.65, "Carne de porco", "Carnes"));

        };
    }
}
