import { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { DashboardGeral } from "@/components/views/DashboardGeral";
import { DashboardComprador } from "@/components/views/DashboardComprador";
import { PerformanceView } from "@/components/views/PerformanceView";
import { LiberacoesView } from "@/components/views/LiberacoesView";
import { AgenteView } from "@/components/views/AgenteView";

const TorreControle = () => {
  const [activeView, setActiveView] = useState('dashboard');

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
      case 'agente':
        return <AgenteView />;
      default:
        return <DashboardGeral />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 min-h-screen border-r border-border/50">
          <Navigation activeView={activeView} onViewChange={setActiveView} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="p-6">
            {renderView()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TorreControle;