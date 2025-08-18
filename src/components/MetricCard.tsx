import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease';
  };
  icon?: LucideIcon;
  status?: 'success' | 'warning' | 'danger';
  className?: string;
}

export const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  change, 
  icon: Icon,
  status = 'success',
  className 
}: MetricCardProps) => {
  const getStatusColors = () => {
    switch (status) {
      case 'success': return 'border-success/20 bg-gradient-success/5';
      case 'warning': return 'border-warning/20 bg-gradient-warning/5';
      case 'danger': return 'border-danger/20 bg-gradient-danger/5';
      default: return 'border-border';
    }
  };

  return (
    <div className={cn(
      "relative p-6 rounded-lg border bg-card shadow-card transition-corporate hover-lift",
      getStatusColors(),
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        
        {Icon && (
          <div className={cn(
            "p-3 rounded-lg",
            status === 'success' && "bg-success/10 text-success",
            status === 'warning' && "bg-warning/10 text-warning",
            status === 'danger' && "bg-danger/10 text-danger"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      
      {change && (
        <div className="mt-4 flex items-center space-x-1">
          {change.type === 'increase' ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-danger" />
          )}
          <span className={cn(
            "text-sm font-medium",
            change.type === 'increase' ? "text-success" : "text-danger"
          )}>
            {change.value}
          </span>
          <span className="text-sm text-muted-foreground">vs mês anterior</span>
        </div>
      )}
    </div>
  );
};