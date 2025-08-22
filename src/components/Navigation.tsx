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
  Settings,
  Package,
  UserCircle,
  Calculator
} from "lucide-react";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ activeView, onViewChange }: NavigationProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Geral', icon: BarChart3 },
    { id: 'comprador', label: 'Meu Orçamento', icon: Target },
    { id: 'performance', label: 'Gestao de estoque', icon: Calculator },
    { id: 'liberacoes', label: 'Liberações', icon: CheckCircle2 },
    { id: 'metas', label: 'Gestão de Metas', icon: Users },
    { id: 'perfil', label: 'Meu Perfil', icon: UserCircle },
  ];

  return (
    <nav className="p-4 space-y-2">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-corporate text-sm",
                activeView === item.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Button>
          );
        })}
      </div>

      <div className="pt-4 mt-6 border-t border-border/50">
        <Button 
          variant={activeView === 'configuracoes' ? "default" : "ghost"} 
          className={cn(
            "w-full justify-start transition-corporate text-sm",
            activeView === 'configuracoes' 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground"
          )}
          onClick={() => onViewChange('configuracoes')}
        >
          <Settings className="h-4 w-4 mr-3 flex-shrink-0" />
          <span className="truncate">Configurações</span>
        </Button>
      </div>
    </nav>
  );
};