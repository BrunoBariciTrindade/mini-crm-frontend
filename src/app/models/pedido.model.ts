import { PedidoItem } from './pedidoItem.model';
export interface Pedido {
id?: number;
  clienteId: number;
  itens: PedidoItem[];
  total: number;
  data?: string;
  status?: string
}