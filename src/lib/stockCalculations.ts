import { PurchaseOrder, EstoqueComPedidos, MetricasEstoque } from './types';

export const calculateStockWithOrders = (
  estoqueOriginal: any[],
  pedidosCompra: PurchaseOrder[],
  filtroCD?: string,
  filtroFornecedor?: string
): { data: EstoqueComPedidos[]; metricas: MetricasEstoque } => {
  // Agrupa pedidos por família e fornecedor
  const pedidosAgrupados = pedidosCompra
    .filter(po => po.status === 'aberto' || po.status === 'em_transito')
    .reduce((acc, po) => {
      const key = `${po.familia}-${po.fornecedor}`;
      if (!acc[key]) {
        acc[key] = { quantidade: 0, valor: 0 };
      }
      acc[key].quantidade += po.quantidade;
      acc[key].valor += po.valorTotal;
      return acc;
    }, {} as Record<string, { quantidade: number; valor: number }>);

  // Combina estoque atual com pedidos
  let dataComPedidos = estoqueOriginal.map(item => {
    const key = `${item.familia}-${item.fornecedor}`;
    const pedidos = pedidosAgrupados[key] || { quantidade: 0, valor: 0 };
    
    // Validações para evitar NaN
    const estoqueAtual = item.estoqueAtual || 0;
    const valorEstoqueAtual = item.valorEstoqueAtual || 0;
    const giroMedio = item.giroMedio || 1; // Evita divisão por zero
    
    const estoqueProjetado = estoqueAtual + pedidos.quantidade;
    const valorProjetado = valorEstoqueAtual + pedidos.valor;
    
    // Cálculos de cobertura com validações
    const coberturaAtual = giroMedio > 0 ? estoqueAtual / giroMedio : 0;
    const coberturaProjetada = giroMedio > 0 ? estoqueProjetado / giroMedio : 0;
    
    // Define performance baseada na cobertura projetada
    let performance: 'alta' | 'media' | 'baixa' = 'baixa';
    if (coberturaProjetada >= 0.8 && coberturaProjetada <= 2.5) {
      performance = 'alta';
    } else if (coberturaProjetada >= 0.5 && coberturaProjetada <= 4.0) {
      performance = 'media';
    }

    return {
      familia: item.familia,
      fornecedor: item.fornecedor,
      cd: item.cd,
      estoqueAtual,
      valorEstoqueAtual,
      pedidosAbertos: pedidos.quantidade,
      valorPedidosAbertos: pedidos.valor,
      estoqueProjetado,
      valorEstoqueProjetado: valorProjetado,
      giroMedio,
      coberturaAtual: Math.max(0, coberturaAtual),
      coberturaProjetada: Math.max(0, coberturaProjetada),
      performance
    } as EstoqueComPedidos;
  });

  // Aplica filtros
  if (filtroCD && filtroCD !== 'todos') {
    dataComPedidos = dataComPedidos.filter(item => item.cd === filtroCD);
  }
  if (filtroFornecedor && filtroFornecedor !== 'todos') {
    dataComPedidos = dataComPedidos.filter(item => item.fornecedor === filtroFornecedor);
  }

  // Calcula métricas com validações para evitar NaN
  const totalValorEstoque = dataComPedidos.reduce((sum, item) => sum + (item.valorEstoqueAtual || 0), 0);
  const totalValorPedidos = dataComPedidos.reduce((sum, item) => sum + (item.valorPedidosAbertos || 0), 0);
  const totalQuantidadeEstoque = dataComPedidos.reduce((sum, item) => sum + (item.estoqueAtual || 0), 0);
  const totalQuantidadePedidos = dataComPedidos.reduce((sum, item) => sum + (item.pedidosAbertos || 0), 0);
  
  // Filtrar valores válidos para coberturas
  const coberturasValidas = dataComPedidos.map(item => item.coberturaAtual).filter(c => !isNaN(c) && c >= 0);
  const coberturasProjetadasValidas = dataComPedidos.map(item => item.coberturaProjetada).filter(c => !isNaN(c) && c >= 0);
  
  const metricas: MetricasEstoque = {
    totalValorEstoque,
    totalValorPedidos,
    totalValorProjetado: totalValorEstoque + totalValorPedidos,
    totalQuantidadeEstoque,
    totalQuantidadePedidos,
    mediaCobertura: coberturasValidas.length > 0 
      ? coberturasValidas.reduce((sum, item) => sum + item, 0) / coberturasValidas.length 
      : 0,
    mediaCoberturaProjetada: coberturasProjetadasValidas.length > 0 
      ? coberturasProjetadasValidas.reduce((sum, item) => sum + item, 0) / coberturasProjetadasValidas.length 
      : 0,
    performanceAlta: dataComPedidos.length > 0 
      ? (dataComPedidos.filter(item => item.performance === 'alta').length / dataComPedidos.length) * 100
      : 0
  };

  return { data: dataComPedidos, metricas };
};

export const getUniqueValues = (data: any[], field: string): string[] => {
  const values = [...new Set(data.map(item => item[field]))].filter(Boolean);
  return values.sort();
};