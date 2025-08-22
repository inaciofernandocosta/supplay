import { PurchaseOrder } from './types';

// Pedidos de compra realistas compatíveis com estoque de ~35M
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    familia: 'Arroz Branco 5kg',
    fornecedor: 'Tio João',
    cd: 'CD Vila Nova',
    quantidade: 30000, // 30 mil unidades
    valorUnitario: 30.00,
    valorTotal: 900000, // R$ 900 mil
    dataEntregaPrevista: new Date('2024-08-25'),
    status: 'aberto'
  },
  {
    id: 'PO002',
    familia: 'Açúcar Cristal 1kg',
    fornecedor: 'União',
    cd: 'CD Vila Nova',
    quantidade: 50000, // 50 mil unidades
    valorUnitario: 5.00,
    valorTotal: 250000, // R$ 250 mil
    dataEntregaPrevista: new Date('2024-08-24'),
    status: 'em_transito'
  },
  {
    id: 'PO003',
    familia: 'Óleo de Soja 900ml',
    fornecedor: 'Liza',
    cd: 'CD Focomix SP',
    quantidade: 25000, // 25 mil unidades
    valorUnitario: 7.00,
    valorTotal: 175000, // R$ 175 mil
    dataEntregaPrevista: new Date('2024-08-26'),
    status: 'aberto'
  },
  {
    id: 'PO004',
    familia: 'Feijão Carioca 1kg',
    fornecedor: 'Camil',
    cd: 'CD Vila Nova',
    quantidade: 40000, // 40 mil unidades
    valorUnitario: 8.00,
    valorTotal: 320000, // R$ 320 mil
    dataEntregaPrevista: new Date('2024-08-27'),
    status: 'aberto'
  },
  {
    id: 'PO005',
    familia: 'Macarrão Espaguete 500g',
    fornecedor: 'Barilla',
    cd: 'CD Focomix MG',
    quantidade: 80000, // 80 mil unidades
    valorUnitario: 5.00,
    valorTotal: 400000, // R$ 400 mil
    dataEntregaPrevista: new Date('2024-08-28'),
    status: 'aberto'
  },
  {
    id: 'PO006',
    familia: 'Refrigerante Cola 2L',
    fornecedor: 'Coca-Cola',
    cd: 'CD Vila Nova',
    quantidade: 20000, // 20 mil unidades
    valorUnitario: 7.00,
    valorTotal: 140000, // R$ 140 mil
    dataEntregaPrevista: new Date('2024-08-25'),
    status: 'em_transito'
  },
  {
    id: 'PO007',
    familia: 'Biscoito Recheado 140g',
    fornecedor: 'Mondelez',
    cd: 'CD Focomix SP',
    quantidade: 60000, // 60 mil unidades
    valorUnitario: 4.00,
    valorTotal: 240000, // R$ 240 mil
    dataEntregaPrevista: new Date('2024-08-29'),
    status: 'aberto'
  },
  {
    id: 'PO008',
    familia: 'Café Torrado 500g',
    fornecedor: 'Pilão',
    cd: 'CD V2 Farma',
    quantidade: 15000, // 15 mil unidades
    valorUnitario: 15.00,
    valorTotal: 225000, // R$ 225 mil
    dataEntregaPrevista: new Date('2024-08-30'),
    status: 'aberto'
  },
  {
    id: 'PO009',
    familia: 'Detergente 500ml',
    fornecedor: 'Ypê',
    cd: 'CD Vila Nova',
    quantidade: 100000, // 100 mil unidades
    valorUnitario: 2.00,
    valorTotal: 200000, // R$ 200 mil
    dataEntregaPrevista: new Date('2024-08-26'),
    status: 'em_transito'
  },
  {
    id: 'PO010',
    familia: 'Sabão em Pó 1kg',
    fornecedor: 'Omo',
    cd: 'CD Focomix MG',
    quantidade: 35000, // 35 mil unidades
    valorUnitario: 15.00,
    valorTotal: 525000, // R$ 525 mil
    dataEntregaPrevista: new Date('2024-08-31'),
    status: 'aberto'
  },
  {
    id: 'PO011',
    familia: 'Leite Longa Vida 1L',
    fornecedor: 'Nestlé',
    cd: 'CD Vila Nova',
    quantidade: 70000, // 70 mil unidades
    valorUnitario: 4.00,
    valorTotal: 280000, // R$ 280 mil
    dataEntregaPrevista: new Date('2024-09-01'),
    status: 'aberto'
  },
  {
    id: 'PO012',
    familia: 'Frango Congelado 1kg',
    fornecedor: 'Sadia',
    cd: 'CD Focomix SP',
    quantidade: 12000, // 12 mil unidades
    valorUnitario: 15.00,
    valorTotal: 180000, // R$ 180 mil
    dataEntregaPrevista: new Date('2024-09-02'),
    status: 'em_transito'
  },
  {
    id: 'PO013',
    familia: 'Carne Bovina 1kg',
    fornecedor: 'JBS',
    cd: 'CD Vila Nova',
    quantidade: 8000, // 8 mil unidades
    valorUnitario: 40.00,
    valorTotal: 320000, // R$ 320 mil
    dataEntregaPrevista: new Date('2024-09-03'),
    status: 'aberto'
  },
  {
    id: 'PO014',
    familia: 'Papel Higiênico 4 rolos',
    fornecedor: 'Neve',
    cd: 'CD Vila Nova',
    quantidade: 20000, // 20 mil unidades
    valorUnitario: 10.00,
    valorTotal: 200000, // R$ 200 mil
    dataEntregaPrevista: new Date('2024-09-04'),
    status: 'aberto'
  },
  {
    id: 'PO015',
    familia: 'Cerveja Lata 350ml',
    fornecedor: 'Ambev',
    cd: 'CD Vila Nova',
    quantidade: 150000, // 150 mil unidades
    valorUnitario: 3.00,
    valorTotal: 450000, // R$ 450 mil
    dataEntregaPrevista: new Date('2024-09-05'),
    status: 'em_transito'
  }
];