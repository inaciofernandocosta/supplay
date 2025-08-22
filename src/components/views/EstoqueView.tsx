import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Download, Package, TrendingUp, TrendingDown, Minus, ShoppingCart } from "lucide-react";
import { formatValue } from "@/lib/formatters";
import { MetricCard } from "../MetricCard";
import { calculateStockWithOrders, getUniqueValues } from "@/lib/stockCalculations";
import { mockPurchaseOrders } from "@/lib/mockPurchaseOrders";

interface EstoqueFamilia {
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
  valorEstoque: number;
  embalagem: number;
  quantidadeGiro: number;
  quantidadeEstoque: number;
}

export const EstoqueView = () => {
  const [filtroCD, setFiltroCD] = useState<string>("todos");
  const [filtroFornecedor, setFiltroFornecedor] = useState<string>("todos");

  const estoqueData: EstoqueFamilia[] = [
    {
      id: '1',
      familia: 'Biscoito Oreo Original 144g',
      categoria: 'Biscoitos',
      fornecedor: 'Mondelez',
      cd: 'CD São Paulo',
      totalEstoque: 45000,
      giroMedio: 15000,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 88,
      valorEstoque: 2700000,
      embalagem: 30,
      quantidadeGiro: 15000,
      quantidadeEstoque: 45000
    },
    {
      id: '2',
      familia: 'Fralda Pampers Total Confort G',
      categoria: 'Higiene',
      fornecedor: 'Procter & Gamble',
      cd: 'CD São Paulo',
      totalEstoque: 28500,
      giroMedio: 9500,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 92,
      valorEstoque: 3240000,
      embalagem: 25,
      quantidadeGiro: 9500,
      quantidadeEstoque: 28500
    },
    {
      id: '3',
      familia: 'Whisky Johnnie Walker Red Label',
      categoria: 'Bebidas Alcoólicas',
      fornecedor: 'Diageo',
      cd: 'CD Rio de Janeiro',
      totalEstoque: 12500,
      giroMedio: 4200,
      coberturaMeses: 3.0,
      performance: 'media',
      score: 78,
      valorEstoque: 1860000,
      embalagem: 12,
      quantidadeGiro: 4200,
      quantidadeEstoque: 12500
    },
    {
      id: '4',
      familia: 'Papel Higiênico Neve Folha Dupla',
      categoria: 'Higiene',
      fornecedor: 'Kimberly-Clark',
      cd: 'CD São Paulo',
      totalEstoque: 65000,
      giroMedio: 22000,
      coberturaMeses: 2.9,
      performance: 'alta',
      score: 85,
      valorEstoque: 4680000,
      embalagem: 48,
      quantidadeGiro: 22000,
      quantidadeEstoque: 65000
    },
    {
      id: '5',
      familia: 'Shampoo Pantene Hidro-Cauterização',
      categoria: 'Cabelos',
      fornecedor: 'Procter & Gamble',
      cd: 'CD Belo Horizonte',
      totalEstoque: 18700,
      giroMedio: 6200,
      coberturaMeses: 3.0,
      performance: 'media',
      score: 82,
      valorEstoque: 2480000,
      embalagem: 24,
      quantidadeGiro: 6200,
      quantidadeEstoque: 18700
    },
    {
      id: '6',
      familia: 'Vodka Smirnoff Red Label 998ml',
      categoria: 'Bebidas Alcoólicas',
      fornecedor: 'Diageo',
      cd: 'CD São Paulo',
      totalEstoque: 8900,
      giroMedio: 2900,
      coberturaMeses: 3.1,
      performance: 'baixa',
      score: 68,
      valorEstoque: 5670000,
      embalagem: 12,
      quantidadeGiro: 2900,
      quantidadeEstoque: 8900
    },
    {
      id: '7',
      familia: 'Bolacha Club Social Original',
      categoria: 'Biscoitos',
      fornecedor: 'Mondelez',
      cd: 'CD Rio de Janeiro',
      totalEstoque: 33600,
      giroMedio: 11200,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 90,
      valorEstoque: 3840000,
      embalagem: 36,
      quantidadeGiro: 11200,
      quantidadeEstoque: 33600
    },
    {
      id: '8',
      familia: 'Lenço Kleenex Ultra Soft',
      categoria: 'Higiene',
      fornecedor: 'Kimberly-Clark',
      cd: 'CD Belo Horizonte',
      totalEstoque: 24800,
      giroMedio: 8000,
      coberturaMeses: 3.1,
      performance: 'media',
      score: 75,
      valorEstoque: 2400000,
      embalagem: 60,
      quantidadeGiro: 8000,
      quantidadeEstoque: 24800
    }
  ];

  // Calcula dados com pedidos de compra
  const { data: dadosComPedidos, metricas } = calculateStockWithOrders(
    estoqueData,
    mockPurchaseOrders,
    filtroCD,
    filtroFornecedor
  );

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
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Gestão de Estoque</h1>
          <p className="text-muted-foreground">Controle de estoque por família de produtos</p>
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
          title="Valor Estoque Atual"
          value={`R$ ${(metricas.totalValorEstoque / 1000000).toFixed(0)}M`}
          subtitle="Valor investido"
          icon={Package}
          status="success"
        />
        <MetricCard
          title="Pedidos Abertos"
          value={`R$ ${(metricas.totalValorPedidos / 1000000).toFixed(0)}M`}
          subtitle="Valor em pedidos"
          icon={ShoppingCart}
          status="warning"
        />
        <MetricCard
          title="Estoque Projetado"
          value={`R$ ${(metricas.totalValorProjetado / 1000000).toFixed(0)}M`}
          subtitle="Estoque + Pedidos"
          icon={Package}
          status="success"
        />
        <MetricCard
          title="Cobertura Atual"
          value={`${metricas.mediaCobertura.toFixed(1)} meses`}
          subtitle="Tempo de cobertura"
          icon={Package}
          status={metricas.mediaCobertura > 3.5 ? "danger" : metricas.mediaCobertura > 2.5 ? "warning" : "success"}
        />
        <MetricCard
          title="Cobertura Projetada"
          value={`${metricas.mediaCoberturaProjetada.toFixed(1)} meses`}
          subtitle="Com pedidos abertos"
          icon={TrendingUp}
          status={metricas.mediaCoberturaProjetada > 3.5 ? "danger" : metricas.mediaCoberturaProjetada > 2.5 ? "warning" : "success"}
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
                  {getUniqueValues(estoqueData, 'fornecedor').map(fornecedor => (
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

      {/* Tabela de Estoque */}
      <div className="glass-card rounded-lg">
        <div className="p-4 lg:p-6 border-b border-border/50">
          <h3 className="text-lg font-semibold text-foreground">Estoque por Família</h3>
          <p className="text-sm text-muted-foreground">Análise detalhada por família de produtos e CD</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="min-w-[200px]">Família</TableHead>
                <TableHead className="text-right min-w-[100px]">Estoque Atual</TableHead>
                <TableHead className="text-right min-w-[120px]">Pedidos Abertos</TableHead>
                <TableHead className="text-right min-w-[120px]">Estoque Projetado</TableHead>
                <TableHead className="text-right min-w-[100px]">Cobertura Atual</TableHead>
                <TableHead className="text-right min-w-[120px]">Cobertura Projetada</TableHead>
                <TableHead className="text-right min-w-[120px]">Valor Atual</TableHead>
                <TableHead className="text-right min-w-[120px]">Valor Pedidos</TableHead>
                <TableHead className="min-w-[100px]">Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosComPedidos.map((item) => (
                <TableRow key={`${item.familia}-${item.fornecedor}`} className="border-border/50 hover:bg-muted/30">
                  <TableCell>
                    <div className="font-medium text-foreground truncate max-w-[180px]">{item.familia}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[180px]">{item.fornecedor}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {Math.round(item.estoqueAtual).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.pedidosAbertos > 0 ? (
                      <span className="text-warning">{Math.round(item.pedidosAbertos).toLocaleString('pt-BR')}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <span className="text-success">{Math.round(item.estoqueProjetado).toLocaleString('pt-BR')}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={item.coberturaAtual > 3.5 ? 'text-danger' : item.coberturaAtual > 2.5 ? 'text-warning' : 'text-success'}>
                      {item.coberturaAtual.toFixed(1)}m
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={item.coberturaProjetada > 3.5 ? 'text-danger' : item.coberturaProjetada > 2.5 ? 'text-warning' : 'text-success'}>
                      {item.coberturaProjetada.toFixed(1)}m
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {(item.valorEstoqueAtual / 1000).toLocaleString('pt-BR')}k
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.valorPedidosAbertos > 0 ? (
                      <span className="text-warning">R$ {(item.valorPedidosAbertos / 1000).toLocaleString('pt-BR')}k</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getPerformanceBadge(item.performance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};