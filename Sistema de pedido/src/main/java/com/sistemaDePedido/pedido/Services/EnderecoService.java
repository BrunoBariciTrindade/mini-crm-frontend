package com.sistemaDePedido.pedido.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sistemaDePedido.pedido.Entitys.Endereco;

@Service
public class EnderecoService {
    private final RestTemplate restTemplate = new RestTemplate();

   public Endereco buscarEnderecoPorCep(String cep) {
    String url = String.format("https://viacep.com.br/ws/%s/json/", cep);
    try {
        return restTemplate.getForObject(url, Endereco.class);
    } catch (Exception e) {
        System.err.println("Erro ao consultar CEP: " + e.getMessage());
        return null;
    }
}
}