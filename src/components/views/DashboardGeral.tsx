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
  // Compradores reais com metas distribuídas (total 205M)
  const compradores = [
    { nome: "João Batata", utilizado: 16800000, meta: 20000000, status: 'success' as const },
    { nome: "João Duarte", utilizado: 16200000, meta: 18000000, status: 'warning' as const },
    { nome: "Daniel", utilizado: 17100000, meta: 19000000, status: 'warning' as const },
    { nome: "Tatiane", utilizado: 13200000, meta: 16000000, status: 'success' as const },
    { nome: "Paulo", utilizado: 16500000, meta: 18000000, status: 'warning' as const },
    { nome: "Carlos", utilizado: 15300000, meta: 17000000, status: 'warning' as const },
    { nome: "Vinicius Vila", utilizado: 12750000, meta: 15000000, status: 'success' as const },
    { nome: "Vinicius Focomix", utilizado: 13300000, meta: 14000000, status: 'danger' as const },
    { nome: "Danilo", utilizado: 14400000, meta: 16000000, status: 'warning' as const },
    { nome: "Alexandre", utilizado: 15450000, meta: 17000000, status: 'warning' as const },
    { nome: "Rômulo", utilizado: 16200000, meta: 18000000, status: 'warning' as const },
    { nome: "Carolina", utilizado: 14850000, meta: 17000000, status: 'success' as const },
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
      comprador: 'João Batata'
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
      comprador: 'Tatiane'
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
          value={`R$ ${(totalUtilizado / 1000000).toFixed(1)}M`}
          subtitle={`${((totalUtilizado / totalMeta) * 100).toFixed(1)}% do total`}
          icon={DollarSign}
          status="success"
          change={{ value: "+12.5%", type: "increase" }}
        />
        
        <MetricCard
          title="Compradores Ativos"
          value="12"
          subtitle="9 em atenção, 1 bloqueado"
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

      {/* Budget Gauge */}
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <BudgetGauge
            current={totalUtilizado}
            total={totalMeta}
            label="Orçamento Consolidado"
          />
        </div>
      </div>

      {/* Status dos Compradores */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-primary" />
            Status dos Compradores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {compradores.map((comprador, index) => (
              <div key={index} className="p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-corporate space-y-2">
                <div className="space-y-1">
                  <h4 className="font-medium text-foreground text-sm">{comprador.nome}</h4>
                  <p className="text-xs text-muted-foreground">
                    R$ {(comprador.utilizado / 1000000).toFixed(1)}M de R$ {(comprador.meta / 1000000).toFixed(1)}M
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-foreground">
                    {((comprador.utilizado / comprador.meta) * 100).toFixed(1)}%
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
          </div>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <PerformanceTable items={performanceItems} />
    </div>
  );
};