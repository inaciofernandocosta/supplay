import { MetricCard } from "../MetricCard";
import { BudgetGauge } from "../BudgetGauge";
import { StatusBadge } from "../StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatValue } from "@/lib/formatters";
import { 
  Target, 
  ShoppingCart, 
  Package, 
  Clock,
  AlertTriangle,
  Unlock,
  FileText,
  TrendingUp,
  Calendar
} from "lucide-react";

export const DashboardComprador = () => {
  // Mock data for current buyer (João Batista) com pedidos abertos
  const comprador = {
    nome: "João Batista",
    utilizado: 16800000,
    pedidosAbertos: 1200000, // Pedidos aprovados mas não entregues
    pedidosPendentes: 800000, // Pedidos aguardando aprovação
    metaBase: 20000000,
    prazoMedio: 30, // days
    status: 'success' as const
  };

  // Company parameters
  const empresa = {
    prazoMeta: 45 // days
  };

  const formatCurrency = formatValue;

  // Calculate payment term performance (sem ajuste de meta)
  const performancePrazo = comprador.prazoMedio / empresa.prazoMeta;
  
  // Use base meta for calculations (sem correção)
  const meta = comprador.metaBase;

  // Entradas recentes - apenas do dia de ontem (entrada já processada)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const entradasRecentes = [
    {
      id: 1,
      numeroPedido: "PED-2024-0001",
      data: yesterdayStr,
      fornecedor: "Fornecedor ABC Ltda",
      valor: 125000,
      status: "Faturado"
    },
    {
      id: 2,
      numeroPedido: "PED-2024-0002",
      data: yesterdayStr,
      fornecedor: "Distribuidora XYZ",
      valor: 89000,
      status: "Faturado"
    },
    {
      id: 3,
      numeroPedido: "PED-2024-0003",
      data: yesterdayStr,
      fornecedor: "Alimentos Premium",
      valor: 67000,
      status: "Faturado"
    },
  ];

  // Pedidos em andamento - apenas pedidos que estão em entrada
  const pedidosAndamento = [
    {
      id: 1,
      numeroPedido: "PED-2024-0004",
      data: "2024-01-20",
      fornecedor: "Tio João",
      valor: 60000,
      status: "Em Entrada"
    },
    {
      id: 2,
      numeroPedido: "PED-2024-0005",
      data: "2024-01-18",
      fornecedor: "União",
      valor: 25000,
      status: "Em Entrada"
    },
    {
      id: 3,
      numeroPedido: "PED-2024-0006",
      data: "2024-01-19",
      fornecedor: "Liza",
      valor: 10500,
      status: "Em Entrada"
    },
  ];

  const produtosEstoque = [
    {
      produto: "Arroz Branco 5kg",
      estoqueAtual: 450000,
      pedidosAbertos: 60000, // Valor em reais dos pedidos abertos
      giroMedio: 150000,
      cobertura: 3.0,
      coberturaProjetada: 3.4, // Com pedidos abertos
      score: 85,
      status: 'success' as const
    },
    {
      produto: "Açúcar Cristal 1kg", 
      estoqueAtual: 280000,
      pedidosAbertos: 25000,
      giroMedio: 45000,
      cobertura: 6.2,
      coberturaProjetada: 6.8,
      score: 65,
      status: 'warning' as const
    },
    {
      produto: "Café Torrado 500g",
      estoqueAtual: 180000, 
      pedidosAbertos: 0,
      giroMedio: 12000,
      cobertura: 15.0,
      coberturaProjetada: 15.0,
      score: 25,
      status: 'danger' as const
    },
  ];

  const percentage = (comprador.utilizado / meta) * 100;
  const totalComprometido = comprador.utilizado + comprador.pedidosAbertos;
  const percentualComprometido = (totalComprometido / meta) * 100;
  const performancePrazoPercentual = performancePrazo * 100;

  return (
    <div className="space-y-6">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/20 pb-4 mb-6 -mt-6">
        <div className="space-y-2 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Meu Orçamento</h1>
              <p className="text-sm lg:text-base text-muted-foreground">Controle individual - {comprador.nome}</p>
            </div>
            
            {percentage >= 100 && (
              <Button className="bg-gradient-danger hover:bg-danger/90 w-full sm:w-auto">
                <Unlock className="h-4 w-4 mr-2" />
                Solicitar Liberação
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className="space-y-4">
        {percentage >= 80 && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <h4 className="font-medium text-warning">
                {percentage >= 100 ? 'Orçamento Bloqueado' : 'Atenção: Limite Próximo'}
              </h4>
              <p className="text-sm text-warning/80">
                {percentage >= 100 
                  ? 'Você atingiu 100% do seu orçamento. Solicite liberação para continuar.'
                  : `Você utilizou ${percentage.toFixed(1)}% do seu orçamento. Monitore suas próximas entradas.`
                }
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Metrics Row - Primeira Linha */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard
          title="Meta Mensal"
          value={formatValue(comprador.metaBase)}
          subtitle="Meta definida"
          icon={Target}
          status="success"
        />

        <MetricCard
          title="Orçamento Utilizado"
          value={formatValue(comprador.utilizado)}
          subtitle={`${percentage.toFixed(1)}% do total`}
          icon={Target}
          status={percentage >= 100 ? 'danger' : percentage >= 80 ? 'warning' : 'success'}
        />
        
        <MetricCard
          title="Pedidos Abertos"
          value={formatValue(comprador.pedidosAbertos)}
          subtitle="Aprovados e em trânsito"
          icon={FileText}
          status="warning"
        />
        
        <MetricCard
          title="Prazo Médio"
          value={`${comprador.prazoMedio} dias`}
          subtitle={`Meta: ${empresa.prazoMeta} dias`}
          icon={Clock}
          status={performancePrazoPercentual <= 100 ? 'success' : performancePrazoPercentual <= 120 ? 'warning' : 'danger'}
        />
      </div>

      {/* Metrics Row - Segunda Linha */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <MetricCard
          title="Total Comprometido"
          value={formatValue(totalComprometido)}
          subtitle={`${percentualComprometido.toFixed(1)}% da meta`}
          icon={TrendingUp}
          status={percentualComprometido >= 100 ? 'danger' : percentualComprometido >= 85 ? 'warning' : 'success'}
        />
        
        <MetricCard
          title="Disponível"
          value={formatValue(Math.max(meta - totalComprometido, 0))}
          subtitle="Saldo livre real"
          icon={ShoppingCart}
          status="success"
        />

        <MetricCard
          title="Pedidos Pendentes"
          value={formatValue(comprador.pedidosPendentes)}
          subtitle="Aguardando aprovação"
          icon={Calendar}
          status="warning"
        />
        
        <MetricCard
          title="Utilização Real"
          value={`${((comprador.utilizado + comprador.pedidosAbertos + comprador.pedidosPendentes) / meta * 100).toFixed(1)}%`}
          subtitle="Incluindo pendências"
          icon={AlertTriangle}
          status={((comprador.utilizado + comprador.pedidosAbertos + comprador.pedidosPendentes) / meta * 100) >= 100 ? 'danger' : 'warning'}
        />
      </div>
      
      {/* Pedidos em Andamento */}
      <Card className="glass-card w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Pedidos em Andamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[calc(100vh-300px)] relative">
            <Table>
              <TableHeader style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'hsl(var(--background))' }}>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Nº Pedido</TableHead>
                  <TableHead className="min-w-[80px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Data</TableHead>
                  <TableHead className="min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Fornecedor</TableHead>
                  <TableHead className="text-right min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Valor</TableHead>
                  <TableHead className="min-w-[80px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidosAndamento.map((pedido) => (
                  <TableRow key={pedido.id} className="border-border/50">
                    <TableCell className="font-medium">{pedido.numeroPedido}</TableCell>
                    <TableCell className="font-medium">
                      {new Date(pedido.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="truncate max-w-[120px]">{pedido.fornecedor}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatValue(pedido.valor)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge 
                        status="warning"
                        label={pedido.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries - Full Width */}
      <Card className="glass-card w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Entradas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[calc(100vh-300px)] relative">
            <Table>
              <TableHeader style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'hsl(var(--background))' }}>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Nº Pedido</TableHead>
                  <TableHead className="min-w-[80px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Data</TableHead>
                  <TableHead className="min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Fornecedor</TableHead>
                  <TableHead className="text-right min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Valor</TableHead>
                  <TableHead className="min-w-[80px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entradasRecentes.map((entrada) => (
                  <TableRow key={entrada.id} className="border-border/50">
                    <TableCell className="font-medium">{entrada.numeroPedido}</TableCell>
                    <TableCell className="font-medium">
                      {new Date(entrada.data).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell className="truncate max-w-[120px]">{entrada.fornecedor}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatValue(entrada.valor)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge 
                        status="success"
                        label={entrada.status}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};