import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Download, TrendingUp, TrendingDown, Minus, Calculator, ShoppingCart } from "lucide-react";
import { formatValue } from "@/lib/formatters";
import { MetricCard } from "../MetricCard";
import { calculateStockWithOrders, getUniqueValues } from "@/lib/stockCalculations";
import { mockPurchaseOrders } from "@/lib/mockPurchaseOrders";

interface PerformanceItem {
  id: string;
  familia: string;
  categoria: string;
  fornecedor: string;
  cd: string;
  totalEstoque: number;
  giroMedio: number;
  coberturaMeses: number;
  performance: 'alta' | 'media' | 'baixa';
  score: number;
  valorCusto: number;
  valorVenda: number;
  embalagem: number;
  quantidadeGiro: number;
  quantidadeEstoque: number;
}

export const PerformanceView = () => {
  const [filtroCD, setFiltroCD] = useState<string>("todos");
  const [filtroFornecedor, setFiltroFornecedor] = useState<string>("todos");

  // Percentual de markdown - em produção virá das configurações
  const markdownPercentual = 16.5;
  const divisorMarkdown = 100 - markdownPercentual; // 83.5

  const performanceData: PerformanceItem[] = [
    {
      id: '1',
      familia: 'Arroz Tipo 1 5kg',
      categoria: 'Grãos',
      fornecedor: 'Tio João',
      cd: 'CD Rio de Janeiro',
      totalEstoque: 1350000,
      giroMedio: 450000,
      coberturaMeses: 3.0,
      performance: 'media',
      score: 75,
      valorCusto: 2700000,
      valorVenda: 2700000 / (divisorMarkdown / 100),
      embalagem: 30,
      quantidadeGiro: 15000,
      quantidadeEstoque: 45000
    },
    {
      id: '2',
      familia: 'Feijão Carioca',
      categoria: 'Grãos',
      fornecedor: 'Fornecedor ABC Ltda',
      cd: 'CD São Paulo',
      totalEstoque: 1080000,
      giroMedio: 380000,
      coberturaMeses: 2.8,
      performance: 'alta',
      score: 88,
      valorCusto: 3240000,
      valorVenda: 3240000 / (divisorMarkdown / 100),
      embalagem: 25,
      quantidadeGiro: 15200,
      quantidadeEstoque: 43200
    },
    {
      id: '3',
      familia: 'Açúcar Cristal',
      categoria: 'Açúcares',
      fornecedor: 'Central de Abastecimento Norte',
      cd: 'CD Belo Horizonte',
      totalEstoque: 1550000,
      giroMedio: 520000,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 92,
      valorCusto: 1860000,
      valorVenda: 1860000 / (divisorMarkdown / 100),
      embalagem: 50,
      quantidadeGiro: 10400,
      quantidadeEstoque: 31000
    },
    {
      id: '4',
      familia: 'Óleo de Soja',
      categoria: 'Óleos',
      fornecedor: 'Atacadão Distribuição',
      cd: 'CD São Paulo',
      totalEstoque: 780000,
      giroMedio: 250000,
      coberturaMeses: 3.1,
      performance: 'media',
      score: 78,
      valorCusto: 4680000,
      valorVenda: 4680000 / (divisorMarkdown / 100),
      embalagem: 12,
      quantidadeGiro: 20833,
      quantidadeEstoque: 65000
    },
    {
      id: '5',
      familia: 'Macarrão Espaguete',
      categoria: 'Massas',
      fornecedor: 'Mega Fornecimentos',
      cd: 'CD Belo Horizonte',
      totalEstoque: 1240000,
      giroMedio: 420000,
      coberturaMeses: 2.9,
      performance: 'alta',
      score: 85,
      valorCusto: 2480000,
      valorVenda: 2480000 / (divisorMarkdown / 100),
      embalagem: 20,
      quantidadeGiro: 21000,
      quantidadeEstoque: 62000
    },
    {
      id: '6',
      familia: 'Leite em Pó',
      categoria: 'Laticínios',
      fornecedor: 'Comercial Vitória',
      cd: 'CD São Paulo',
      totalEstoque: 630000,
      giroMedio: 210000,
      coberturaMeses: 3.0,
      performance: 'media',
      score: 82,
      valorCusto: 5670000,
      valorVenda: 5670000 / (divisorMarkdown / 100),
      embalagem: 18,
      quantidadeGiro: 11667,
      quantidadeEstoque: 35000
    },
    {
      id: '7',
      familia: 'Café Torrado',
      categoria: 'Bebidas',
      fornecedor: 'Distribuidora Premium',
      cd: 'CD Rio de Janeiro',
      totalEstoque: 480000,
      giroMedio: 160000,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 90,
      valorCusto: 3840000,
      valorVenda: 3840000 / (divisorMarkdown / 100),
      embalagem: 24,
      quantidadeGiro: 6667,
      quantidadeEstoque: 20000
    },
    {
      id: '8',
      familia: 'Farinha de Trigo',
      categoria: 'Farinhas',
      fornecedor: 'Fornecedor Regional Ltda',
      cd: 'CD Belo Horizonte',
      totalEstoque: 2000000,
      giroMedio: 650000,
      coberturaMeses: 3.1,
      performance: 'baixa',
      score: 68,
      valorCusto: 2400000,
      valorVenda: 2400000 / (divisorMarkdown / 100),
      embalagem: 25,
      quantidadeGiro: 26000,
      quantidadeEstoque: 80000
    }
  ];

  // Calcula dados com pedidos de compra para performance
  const performanceComPedidos = performanceData.map(item => {
    const key = `${item.familia}-${item.fornecedor}`;
    const pedidos = mockPurchaseOrders
      .filter(po => po.familia === item.familia && po.fornecedor === item.fornecedor && (po.status === 'aberto' || po.status === 'em_transito'))
      .reduce((acc, po) => ({ quantidade: acc.quantidade + po.quantidade, valor: acc.valor + po.valorTotal }), { quantidade: 0, valor: 0 });
    
    return {
      ...item,
      pedidosAbertos: pedidos.quantidade,
      valorPedidosAbertos: pedidos.valor,
      estoqueProjetado: item.totalEstoque + pedidos.quantidade,
      valorEstoqueProjetado: item.valorCusto + pedidos.valor
    };
  });

  const filteredData = performanceComPedidos.filter(item => {
    const matchCD = filtroCD === "todos" || item.cd === filtroCD;
    const matchFornecedor = filtroFornecedor === "todos" || item.fornecedor === filtroFornecedor;
    return matchCD && matchFornecedor;
  });

  const totalValorVenda = filteredData.reduce((acc, item) => acc + item.valorVenda, 0);
  const totalValorCusto = filteredData.reduce((acc, item) => acc + item.valorCusto, 0);
  const totalValorPedidos = filteredData.reduce((acc, item) => acc + (item.valorPedidosAbertos || 0), 0);
  const margemMedia = ((totalValorVenda - totalValorCusto) / totalValorVenda) * 100;
  const mediaCobertura = filteredData.reduce((acc, item) => acc + item.coberturaMeses, 0) / filteredData.length;
  const performanceAlta = filteredData.filter(item => item.performance === 'alta').length;

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'alta': return 'text-success';
      case 'media': return 'text-warning';
      case 'baixa': return 'text-danger';
      default: return 'text-muted-foreground';
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case 'alta': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'media': return <Minus className="h-4 w-4 text-warning" />;
      case 'baixa': return <TrendingDown className="h-4 w-4 text-danger" />;
      default: return null;
    }
  };

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      'alta': 'default',
      'media': 'secondary', 
      'baixa': 'destructive'
    } as const;
    
    const labels = {
      'alta': 'Alta',
      'media': 'Média',
      'baixa': 'Baixa'
    };

    return (
      <Badge variant={variants[performance as keyof typeof variants]}>
        {labels[performance as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performance de Estoque</h1>
            <p className="text-muted-foreground">Análise de estoque com preço de venda (Markdown {markdownPercentual}%)</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Valor de Venda"
          value={`R$ ${(totalValorVenda / 1000000).toFixed(1)}M`}
          subtitle="Potencial de receita"
          icon={TrendingUp}
          status="success"
        />
        <MetricCard
          title="Valor de Custo"
          value={`R$ ${(totalValorCusto / 1000000).toFixed(1)}M`}
          subtitle="Investimento atual"
          icon={Calculator}
          status="warning"
        />
        <MetricCard
          title="Pedidos Abertos"
          value={`R$ ${(totalValorPedidos / 1000000).toFixed(1)}M`}
          subtitle="Valor em pedidos"
          icon={ShoppingCart}
          status="warning"
        />
        <MetricCard
          title="Margem Média"
          value={`${margemMedia.toFixed(1)}%`}
          subtitle="Margem de lucro"
          icon={TrendingUp}
          status={margemMedia >= 15 ? "success" : margemMedia >= 10 ? "warning" : "danger"}
        />
        <MetricCard
          title="Performance Alta"
          value={`${performanceAlta}/${filteredData.length}`}
          subtitle="Famílias com alta performance"
          icon={TrendingUp}
          status="success"
        />
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CD</label>
              <Select value={filtroCD} onValueChange={setFiltroCD}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o CD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os CDs</SelectItem>
                  <SelectItem value="CD São Paulo">CD São Paulo</SelectItem>
                  <SelectItem value="CD Rio de Janeiro">CD Rio de Janeiro</SelectItem>
                  <SelectItem value="CD Belo Horizonte">CD Belo Horizonte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Fornecedor</label>
              <Select value={filtroFornecedor} onValueChange={setFiltroFornecedor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Fornecedores</SelectItem>
                  {Array.from(new Set(performanceData.map(item => item.fornecedor))).map(fornecedor => (
                    <SelectItem key={fornecedor} value={fornecedor}>
                      {fornecedor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Performance */}
      <div className="glass-card rounded-lg">
        <div className="p-4 lg:p-6 border-b border-border/50">
          <h3 className="text-lg font-semibold text-foreground">Performance por Família</h3>
          <p className="text-sm text-muted-foreground">Análise com valores reais de venda (Custo + Markdown)</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="min-w-[200px]">Família</TableHead>
                <TableHead className="text-right min-w-[100px]">Estoque Atual</TableHead>
                <TableHead className="text-right min-w-[120px]">Pedidos Abertos</TableHead>
                <TableHead className="text-right min-w-[120px]">Valor Custo</TableHead>
                <TableHead className="text-right min-w-[120px]">Valor Venda</TableHead>
                <TableHead className="text-right min-w-[100px]">Margem</TableHead>
                <TableHead className="text-right min-w-[100px]">Cobertura</TableHead>
                <TableHead className="min-w-[100px]">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const margem = ((item.valorVenda - item.valorCusto) / item.valorVenda) * 100;
                return (
                  <TableRow key={item.id} className="border-border/50 hover:bg-muted/30">
                    <TableCell>
                      <div className="font-medium text-foreground truncate max-w-[180px]">{item.familia}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">{item.fornecedor}</div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {Math.round(item.totalEstoque).toLocaleString('pt-BR')}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {(item.pedidosAbertos || 0) > 0 ? (
                        <span className="text-warning">{Math.round(item.pedidosAbertos || 0).toLocaleString('pt-BR')}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      R$ {(item.valorCusto / 1000).toLocaleString('pt-BR')}k
                    </TableCell>
                    <TableCell className="text-right font-medium text-success">
                      R$ {(item.valorVenda / 1000).toLocaleString('pt-BR')}k
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={margem >= 15 ? 'text-success' : margem >= 10 ? 'text-warning' : 'text-danger'}>
                        {margem.toFixed(1)}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={item.coberturaMeses > 3.5 ? 'text-danger' : item.coberturaMeses > 2.5 ? 'text-warning' : 'text-success'}>
                        {item.coberturaMeses.toFixed(1)}m
                      </span>
                    </TableCell>
                    <TableCell>
                      {getPerformanceBadge(item.performance)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};