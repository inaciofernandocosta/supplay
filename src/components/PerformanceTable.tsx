import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatValue } from "@/lib/formatters";

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
  fatMes: number;
}

interface PerformanceTableProps {
  items: PerformanceItem[];
  className?: string;
}

export const PerformanceTable = ({ items, className }: PerformanceTableProps) => {
  const formatCurrency = formatValue;
  
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
      <div className="p-4 lg:p-6 border-b border-border/50">
        <h3 className="text-lg font-semibold text-foreground">Performance por Centro de Distribuição</h3>
        <p className="text-sm text-muted-foreground">Análise de estoque e cobertura por centro de distribuição</p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="min-w-[200px]">Item</TableHead>
              <TableHead className="text-right min-w-[120px]">Giro Médio</TableHead>
              <TableHead className="text-right min-w-[120px]">Estoque</TableHead>
              <TableHead className="text-right min-w-[120px]">Fat Mês</TableHead>
              <TableHead className="text-right min-w-[100px]">Cobertura</TableHead>
              <TableHead className="text-center min-w-[80px]">Score</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[120px]">Comprador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="border-border/50 hover:bg-muted/30">
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground truncate max-w-[180px]">{item.nome}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatValue(item.giroMedio)}
                </TableCell>
                <TableCell className="text-right">
                  {formatValue(item.estoqueAtual)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatValue(item.fatMes || 0)}
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
                  <span className="text-sm font-medium text-muted-foreground truncate max-w-[100px] block">
                    {item.comprador}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};