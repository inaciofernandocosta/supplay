import { PurchaseOrder } from './types';

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    familia: 'Biscoito Recheado Chocolate',
    fornecedor: 'Mondelez',
    cd: 'CD São Paulo',
    quantidade: 2400,
    valorUnitario: 3.25,
    valorTotal: 7800,
    dataEntregaPrevista: new Date('2024-08-25'),
    status: 'aberto'
  },
  {
    id: 'PO002',
    familia: 'Refrigerante Cola 2L',
    fornecedor: 'Coca-Cola',
    cd: 'CD São Paulo',
    quantidade: 1800,
    valorUnitario: 4.50,
    valorTotal: 8100,
    dataEntregaPrevista: new Date('2024-08-24'),
    status: 'em_transito'
  },
  {
    id: 'PO003',
    familia: 'Arroz Tipo 1 5kg',
    fornecedor: 'Tio João',
    cd: 'CD Rio de Janeiro',
    quantidade: 3200,
    valorUnitario: 18.75,
    valorTotal: 60000,
    dataEntregaPrevista: new Date('2024-08-26'),
    status: 'aberto'
  },
  {
    id: 'PO004',
    familia: 'Óleo de Soja 900ml',
    fornecedor: 'Sadia',
    cd: 'CD São Paulo',
    quantidade: 1500,
    valorUnitario: 6.80,
    valorTotal: 10200,
    dataEntregaPrevista: new Date('2024-08-27'),
    status: 'aberto'
  },
  {
    id: 'PO005',
    familia: 'Macarrão Espaguete 500g',
    fornecedor: 'Barilla',
    cd: 'CD Belo Horizonte',
    quantidade: 2800,
    valorUnitario: 4.25,
    valorTotal: 11900,
    dataEntregaPrevista: new Date('2024-08-28'),
    status: 'aberto'
  },
  {
    id: 'PO006',
    familia: 'Achocolatado Pó 400g',
    fornecedor: 'Nestlé',
    cd: 'CD São Paulo',
    quantidade: 2200,
    valorUnitario: 8.90,
    valorTotal: 19580,
    dataEntregaPrevista: new Date('2024-08-25'),
    status: 'em_transito'
  },
  {
    id: 'PO007',
    familia: 'Feijão Preto 1kg',
    fornecedor: 'Kicaldo',
    cd: 'CD Rio de Janeiro',
    quantidade: 1600,
    valorUnitario: 7.30,
    valorTotal: 11680,
    dataEntregaPrevista: new Date('2024-08-29'),
    status: 'aberto'
  },
  {
    id: 'PO008',
    familia: 'Sabão em Pó 1kg',
    fornecedor: 'Unilever',
    cd: 'CD Belo Horizonte',
    quantidade: 3500,
    valorUnitario: 12.40,
    valorTotal: 43400,
    dataEntregaPrevista: new Date('2024-08-30'),
    status: 'aberto'
  }
];