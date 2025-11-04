package com.sistemaDePedido.pedido.Repositorys;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaDePedido.pedido.Entitys.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
}
