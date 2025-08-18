import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PerformanceItem {
  id: string;
  nome: string;
  tipo: 'produto' | 'fornecedor';
  estoqueAtual: number;
  giroMedio: number;
  coberturaMeses: number;
  score: number;
  status: 'success' | 'warning' | 'danger';
  comprador: string;
}

interface PerformanceTableProps {
  items: PerformanceItem[];
  className?: string;
}

export const PerformanceTable = ({ items, className }: PerformanceTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getTrendIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4 text-success" />;
    if (score >= 60) return <Minus className="h-4 w-4 text-warning" />;
    return <TrendingDown className="h-4 w-4 text-danger" />;
  };

  return (
    <div className={`glass-card rounded-lg ${className}`}>
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Performance de Giro</h3>
        <p className="text-sm text-muted-foreground">Análise de estoque e cobertura por produto/fornecedor</p>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-border/50">
            <TableHead>Item</TableHead>
            <TableHead className="text-right">Estoque</TableHead>
            <TableHead className="text-right">Giro Médio</TableHead>
            <TableHead className="text-right">Cobertura</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Comprador</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-border/50 hover:bg-muted/30">
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">{item.nome}</div>
                  <Badge variant="outline" className="text-xs">
                    {item.tipo === 'produto' ? 'Produto' : 'Fornecedor'}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(item.estoqueAtual)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.giroMedio)}/mês
              </TableCell>
              <TableCell className="text-right">
                <span className={item.coberturaMeses > 6 ? 'text-danger' : item.coberturaMeses > 3 ? 'text-warning' : 'text-success'}>
                  {item.coberturaMeses.toFixed(1)} meses
                </span>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  {getTrendIcon(item.score)}
                  <span className={`font-bold ${getScoreColor(item.score)}`}>
                    {item.score}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge 
                  status={item.status} 
                  label={
                    item.status === 'success' ? 'Saudável' :
                    item.status === 'warning' ? 'Atenção' : 'Detrator'
                  }
                />
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-muted-foreground">
                  {item.comprador}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};