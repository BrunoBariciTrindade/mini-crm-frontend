package com.sistemaDePedido.pedido.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sistemaDePedido.pedido.Entitys.Pedido;
import com.sistemaDePedido.pedido.Repositorys.PedidoRepository;

@Service
public class PedidoService {
    @Autowired
    private PedidoRepository pedidoRepository;
    public Pedido salvarPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    public Pedido buscarPedidoPorId(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }
    public void deletarPedido(Long id) {
        pedidoRepository.deleteById(id);
    }
    public List<Pedido> listarPedidos() {
        return pedidoRepository.findAll();
    }
    public Pedido atualizarPedido(Long id, Pedido pedidoAtualizado) {
        return pedidoRepository.findById(id).map(pedido -> {
            pedido.setPedidoData(pedidoAtualizado.getPedidoData());
            pedido.setValorTotal(pedidoAtualizado.getValorTotal());
            return pedidoRepository.save(pedido);
        }).orElse(null);
    }   
}
