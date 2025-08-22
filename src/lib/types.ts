// Tipos para gestão de estoque e pedidos de compra

export interface PurchaseOrder {
  id: string;
  familia: string;
  fornecedor: string;
  cd: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  dataEntregaPrevista: Date;
  status: 'aberto' | 'em_transito' | 'entregue' | 'cancelado';
}

export interface EstoqueComPedidos {
  familia: string;
  fornecedor: string;
  cd: string;
  estoqueAtual: number;
  valorEstoqueAtual: number;
  pedidosAbertos: number;
  valorPedidosAbertos: number;
  estoqueProjetado: number;
  valorEstoqueProjetado: number;
  giroMedio: number;
  coberturaAtual: number;
  coberturaProjetada: number;
  performance: 'alta' | 'media' | 'baixa';
}

export interface MetricasEstoque {
  totalValorEstoque: number;
  totalValorPedidos: number;
  totalValorProjetado: number;
  totalQuantidadeEstoque: number;
  totalQuantidadePedidos: number;
  mediaCobertura: number;
  mediaCoberturaProjetada: number;
  performanceAlta: number;
}