import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger';
  label: string;
  className?: string;
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      status === 'success' && "status-success",
      status === 'warning' && "status-warning",
      status === 'danger' && "status-danger",
      className
    )}>
      <div className={cn(
        "w-2 h-2 rounded-full mr-2",
        status === 'success' && "bg-white/80",
        status === 'warning' && "bg-warning-foreground/80",
        status === 'danger' && "bg-white/80"
      )} />
      {label}
    </div>
  );
};