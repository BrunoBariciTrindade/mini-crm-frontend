package com.sistemaDePedido.pedido.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaDePedido.pedido.Entitys.Endereco;
import com.sistemaDePedido.pedido.Services.EnderecoService;

@RestController
@RequestMapping("/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping("/{cep}")
    public ResponseEntity<Endereco> buscarEndereco(@PathVariable String cep) {
        Endereco endereco = enderecoService.buscarEnderecoPorCep(cep);
        if (endereco == null || endereco.getCep() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(endereco);
    }

}
