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
    
    const estoqueProjetado = item.totalEstoque + pedidos.quantidade;
    const valorProjetado = item.valorEstoque + pedidos.valor;
    const coberturaProjetada = item.giroMedio > 0 ? estoqueProjetado / item.giroMedio : 0;

    return {
      familia: item.familia,
      fornecedor: item.fornecedor,
      cd: item.cd,
      estoqueAtual: item.totalEstoque,
      valorEstoqueAtual: item.valorEstoque,
      pedidosAbertos: pedidos.quantidade,
      valorPedidosAbertos: pedidos.valor,
      estoqueProjetado,
      valorEstoqueProjetado: valorProjetado,
      giroMedio: item.giroMedio,
      coberturaAtual: item.coberturaMeses,
      coberturaProjetada,
      performance: item.performance
    } as EstoqueComPedidos;
  });

  // Aplica filtros
  if (filtroCD && filtroCD !== 'todos') {
    dataComPedidos = dataComPedidos.filter(item => item.cd === filtroCD);
  }
  if (filtroFornecedor && filtroFornecedor !== 'todos') {
    dataComPedidos = dataComPedidos.filter(item => item.fornecedor === filtroFornecedor);
  }

  // Calcula métricas
  const metricas: MetricasEstoque = {
    totalValorEstoque: dataComPedidos.reduce((sum, item) => sum + item.valorEstoqueAtual, 0),
    totalValorPedidos: dataComPedidos.reduce((sum, item) => sum + item.valorPedidosAbertos, 0),
    totalValorProjetado: dataComPedidos.reduce((sum, item) => sum + item.valorEstoqueProjetado, 0),
    totalQuantidadeEstoque: dataComPedidos.reduce((sum, item) => sum + item.estoqueAtual, 0),
    totalQuantidadePedidos: dataComPedidos.reduce((sum, item) => sum + item.pedidosAbertos, 0),
    mediaCobertura: dataComPedidos.length > 0 
      ? dataComPedidos.reduce((sum, item) => sum + item.coberturaAtual, 0) / dataComPedidos.length 
      : 0,
    mediaCoberturaProjetada: dataComPedidos.length > 0 
      ? dataComPedidos.reduce((sum, item) => sum + item.coberturaProjetada, 0) / dataComPedidos.length 
      : 0,
    performanceAlta: dataComPedidos.filter(item => item.performance === 'alta').length
  };

  return { data: dataComPedidos, metricas };
};

export const getUniqueValues = (data: any[], field: string): string[] => {
  const values = [...new Set(data.map(item => item[field]))].filter(Boolean);
  return values.sort();
};