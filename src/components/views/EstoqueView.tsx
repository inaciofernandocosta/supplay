import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Download, Package, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatValue } from "@/lib/formatters";
import { MetricCard } from "../MetricCard";

interface EstoqueFamilia {
  id: string;
  familia: string;
  categoria: string;
  fornecedor: string;
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
      familia: 'Arroz Branco',
      categoria: 'Grãos',
      fornecedor: 'Distribuidora Alimentos Sul',
      totalEstoque: 1350000,
      giroMedio: 450000,
      coberturaMeses: 3.0,
      performance: 'media',
      score: 75,
      valorEstoque: 2700000,
      embalagem: 30,
      quantidadeGiro: 15000,
      quantidadeEstoque: 45000
    },
    {
      id: '2',
      familia: 'Feijão Carioca',
      categoria: 'Grãos',
      fornecedor: 'Fornecedor ABC Ltda',
      totalEstoque: 1080000,
      giroMedio: 380000,
      coberturaMeses: 2.8,
      performance: 'alta',
      score: 88,
      valorEstoque: 3240000,
      embalagem: 25,
      quantidadeGiro: 15200,
      quantidadeEstoque: 43200
    },
    {
      id: '3',
      familia: 'Açúcar Cristal',
      categoria: 'Açúcares',
      fornecedor: 'Central de Abastecimento Norte',
      totalEstoque: 1550000,
      giroMedio: 520000,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 92,
      valorEstoque: 1860000,
      embalagem: 50,
      quantidadeGiro: 10400,
      quantidadeEstoque: 31000
    },
    {
      id: '4',
      familia: 'Óleo de Soja',
      categoria: 'Óleos',
      fornecedor: 'Atacadão Distribuição',
      totalEstoque: 780000,
      giroMedio: 250000,
      coberturaMeses: 3.1,
      performance: 'media',
      score: 78,
      valorEstoque: 4680000,
      embalagem: 12,
      quantidadeGiro: 20833,
      quantidadeEstoque: 65000
    },
    {
      id: '5',
      familia: 'Macarrão Espaguete',
      categoria: 'Massas',
      fornecedor: 'Mega Fornecimentos',
      totalEstoque: 1240000,
      giroMedio: 420000,
      coberturaMeses: 2.9,
      performance: 'alta',
      score: 85,
      valorEstoque: 2480000,
      embalagem: 20,
      quantidadeGiro: 21000,
      quantidadeEstoque: 62000
    },
    {
      id: '6',
      familia: 'Leite em Pó',
      categoria: 'Laticínios',
      fornecedor: 'Comercial Vitória',
      totalEstoque: 630000,
      giroMedio: 210000,
      coberturaMeses: 3.0,
      performance: 'media',
      score: 82,
      valorEstoque: 5670000,
      embalagem: 18,
      quantidadeGiro: 11667,
      quantidadeEstoque: 35000
    },
    {
      id: '7',
      familia: 'Café Torrado',
      categoria: 'Bebidas',
      fornecedor: 'Distribuidora Premium',
      totalEstoque: 480000,
      giroMedio: 160000,
      coberturaMeses: 3.0,
      performance: 'alta',
      score: 90,
      valorEstoque: 3840000,
      embalagem: 24,
      quantidadeGiro: 6667,
      quantidadeEstoque: 20000
    },
    {
      id: '8',
      familia: 'Farinha de Trigo',
      categoria: 'Farinhas',
      fornecedor: 'Fornecedor Regional Ltda',
      totalEstoque: 2000000,
      giroMedio: 650000,
      coberturaMeses: 3.1,
      performance: 'baixa',
      score: 68,
      valorEstoque: 2400000,
      embalagem: 25,
      quantidadeGiro: 26000,
      quantidadeEstoque: 80000
    }
  ];

  const filteredData = estoqueData.filter(item => {
    const matchCD = filtroCD === "todos" || true; // Implementar lógica de CD quando necessário
    const matchFornecedor = filtroFornecedor === "todos" || item.fornecedor === filtroFornecedor;
    return matchCD && matchFornecedor;
  });

  const totalValorEstoque = filteredData.reduce((acc, item) => acc + item.valorEstoque, 0);
  const totalQuantidadeEstoque = filteredData.reduce((acc, item) => acc + item.totalEstoque, 0);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Valor Total do Estoque"
          value={`R$ ${(totalValorEstoque / 1000000).toFixed(0)}M`}
          subtitle="Valor investido"
          icon={Package}
          status="success"
        />
        <MetricCard
          title="Quantidade Total"
          value={`${(totalQuantidadeEstoque / 1000000).toFixed(3)}`}
          subtitle="Unidades em estoque"
          icon={Package}
          status="success"
        />
        <MetricCard
          title="Cobertura Média"
          value={`${mediaCobertura.toFixed(1)} meses`}
          subtitle="Tempo de cobertura"
          icon={Package}
          status={mediaCobertura > 3.5 ? "danger" : mediaCobertura > 2.5 ? "warning" : "success"}
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
                  <SelectItem value="1">1 - Vila Nova</SelectItem>
                  <SelectItem value="11">11 - Vila Nova</SelectItem>
                  <SelectItem value="12">12 - Vila Nova</SelectItem>
                  <SelectItem value="14">14 - Vila Nova</SelectItem>
                  <SelectItem value="502">502 - Focomix MG</SelectItem>
                  <SelectItem value="501">501 - Focomix SP</SelectItem>
                  <SelectItem value="804">804 - V2 Farma</SelectItem>
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
                  {Array.from(new Set(estoqueData.map(item => item.fornecedor))).map(fornecedor => (
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
      <div className="glass-card rounded-lg overflow-hidden">
        <div className="p-4 lg:p-6 border-b border-border/50">
          <h3 className="text-lg font-semibold text-foreground">Estoque por Família</h3>
          <p className="text-sm text-muted-foreground">Análise detalhada por família de produtos e CD</p>
        </div>
        
        <div className="relative overflow-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
          <Table>
            <TableHeader style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'hsl(var(--background))' }}>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="min-w-[200px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Família</TableHead>
                <TableHead className="text-right min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Embalagem</TableHead>
                <TableHead className="text-right min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Quantidade Giro</TableHead>
                <TableHead className="text-right min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Quantidade Estoque</TableHead>
                <TableHead className="text-right min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Giro Médio</TableHead>
                <TableHead className="text-right min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Estoque</TableHead>
                <TableHead className="text-right min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Valor Estoque</TableHead>
                <TableHead className="text-right min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Cobertura</TableHead>
                <TableHead className="min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="border-border/50 hover:bg-muted/30">
                  <TableCell>
                    <div className="font-medium text-foreground truncate max-w-[180px]">{item.familia}</div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {item.embalagem}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {Math.round(item.quantidadeGiro).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {Math.round(item.quantidadeEstoque).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {Math.round(item.giroMedio).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {Math.round(item.totalEstoque).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {Math.round(item.valorEstoque).toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={item.coberturaMeses > 3.5 ? 'text-danger' : item.coberturaMeses > 2.5 ? 'text-warning' : 'text-success'}>
                      {item.coberturaMeses.toFixed(1)} meses
                    </span>
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