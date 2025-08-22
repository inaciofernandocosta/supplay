import { PurchaseOrder } from './types';

// Pedidos de compra realistas que correspondem aos produtos em estoque
export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO001',
    familia: 'Arroz Branco 5kg',
    fornecedor: 'Tio João',
    cd: 'CD Vila Nova',
    quantidade: 3000, // 3 mil unidades
    valorUnitario: 30.00,
    valorTotal: 90000, // R$ 90 mil
    dataEntregaPrevista: new Date('2024-08-25'),
    status: 'aberto'
  },
  {
    id: 'PO002',
    familia: 'Açúcar Cristal 1kg',
    fornecedor: 'União',
    cd: 'CD Vila Nova',
    quantidade: 5000, // 5 mil unidades
    valorUnitario: 5.00,
    valorTotal: 25000, // R$ 25 mil
    dataEntregaPrevista: new Date('2024-08-24'),
    status: 'em_transito'
  },
  {
    id: 'PO003',
    familia: 'Óleo de Soja 900ml',
    fornecedor: 'Liza',
    cd: 'CD Focomix SP',
    quantidade: 2000, // 2 mil unidades
    valorUnitario: 7.00,
    valorTotal: 14000, // R$ 14 mil
    dataEntregaPrevista: new Date('2024-08-26'),
    status: 'aberto'
  },
  {
    id: 'PO004',
    familia: 'Feijão Carioca 1kg',
    fornecedor: 'Camil',
    cd: 'CD Vila Nova',
    quantidade: 3500, // 3,5 mil unidades
    valorUnitario: 8.00,
    valorTotal: 28000, // R$ 28 mil
    dataEntregaPrevista: new Date('2024-08-27'),
    status: 'aberto'
  },
  {
    id: 'PO005',
    familia: 'Macarrão Espaguete 500g',
    fornecedor: 'Barilla',
    cd: 'CD Focomix MG',
    quantidade: 6000, // 6 mil unidades
    valorUnitario: 5.00,
    valorTotal: 30000, // R$ 30 mil
    dataEntregaPrevista: new Date('2024-08-28'),
    status: 'aberto'
  },
  {
    id: 'PO006',
    familia: 'Refrigerante Cola 2L',
    fornecedor: 'Coca-Cola',
    cd: 'CD Vila Nova',
    quantidade: 1500, // 1,5 mil unidades
    valorUnitario: 7.00,
    valorTotal: 10500, // R$ 10,5 mil
    dataEntregaPrevista: new Date('2024-08-25'),
    status: 'em_transito'
  },
  {
    id: 'PO007',
    familia: 'Biscoito Recheado 140g',
    fornecedor: 'Mondelez',
    cd: 'CD Focomix SP',
    quantidade: 4000, // 4 mil unidades
    valorUnitario: 4.00,
    valorTotal: 16000, // R$ 16 mil
    dataEntregaPrevista: new Date('2024-08-29'),
    status: 'aberto'
  },
  {
    id: 'PO008',
    familia: 'Café Torrado 500g',
    fornecedor: 'Pilão',
    cd: 'CD V2 Farma',
    quantidade: 1000, // 1 mil unidades
    valorUnitario: 15.00,
    valorTotal: 15000, // R$ 15 mil
    dataEntregaPrevista: new Date('2024-08-30'),
    status: 'aberto'
  },
  {
    id: 'PO009',
    familia: 'Detergente 500ml',
    fornecedor: 'Ypê',
    cd: 'CD Vila Nova',
    quantidade: 8000, // 8 mil unidades
    valorUnitario: 2.00,
    valorTotal: 16000, // R$ 16 mil
    dataEntregaPrevista: new Date('2024-08-26'),
    status: 'em_transito'
  },
  {
    id: 'PO010',
    familia: 'Sabão em Pó 1kg',
    fornecedor: 'Omo',
    cd: 'CD Focomix MG',
    quantidade: 2500, // 2,5 mil unidades
    valorUnitario: 15.00,
    valorTotal: 37500, // R$ 37,5 mil
    dataEntregaPrevista: new Date('2024-08-31'),
    status: 'aberto'
  }
];