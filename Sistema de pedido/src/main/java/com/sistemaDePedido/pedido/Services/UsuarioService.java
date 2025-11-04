package com.sistemaDePedido.pedido.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sistemaDePedido.pedido.Entitys.Endereco;
import com.sistemaDePedido.pedido.Entitys.Usuario;
import com.sistemaDePedido.pedido.Repositorys.EnderecoRepository;
import com.sistemaDePedido.pedido.Repositorys.UsuarioRepository;
@Service
public class UsuarioService {
    @Autowired
    private EnderecoRepository enderecoRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;
     @Autowired
    private EnderecoService enderecoService;


 public Usuario salvarUsuario(Usuario usuario) {

    if (usuarioRepository.existsByEmail(usuario.getEmail())) {
        throw new IllegalArgumentException("Email já cadastrado: " + usuario.getEmail());
    }

    // Garante que há um objeto Endereco
    if (usuario.getEndereco() != null && usuario.getEndereco().getCep() != null) {
        // Busca o endereço completo pelo CEP
        Endereco endereco = enderecoService.buscarEnderecoPorCep(usuario.getEndereco().getCep());
        
        // Associa as entidades corretamente
        enderecoRepository.save(endereco);
        usuario.setEndereco(endereco);
        endereco.setUsuario(usuario);
    } else {
        throw new IllegalArgumentException("CEP é obrigatório para cadastrar usuário");
    }

    return usuarioRepository.save(usuario);
}
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
    public Usuario buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }
    public void deletarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
    public Usuario atualizarUsuario(Long id, Usuario usuarioAtualizado) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNome(usuarioAtualizado.getNome());
            usuario.setEmail(usuarioAtualizado.getEmail());
            usuario.setCpf(usuarioAtualizado.getCpf());
            return usuarioRepository.save(usuario);
        }).orElse(null);
    }
    
}
