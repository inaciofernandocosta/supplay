import { MetricCard } from "../MetricCard";
import { BudgetGauge } from "../BudgetGauge";
import { StatusBadge } from "../StatusBadge";
import { PerformanceTable } from "../PerformanceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const DashboardGeral = () => {
  // Mock data for demonstration
  const compradores = [
    { nome: "João Duarte", utilizado: 4550000, meta: 5000000, status: 'warning' as const },
    { nome: "Maria Silva", utilizado: 3200000, meta: 4000000, status: 'success' as const },
    { nome: "Pedro Santos", utilizado: 6000000, meta: 6000000, status: 'danger' as const },
    { nome: "Ana Costa", utilizado: 2100000, meta: 3500000, status: 'success' as const },
    { nome: "Carlos Lima", utilizado: 4800000, meta: 5500000, status: 'warning' as const },
  ];

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
  ];

  const totalUtilizado = compradores.reduce((acc, comp) => acc + comp.utilizado, 0);
  const totalMeta = 205000000; // R$ 205 milhões

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard Executivo</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Visão completa do controle orçamentário - Grupo Vila Nova</p>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard
          title="Orçamento Total Utilizado"
          value="R$ 20,65M"
          subtitle={`${((totalUtilizado / totalMeta) * 100).toFixed(1)}% do total`}
          icon={DollarSign}
          status="success"
          change={{ value: "+12.5%", type: "increase" }}
        />
        
        <MetricCard
          title="Compradores Ativos"
          value="5"
          subtitle="2 em atenção, 1 bloqueado"
          icon={Users}
          status="warning"
        />
        
        <MetricCard
          title="Entradas do Mês"
          value="R$ 3,2M"
          subtitle="156 entradas processadas"
          icon={ShoppingCart}
          status="success"
          change={{ value: "+8.2%", type: "increase" }}
        />
        
        <MetricCard
          title="Performance Geral"
          value="82"
          subtitle="Score médio de giro"
          icon={TrendingUp}
          status="success"
          change={{ value: "+5 pontos", type: "increase" }}
        />
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1">
          <BudgetGauge
            current={totalUtilizado}
            total={totalMeta}
            label="Orçamento Consolidado"
          />
        </div>
        
        <div className="xl:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Status dos Compradores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {compradores.map((comprador, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-corporate gap-3 sm:gap-0">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">{comprador.nome}</h4>
                    <p className="text-sm text-muted-foreground">
                      R$ {(comprador.utilizado / 1000000).toFixed(1)}M de R$ {(comprador.meta / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        {((comprador.utilizado / comprador.meta) * 100).toFixed(1)}%
                      </div>
                    </div>
                    <StatusBadge 
                      status={comprador.status}
                      label={
                        comprador.status === 'success' ? 'Normal' :
                        comprador.status === 'warning' ? 'Atenção' : 'Bloqueado'
                      }
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Table */}
      <PerformanceTable items={performanceItems} />
    </div>
  );
};