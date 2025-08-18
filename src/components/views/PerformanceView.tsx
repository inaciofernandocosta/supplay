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
      nome: 'Arroz Branco 5kg',
      tipo: 'produto' as const,
      estoqueAtual: 450000,
      giroMedio: 150000,
      coberturaMeses: 3.0,
      score: 85,
      status: 'success' as const,
      comprador: 'João Duarte'
    },
    {
      id: '2',
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
      id: '3',
      nome: 'Açúcar Cristal 1kg',
      tipo: 'produto' as const,
      estoqueAtual: 280000,
      giroMedio: 45000,
      coberturaMeses: 6.2,
      score: 65,
      status: 'warning' as const,
      comprador: 'João Duarte'
    },
    {
      id: '4',
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
      id: '5',
      nome: 'Óleo de Soja 900ml',
      tipo: 'produto' as const,
      estoqueAtual: 320000,
      giroMedio: 95000,
      coberturaMeses: 3.4,
      score: 78,
      status: 'success' as const,
      comprador: 'Ana Costa'
    },
    {
      id: '6',
      nome: 'Café Torrado 500g',
      tipo: 'produto' as const,
      estoqueAtual: 180000,
      giroMedio: 12000,
      coberturaMeses: 15.0,
      score: 25,
      status: 'danger' as const,
      comprador: 'Carlos Lima'
    },
  ];

  const saudaveis = performanceItems.filter(item => item.status === 'success').length;
  const atencao = performanceItems.filter(item => item.status === 'warning').length;
  const detratores = performanceItems.filter(item => item.status === 'danger').length;
  const scoremedio = Math.round(performanceItems.reduce((acc, item) => acc + item.score, 0) / performanceItems.length);

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance de Giro</h1>
          <p className="text-muted-foreground">Análise de estoque e cobertura - Todos os CDs</p>
        </div>
        
        <div className="flex items-center gap-3">
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

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Score Médio Geral"
          value={scoremedio.toString()}
          subtitle="Pontuação consolidada"
          icon={TrendingUp}
          status={scoremedio >= 70 ? 'success' : scoremedio >= 50 ? 'warning' : 'danger'}
          change={{ value: "+3 pontos", type: "increase" }}
        />
        
        <MetricCard
          title="Produtos Saudáveis"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <label className="text-sm font-medium text-foreground">Tipo</label>
              <Select defaultValue="todos">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Produtos e Fornecedores</SelectItem>
                  <SelectItem value="produto">Apenas Produtos</SelectItem>
                  <SelectItem value="fornecedor">Apenas Fornecedores</SelectItem>
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
          
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
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
              <h4 className="font-medium text-success">🟢 Produtos Saudáveis</h4>
              <p className="text-sm text-muted-foreground">
                {saudaveis} produtos com cobertura adequada e giro eficiente.
                Representam {Math.round((saudaveis/performanceItems.length)*100)}% do portfólio.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-warning">🟡 Produtos em Atenção</h4>
              <p className="text-sm text-muted-foreground">
                {atencao} produtos com cobertura elevada. 
                Necessitam de monitoramento para otimizar giro.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-danger">🔴 Produtos Detratores</h4>
              <p className="text-sm text-muted-foreground">
                {detratores} produtos com cobertura excessiva. 
                Requerem ação imediata para reduzir estoque.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};