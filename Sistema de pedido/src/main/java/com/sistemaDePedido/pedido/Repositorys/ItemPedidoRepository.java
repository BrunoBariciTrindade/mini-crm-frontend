package com.sistemaDePedido.pedido.Repositorys;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaDePedido.pedido.Entitys.ItemPedido;   

public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long>{
    
}
