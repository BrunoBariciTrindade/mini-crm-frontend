package com.sistemaDePedido.pedido.Repositorys;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaDePedido.pedido.Entitys.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}
