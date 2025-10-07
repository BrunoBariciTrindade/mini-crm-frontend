export interface Endereco {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  uf: string;
  codigoIbge: string;
  cidade: string;
  ddd: string;
  codigoSiafi: string;
}

export interface Cliente {
  id: number;
  nome: string;
  cep: string;
  cpf: string;
  email: string;
  telefone: string;
  genero: string;
  dataNascimento: string;
  endereco: Endereco;
  uf: string;
  userName: string;
  senha: string;
  confirmarSenha?: string;
}
