import { PerformanceTable } from "../PerformanceTable";
import { MetricCard } from "../MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

export const PerformanceView = () => {
  const performanceItems = [
    {
      id: '1',
      nome: 'Fornecedor ABC Ltda',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1200000,
      giroMedio: 80000,
      coberturaMeses: 15.0,
      score: 35,
      status: 'danger' as const,
      comprador: 'Maria Silva'
    },
    {
      id: '2',
      nome: 'Distribuidora XYZ',
      tipo: 'fornecedor' as const,
      estoqueAtual: 890000,
      giroMedio: 120000,
      coberturaMeses: 7.4,
      score: 45,
      status: 'warning' as const,
      comprador: 'Pedro Santos'
    },
    {
      id: '3',
      nome: 'Atacadista Central',
      tipo: 'fornecedor' as const,
      estoqueAtual: 650000,
      giroMedio: 95000,
      coberturaMeses: 6.8,
      score: 62,
      status: 'warning' as const,
      comprador: 'Ana Costa'
    },
    {
      id: '4',
      nome: 'Indústria Alimentícia Norte',
      tipo: 'fornecedor' as const,
      estoqueAtual: 420000,
      giroMedio: 140000,
      coberturaMeses: 3.0,
      score: 88,
      status: 'success' as const,
      comprador: 'João Duarte'
    },
    {
      id: '5',
      nome: 'Cooperativa Agrícola Sul',
      tipo: 'fornecedor' as const,
      estoqueAtual: 780000,
      giroMedio: 110000,
      coberturaMeses: 7.1,
      score: 58,
      status: 'warning' as const,
      comprador: 'Carlos Lima'
    },
    {
      id: '6',
      nome: 'Distribuidora Premium',
      tipo: 'fornecedor' as const,
      estoqueAtual: 350000,
      giroMedio: 125000,
      coberturaMeses: 2.8,
      score: 92,
      status: 'success' as const,
      comprador: 'Ana Costa'
    },
    {
      id: '7',
      nome: 'Atacado Regional Nordeste',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1500000,
      giroMedio: 75000,
      coberturaMeses: 20.0,
      score: 28,
      status: 'danger' as const,
      comprador: 'Pedro Santos'
    },
    {
      id: '8',
      nome: 'Fornecedor Express',
      tipo: 'fornecedor' as const,
      estoqueAtual: 480000,
      giroMedio: 160000,
      coberturaMeses: 3.0,
      score: 85,
      status: 'success' as const,
      comprador: 'João Duarte'
    },
  ];

  const saudaveis = performanceItems.filter(item => item.status === 'success').length;
  const atencao = performanceItems.filter(item => item.status === 'warning').length;
  const detratores = performanceItems.filter(item => item.status === 'danger').length;
  const scoremedio = Math.round(performanceItems.reduce((acc, item) => acc + item.score, 0) / performanceItems.length);

  return (
    <div className="space-y-6">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/20 pb-4 mb-6 -mt-6">
        <div className="space-y-2 pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performance de Giro</h1>
              <p className="text-sm lg:text-base text-muted-foreground">Análise de estoque e cobertura - Todos os CDs</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard
          title="Score Médio Geral"
          value={scoremedio.toString()}
          subtitle="Pontuação consolidada"
          icon={TrendingUp}
          status={scoremedio >= 70 ? 'success' : scoremedio >= 50 ? 'warning' : 'danger'}
          change={{ value: "+3 pontos", type: "increase" }}
        />
        
        <MetricCard
          title="Fornecedores Saudáveis"
          value={saudaveis.toString()}
          subtitle={`${Math.round((saudaveis/performanceItems.length)*100)}% do total`}
          icon={TrendingUp}
          status="success"
        />
        
        <MetricCard
          title="Em Atenção"
          value={atencao.toString()}
          subtitle={`${Math.round((atencao/performanceItems.length)*100)}% do total`}
          icon={AlertCircle}
          status="warning"
        />
        
        <MetricCard
          title="Detratores"
          value={detratores.toString()}
          subtitle={`${Math.round((detratores/performanceItems.length)*100)}% do total`}
          icon={TrendingDown}
          status="danger"
        />
      </div>

      {/* Filters Card */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-primary" />
            Filtros de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">CD</label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os CDs</SelectItem>
                  <SelectItem value="cd1">Vila Nova - CD1</SelectItem>
                  <SelectItem value="cd2">Vila Nova - CD2</SelectItem>
                  <SelectItem value="cd3">Focomix - CD1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Comprador</label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="joao">João Duarte</SelectItem>
                  <SelectItem value="maria">Maria Silva</SelectItem>
                  <SelectItem value="pedro">Pedro Santos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Tipo de Fornecedor</label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Tipos</SelectItem>
                  <SelectItem value="atacadista">Atacadistas</SelectItem>
                  <SelectItem value="distribuidora">Distribuidoras</SelectItem>
                  <SelectItem value="industria">Indústrias</SelectItem>
                  <SelectItem value="cooperativa">Cooperativas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Status</label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="success">Saudáveis</SelectItem>
                  <SelectItem value="warning">Atenção</SelectItem>
                  <SelectItem value="danger">Detratores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/50">
            <span className="text-sm text-muted-foreground">Filtros ativos:</span>
            <Badge variant="secondary" className="gap-1">
              Todos os CDs
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Últimos 90 dias
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <PerformanceTable items={performanceItems} />
      
      {/* Analysis Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Resumo da Análise
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-success">🟢 Fornecedores Saudáveis</h4>
              <p className="text-sm text-muted-foreground">
                {saudaveis} fornecedores com cobertura adequada e giro eficiente.
                Representam {Math.round((saudaveis/performanceItems.length)*100)}% do portfólio.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-warning">🟡 Fornecedores em Atenção</h4>
              <p className="text-sm text-muted-foreground">
                {atencao} fornecedores com cobertura elevada. 
                Necessitam de monitoramento para otimizar giro.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-danger">🔴 Fornecedores Detratores</h4>
              <p className="text-sm text-muted-foreground">
                {detratores} fornecedores com cobertura excessiva. 
                Requerem ação imediata para reduzir estoque.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};