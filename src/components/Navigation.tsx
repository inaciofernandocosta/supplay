import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  MessageCircle,
  Settings
} from "lucide-react";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Geral', icon: BarChart3 },
    { id: 'comprador', label: 'Meu Orçamento', icon: Target },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'liberacoes', label: 'Liberações', icon: CheckCircle2 },
    { id: 'agente', label: 'Agente IA', icon: MessageCircle },
  ];

  return (
    <nav className="glass-elevated p-6 space-y-2">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Torre de Controle
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Grupo Vila Nova</p>
      </div>

      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-corporate",
                activeView === item.id && "bg-gradient-primary text-primary-foreground shadow-glow"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </div>

      <div className="pt-4 mt-8 border-t border-border/50">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <Settings className="h-4 w-4 mr-3" />
          Configurações
        </Button>
      </div>
    </nav>
  );
};