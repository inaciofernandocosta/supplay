
import { MetricCard } from "../MetricCard";
import { BudgetGauge } from "../BudgetGauge";
import { StatusBadge } from "../StatusBadge";
import { PerformanceTable } from "../PerformanceTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatValue } from "@/lib/formatters";
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
    // CD 1 - Vila Nova
    {
      id: '1',
      nome: '1 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 2800000,
      giroMedio: 2900000,
      coberturaMeses: 0.9,
      score: 92,
      status: 'success' as const,
      comprador: 'João Batata',
      fatMes: 3200000
    },
    {
      id: '2',
      nome: '1 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1800000,
      giroMedio: 1750000,
      coberturaMeses: 1.0,
      score: 88,
      status: 'success' as const,
      comprador: 'Daniel',
      fatMes: 1950000
    },
    {
      id: '3',
      nome: '1 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1200000,
      giroMedio: 1300000,
      coberturaMeses: 0.9,
      score: 90,
      status: 'success' as const,
      comprador: 'Tatiane',
      fatMes: 1450000
    },

    // CD 11 - Vila Nova
    {
      id: '4', 
      nome: '11 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1200000,
      giroMedio: 1250000,
      coberturaMeses: 0.8,
      score: 88,
      status: 'success' as const,
      comprador: 'Paulo',
      fatMes: 1400000
    },
    {
      id: '5',
      nome: '11 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 950000,
      giroMedio: 1100000,
      coberturaMeses: 0.9,
      score: 85,
      status: 'success' as const,
      comprador: 'Carlos',
      fatMes: 1200000
    },
    {
      id: '6',
      nome: '11 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 800000,
      giroMedio: 850000,
      coberturaMeses: 0.9,
      score: 87,
      status: 'success' as const,
      comprador: 'Vinicius Vila',
      fatMes: 950000
    },

    // CD 12 - Vila Nova
    {
      id: '7',
      nome: '12 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1850000,
      giroMedio: 1900000,
      coberturaMeses: 1.0,
      score: 85,
      status: 'success' as const,
      comprador: 'Danilo',
      fatMes: 2100000
    },
    {
      id: '8',
      nome: '12 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1200000,
      giroMedio: 1150000,
      coberturaMeses: 1.0,
      score: 83,
      status: 'success' as const,
      comprador: 'Alexandre',
      fatMes: 1300000
    },
    {
      id: '9',
      nome: '12 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 980000,
      giroMedio: 1050000,
      coberturaMeses: 0.9,
      score: 86,
      status: 'success' as const,
      comprador: 'Rômulo',
      fatMes: 1150000
    },

    // CD 14 - Vila Nova
    {
      id: '10',
      nome: '14 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 3200000,
      giroMedio: 2400000,
      coberturaMeses: 1.3,
      score: 78,
      status: 'warning' as const,
      comprador: 'Carolina',
      fatMes: 2850000
    },
    {
      id: '11',
      nome: '14 - Vila Nova',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1600000,
      giroMedio: 1400000,
      coberturaMeses: 1.1,
      score: 82,
      status: 'success' as const,
      comprador: 'João Duarte',
      fatMes: 1750000
    },

    // CD 502 - Focomix MG
    {
      id: '12',
      nome: '502 - Focomix MG',
      tipo: 'fornecedor' as const,
      estoqueAtual: 2100000,
      giroMedio: 1950000,
      coberturaMeses: 1.1,
      score: 82,
      status: 'success' as const,
      comprador: 'Vinicius Focomix',
      fatMes: 2250000
    },
    {
      id: '13',
      nome: '502 - Focomix MG',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1300000,
      giroMedio: 1200000,
      coberturaMeses: 1.1,
      score: 80,
      status: 'success' as const,
      comprador: 'João Batata',
      fatMes: 1400000
    },
    {
      id: '14',
      nome: '502 - Focomix MG',
      tipo: 'fornecedor' as const,
      estoqueAtual: 900000,
      giroMedio: 850000,
      coberturaMeses: 1.1,
      score: 79,
      status: 'warning' as const,
      comprador: 'Daniel',
      fatMes: 950000
    },

    // CD 501 - Focomix SP
    {
      id: '15',
      nome: '501 - Focomix SP',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1650000,
      giroMedio: 1600000,
      coberturaMeses: 1.0,
      score: 86,
      status: 'success' as const,
      comprador: 'Paulo',
      fatMes: 1750000
    },
    {
      id: '16',
      nome: '501 - Focomix SP',
      tipo: 'fornecedor' as const,
      estoqueAtual: 1100000,
      giroMedio: 1050000,
      coberturaMeses: 1.0,
      score: 84,
      status: 'success' as const,
      comprador: 'Carlos',
      fatMes: 1200000
    },
    {
      id: '17',
      nome: '501 - Focomix SP',
      tipo: 'fornecedor' as const,
      estoqueAtual: 800000,
      giroMedio: 780000,
      coberturaMeses: 1.0,
      score: 83,
      status: 'success' as const,
      comprador: 'Tatiane',
      fatMes: 850000
    },

    // CD 804 - V2 Farma
    {
      id: '18',
      nome: '804 - V2 Farma',
      tipo: 'fornecedor' as const,
      estoqueAtual: 980000,
      giroMedio: 1100000,
      coberturaMeses: 0.9,
      score: 90,
      status: 'success' as const,
      comprador: 'Vinicius Vila',
      fatMes: 1200000
    },
    {
      id: '19',
      nome: '804 - V2 Farma',
      tipo: 'fornecedor' as const,
      estoqueAtual: 650000,
      giroMedio: 700000,
      coberturaMeses: 0.9,
      score: 88,
      status: 'success' as const,
      comprador: 'Danilo',
      fatMes: 780000
    },
    {
      id: '20',
      nome: '804 - V2 Farma',
      tipo: 'fornecedor' as const,
      estoqueAtual: 450000,
      giroMedio: 500000,
      coberturaMeses: 0.9,
      score: 87,
      status: 'success' as const,
      comprador: 'Alexandre',
      fatMes: 550000
    }
  ];

  const totalUtilizado = compradores.reduce((acc, comp) => acc + comp.utilizado, 0);
  const totalMeta = 205000000; // R$ 205 milhões

  return (
    <div className="space-y-6">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/20 pb-4 mb-6 -mt-6">
        <div className="space-y-2 pt-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard Executivo</h1>
          <p className="text-sm lg:text-base text-muted-foreground">Visão completa do controle orçamentário - Grupo Vila Nova</p>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard
          title="Orçamento Total"
          value={`${(totalMeta / 1000000).toFixed(0)}M`}
          subtitle="Limite aprovado para agosto"
          icon={DollarSign}
          status="success"
        />
        
        <MetricCard
          title="Valor Utilizado"
          value={`${(totalUtilizado / 1000000).toFixed(1)}M`}
          subtitle={`${((totalUtilizado / totalMeta) * 100).toFixed(1)}% consumido`}
          icon={DollarSign}
          status={((totalUtilizado / totalMeta) * 100) >= 90 ? 'danger' : ((totalUtilizado / totalMeta) * 100) >= 80 ? 'warning' : 'success'}
        />
        
        <MetricCard
          title="Saldo Disponível"
          value={`${((totalMeta - totalUtilizado) / 1000000).toFixed(1)}M`}
          subtitle={`${(100 - (totalUtilizado / totalMeta) * 100).toFixed(1)}% restante`}
          icon={DollarSign}
          status={((totalUtilizado / totalMeta) * 100) >= 90 ? 'danger' : ((totalUtilizado / totalMeta) * 100) >= 80 ? 'warning' : 'success'}
        />

        <MetricCard
          title="Compradores Ativos"
          value="12"
          subtitle="9 em atenção, 1 bloqueado"
          icon={Users}
          status="warning"
        />
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
                    {(comprador.utilizado / 1000000).toFixed(1)}M de {(comprador.meta / 1000000).toFixed(1)}M
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
