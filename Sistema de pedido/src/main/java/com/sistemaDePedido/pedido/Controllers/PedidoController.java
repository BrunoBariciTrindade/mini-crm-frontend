package com.sistemaDePedido.pedido.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaDePedido.pedido.Entitys.Pedido;
import com.sistemaDePedido.pedido.Services.PedidoService;



@RestController
@RequestMapping("/pedidos")
public class PedidoController {
    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/cadastrar") 
    public Pedido salvarPedido(Pedido pedido){
        return pedidoService.salvarPedido(pedido);

    }
    @GetMapping("/buscar/{id}")
    public Pedido buscarPedidoPorId(Long id){
        return pedidoService.buscarPedidoPorId(id);
    }   
    @GetMapping("/listar")
    public List<Pedido> listarPedidos(){
        return pedidoService.listarPedidos();
    }
    @PutMapping("atualizar/{id}")
    public Pedido atualizarPedido(@PathVariable Long id, @RequestBody Pedido pedidoAtualizado){
        return pedidoService.atualizarPedido(id, pedidoAtualizado);
    }
    @DeleteMapping("/deletar/{id}")
    public void deletarPedido(@PathVariable Long id){
        pedidoService.deletarPedido(id);   
    } 
    
}

