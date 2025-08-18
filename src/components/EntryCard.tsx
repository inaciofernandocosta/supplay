import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { formatValue } from "@/lib/formatters";

interface EntryCardProps {
  value: number;
  entriesCount: number;
  className?: string;
}

export const EntryCard = ({ value, entriesCount, className }: EntryCardProps) => {
  return (
    <Card className={`glass-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-medium text-muted-foreground">
              Entradas do Mês
            </h3>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-foreground">
                {formatValue(value)}
              </p>
              <p className="text-sm text-muted-foreground">
                {entriesCount} entradas processadas
              </p>
            </div>
          </div>
          <div className="bg-muted/50 p-3 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};