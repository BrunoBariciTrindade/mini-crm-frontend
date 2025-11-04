package com.sistemaDePedido.pedido.Entitys;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;


@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;    
    @OneToMany(mappedBy = "pedido", cascade = jakarta.persistence.CascadeType.ALL)
    private List<ItemPedido> itemPedido = new ArrayList<>();
    private Date pedidoData;
    private Double valorTotal;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ItemPedido> getItemPedido() {
        return itemPedido;
    }

    public void setItemPedido(List<ItemPedido> itemPedido) {
        this.itemPedido = itemPedido;
    }
    public void adicionarItemPedido(ItemPedido item) {
        this.itemPedido.add(item);
        item.setPedido(this);
    }

    public Date getPedidoData() {
        return pedidoData;
    }

    public void setPedidoData(Date pedidoData) {
        this.pedidoData = pedidoData;
    }

    public Double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
    
}
