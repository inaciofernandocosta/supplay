import { MetricCard } from "../MetricCard";
import { BudgetGauge } from "../BudgetGauge";
import { StatusBadge } from "../StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Target, 
  ShoppingCart, 
  Package, 
  Clock,
  AlertTriangle,
  Unlock
} from "lucide-react";

export const DashboardComprador = () => {
  // Mock data for current buyer (João Duarte)
  const comprador = {
    nome: "João Duarte",
    utilizado: 4550000,
    meta: 5000000,
    status: 'warning' as const // 91% - Near limit
  };

  const entradasRecentes = [
    {
      id: 1,
      data: "2024-01-15",
      fornecedor: "Fornecedor ABC Ltda",
      produto: "Arroz Branco 5kg", 
      valor: 125000,
      status: "Faturado"
    },
    {
      id: 2,
      data: "2024-01-14", 
      fornecedor: "Distribuidora XYZ",
      produto: "Feijão Preto 1kg",
      valor: 89000,
      status: "Pendente"
    },
    {
      id: 3,
      data: "2024-01-12",
      fornecedor: "Alimentos Premium",
      produto: "Óleo de Soja 900ml", 
      valor: 67000,
      status: "Faturado"
    },
  ];

  const produtosEstoque = [
    {
      produto: "Arroz Branco 5kg",
      estoqueAtual: 450000,
      giroMedio: 150000,
      cobertura: 3.0,
      score: 85,
      status: 'success' as const
    },
    {
      produto: "Açúcar Cristal 1kg", 
      estoqueAtual: 280000,
      giroMedio: 45000,
      cobertura: 6.2,
      score: 65,
      status: 'warning' as const
    },
    {
      produto: "Café Torrado 500g",
      estoqueAtual: 180000, 
      giroMedio: 12000,
      cobertura: 15.0,
      score: 25,
      status: 'danger' as const
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const percentage = (comprador.utilizado / comprador.meta) * 100;

  return (
    <div className="space-y-6">
      {/* Header with Alert */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meu Orçamento</h1>
            <p className="text-muted-foreground">Controle individual - {comprador.nome}</p>
          </div>
          
          {percentage >= 100 && (
            <Button className="bg-gradient-danger hover:bg-danger/90">
              <Unlock className="h-4 w-4 mr-2" />
              Solicitar Liberação
            </Button>
          )}
        </div>

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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Orçamento Utilizado"
          value={formatCurrency(comprador.utilizado)}
          subtitle={`${percentage.toFixed(1)}% do total`}
          icon={Target}
          status={percentage >= 100 ? 'danger' : percentage >= 80 ? 'warning' : 'success'}
        />
        
        <MetricCard
          title="Disponível"
          value={formatCurrency(Math.max(comprador.meta - comprador.utilizado, 0))}
          subtitle="Saldo restante"
          icon={ShoppingCart}
          status="success"
        />
        
        <MetricCard
          title="Entradas no Mês"
          value="R$ 281K"
          subtitle="23 entradas"
          icon={Package}
          status="success"
        />
        
        <MetricCard
          title="Tempo Médio Giro"
          value="4.2 meses"
          subtitle="Cobertura atual"
          icon={Clock}
          status="warning"
        />
      </div>

      {/* Budget Gauge and Recent Entries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BudgetGauge
            current={comprador.utilizado}
            total={comprador.meta}
            label="Meu Orçamento"
          />
        </div>
        
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Entradas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Data</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entradasRecentes.map((entrada) => (
                    <TableRow key={entrada.id} className="border-border/50">
                      <TableCell className="font-medium">
                        {new Date(entrada.data).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{entrada.fornecedor}</TableCell>
                      <TableCell>{entrada.produto}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(entrada.valor)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge 
                          status={entrada.status === 'Faturado' ? 'success' : 'warning'}
                          label={entrada.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Products Performance */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Performance dos Meus Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Estoque Atual</TableHead>
                <TableHead className="text-right">Giro Médio</TableHead>
                <TableHead className="text-right">Cobertura</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {produtosEstoque.map((produto, index) => (
                <TableRow key={index} className="border-border/50">
                  <TableCell className="font-medium">{produto.produto}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(produto.estoqueAtual)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(produto.giroMedio)}/mês
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={
                      produto.cobertura > 6 ? 'text-danger' : 
                      produto.cobertura > 3 ? 'text-warning' : 'text-success'
                    }>
                      {produto.cobertura.toFixed(1)} meses
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${
                      produto.score >= 80 ? 'text-success' :
                      produto.score >= 60 ? 'text-warning' : 'text-danger'
                    }`}>
                      {produto.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={produto.status}
                      label={
                        produto.status === 'success' ? 'Saudável' :
                        produto.status === 'warning' ? 'Atenção' : 'Detrator'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};