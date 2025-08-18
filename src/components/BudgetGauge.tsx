import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface BudgetGaugeProps {
  current: number;
  total: number;
  label: string;
  className?: string;
}

export const BudgetGauge = ({ current, total, label, className }: BudgetGaugeProps) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  const getStatus = () => {
    if (percentage >= 100) return 'danger';
    if (percentage >= 80) return 'warning';
    return 'success';
  };

  const status = getStatus();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{label}</h3>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          status === 'success' && "bg-success/10 text-success",
          status === 'warning' && "bg-warning/10 text-warning", 
          status === 'danger' && "bg-danger/10 text-danger"
        )}>
          {percentage >= 100 ? 'BLOQUEADO' : percentage >= 80 ? 'ATENÇÃO' : 'NORMAL'}
        </div>
      </div>
      
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Utilizado</span>
          <span className="font-medium">{formatCurrency(current)}</span>
        </div>
        
        <Progress 
          value={percentage} 
          className="h-2.5"
          variant={status}
        />
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Disponível</span>
          <span className="font-medium">
            {formatCurrency(Math.max(total - current, 0))}
          </span>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-2.5">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">Orçamento Total</span>
          <div className="text-right">
            <div className="text-base font-bold text-foreground">{formatCurrency(total)}</div>
            <div className={cn(
              "text-xl font-bold",
              status === 'success' && "text-success",
              status === 'warning' && "text-warning",
              status === 'danger' && "text-danger"
            )}>
              {percentage.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};