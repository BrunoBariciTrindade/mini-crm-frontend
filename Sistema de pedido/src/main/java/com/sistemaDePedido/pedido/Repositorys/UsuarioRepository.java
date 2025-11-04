package com.sistemaDePedido.pedido.Repositorys;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaDePedido.pedido.Entitys.Usuario;
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
}