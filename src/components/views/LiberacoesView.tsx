import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "../StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  Check,
  X
} from "lucide-react";

import { formatValue } from "@/lib/formatters";

interface Solicitacao {
  id: number;
  comprador: string;
  datasolicitacao: string;
  valorsolicitado: number;
  motivo: string;
  utilizacaoatual: number;
  metalimite: number;
  status: 'pendente' | 'aprovado' | 'negado';
  justificativa: string;
}

export const LiberacoesView = () => {
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'pendente' | 'aprovado' | 'rejeitado'>('todos');
  const [searchTerm, setSearchTerm] = useState("");
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>([
    {
      id: 1,
      comprador: "João Duarte",
      datasolicitacao: "2024-01-15 14:30",
      valorsolicitado: 250000,
      motivo: "Oportunidade de compra - Desconto 15% fornecedor ABC",
      utilizacaoatual: 4550000,
      metalimite: 5000000,
      status: 'pendente' as const,
      justificativa: "Promoção especial com prazo limitado até 17/01"
    },
    {
      id: 2,
      comprador: "Pedro Santos",
      datasolicitacao: "2024-01-15 09:15",
      valorsolicitado: 180000,
      motivo: "Reposição urgente - Estoque crítico",
      utilizacaoatual: 6000000,
      metalimite: 6000000,
      status: 'pendente' as const,
      justificativa: "Produto em falta há 3 dias, afetando vendas"
    },
    {
      id: 3,
      comprador: "Carlos Lima",
      datasolicitacao: "2024-01-14 16:45",
      valorsolicitado: 120000,
      motivo: "Ajuste de mix de produtos",
      utilizacaoatual: 4800000,
      metalimite: 5500000,
      status: 'aprovado' as const,
      justificativa: "Aprovado automaticamente - Vendas liberaram orçamento"
    }
  ]);

  const formatCurrency = formatValue;

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAprovar = (id: number) => {
    setSolicitacoes(prev => prev.map(sol => 
      sol.id === id ? { ...sol, status: 'aprovado' as const } : sol
    ));
  };

  const handleNegar = (id: number) => {
    setSolicitacoes(prev => prev.map(sol => 
      sol.id === id ? { ...sol, status: 'negado' as const } : sol
    ));
  };

  const solicitacoesPendentes = solicitacoes.filter(s => s.status === 'pendente');
  const totalValorPendente = solicitacoesPendentes.reduce((acc, sol) => acc + sol.valorsolicitado, 0);

  return (
    <div className="space-y-6">
      {/* Header - Fixed */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/20 pb-4 mb-6 -mt-6">
        <div className="space-y-2 pt-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Liberações de Orçamento</h1>
          <p className="text-sm lg:text-base text-muted-foreground">Aprovação de solicitações - Diretor Comercial</p>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <Card className="glass-card border-warning/20 bg-gradient-warning/5">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">{solicitacoesPendentes.length}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Aguardando Aprovação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/20 bg-gradient-primary/5">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg lg:text-2xl font-bold text-foreground">{formatCurrency(totalValorPendente)}</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Valor Total Pendente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-success/20 bg-gradient-success/5">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground">12</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Aprovadas (Este Mês)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Requests */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Solicitações Pendentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {solicitacoesPendentes.map((solicitacao) => (
              <div 
                key={solicitacao.id} 
                className="p-4 lg:p-6 rounded-lg border border-border/50 bg-card hover:bg-muted/30 transition-corporate space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{solicitacao.comprador}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDateTime(solicitacao.datasolicitacao)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Valor Solicitado</p>
                        <p className="text-lg lg:text-xl font-bold text-primary">{formatCurrency(solicitacao.valorsolicitado)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Utilização Atual</p>
                        <p className="text-base lg:text-lg font-medium text-foreground">
                          {formatCurrency(solicitacao.utilizacaoatual)} 
                          <span className="text-sm text-muted-foreground ml-1">
                            / {formatCurrency(solicitacao.metalimite)}
                          </span>
                        </p>
                        <p className="text-sm text-warning">
                          {((solicitacao.utilizacaoatual / solicitacao.metalimite) * 100).toFixed(1)}% utilizado
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Motivo</p>
                      <p className="text-sm text-muted-foreground">{solicitacao.motivo}</p>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Justificativa</p>
                        <p className="text-sm text-muted-foreground">{solicitacao.justificativa}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto">
                    <Button 
                      onClick={() => handleAprovar(solicitacao.id)}
                      className="bg-gradient-success hover:bg-success/90 gap-2 flex-1 lg:flex-none"
                    >
                      <Check className="h-4 w-4" />
                      Aprovar
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleNegar(solicitacao.id)}
                      className="border-danger/20 text-danger hover:bg-danger/10 gap-2 flex-1 lg:flex-none"
                    >
                      <X className="h-4 w-4" />
                      Negar
                    </Button>
                  </div>
                </div>
              </div>
          ))}
        </CardContent>
      </Card>

      {/* Histórico Recente */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Histórico de Liberações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-[calc(100vh-300px)] relative">
            <Table>
              <TableHeader style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: 'hsl(var(--background))' }}>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Data</TableHead>
                  <TableHead className="min-w-[120px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Comprador</TableHead>
                  <TableHead className="text-right min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Valor</TableHead>
                  <TableHead className="min-w-[200px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Motivo</TableHead>
                  <TableHead className="min-w-[100px] font-semibold" style={{ backgroundColor: 'hsl(var(--background))' }}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitacoes.filter(s => s.status !== 'pendente').map((solicitacao) => (
                  <TableRow key={solicitacao.id} className="border-border/50">
                    <TableCell className="font-medium">
                      {formatDateTime(solicitacao.datasolicitacao)}
                    </TableCell>
                    <TableCell>{solicitacao.comprador}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(solicitacao.valorsolicitado)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[180px]">
                      {solicitacao.motivo}
                    </TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={solicitacao.status === 'aprovado' ? 'success' : 'danger'}
                        label={solicitacao.status === 'aprovado' ? 'Aprovado' : 'Negado'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};