import { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { DashboardGeral } from "@/components/views/DashboardGeral";
import { DashboardComprador } from "@/components/views/DashboardComprador";
import { PerformanceView } from "@/components/views/PerformanceView";
import { LiberacoesView } from "@/components/views/LiberacoesView";
import { MetasView } from "@/components/views/MetasView";
import { AgenteView } from "@/components/views/AgenteView";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const TorreControle = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardGeral />;
      case 'comprador':
        return <DashboardComprador />;
      case 'performance':
        return <PerformanceView />;
      case 'liberacoes':
        return <LiberacoesView />;
      case 'metas':
        return <MetasView />;
      case 'agente':
        return <AgenteView />;
      default:
        return <DashboardGeral />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Fixed */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Navigation 
                  activeView={activeView} 
                  onViewChange={(view) => {
                    setActiveView(view);
                    setSidebarOpen(false);
                  }} 
                />
              </SheetContent>
            </Sheet>
            <Building2 className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Torre de Controle</h1>
              <p className="text-xs text-muted-foreground">Grupo Vila Nova</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar Navigation - Fixed */}
        <div className="hidden lg:block w-64 fixed left-0 top-0 h-screen border-r border-border/50 bg-background z-40">
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="h-6 w-6 text-primary" />
                <div>
                  <h1 className="text-lg font-bold text-foreground">Torre de Controle</h1>
                  <p className="text-xs text-muted-foreground">Grupo Vila Nova</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
          <Navigation activeView={activeView} onViewChange={setActiveView} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 lg:ml-64">
          <main className="p-4 lg:p-6 pt-20 lg:pt-6">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TorreControle;