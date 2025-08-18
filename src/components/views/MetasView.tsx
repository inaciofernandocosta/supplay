import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Target, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Comprador {
  id: string;
  nome: string;
  email: string;
  metaTrimestral: number;
  percentualRealizado: number;
  percentualParticipacao: number;
  status: 'ativo' | 'inativo';
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const MetasView = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingComprador, setEditingComprador] = useState<Comprador | null>(null);
  const [compradores, setCompradores] = useState<Comprador[]>([
    {
      id: '1',
      nome: 'João Batata',
      email: 'joao.batata@grupovilanova.com',
      metaTrimestral: 60000000,
      percentualRealizado: 84.0,
      percentualParticipacao: 2.5,
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'João Duarte',
      email: 'joao.duarte@grupovilanova.com',
      metaTrimestral: 54000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 2.8,
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Daniel',
      email: 'daniel@grupovilanova.com',
      metaTrimestral: 57000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 2.6,
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Tatiane',
      email: 'tatiane@grupovilanova.com',
      metaTrimestral: 48000000,
      percentualRealizado: 82.5,
      percentualParticipacao: 2.4,
      status: 'ativo'
    },
    {
      id: '5',
      nome: 'Paulo',
      email: 'paulo@grupovilanova.com',
      metaTrimestral: 54000000,
      percentualRealizado: 91.7,
      percentualParticipacao: 2.7,
      status: 'ativo'
    },
    {
      id: '6',
      nome: 'Carlos',
      email: 'carlos@grupovilanova.com',
      metaTrimestral: 51000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 2.5,
      status: 'ativo'
    },
    {
      id: '7',
      nome: 'Vinicius Vila',
      email: 'vinicius.vila@grupovilanova.com',
      metaTrimestral: 45000000,
      percentualRealizado: 85.0,
      percentualParticipacao: 2.3,
      status: 'ativo'
    },
    {
      id: '8',
      nome: 'Vinicius Focomix',
      email: 'vinicius.focomix@grupovilanova.com',
      metaTrimestral: 42000000,
      percentualRealizado: 95.0,
      percentualParticipacao: 2.2,
      status: 'ativo'
    },
    {
      id: '9',
      nome: 'Danilo',
      email: 'danilo@grupovilanova.com',
      metaTrimestral: 48000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 2.4,
      status: 'ativo'
    },
    {
      id: '10',
      nome: 'Alexandre',
      email: 'alexandre@grupovilanova.com',
      metaTrimestral: 51000000,
      percentualRealizado: 90.9,
      percentualParticipacao: 2.5,
      status: 'ativo'
    },
    {
      id: '11',
      nome: 'Rômulo',
      email: 'romulo@grupovilanova.com',
      metaTrimestral: 54000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 2.6,
      status: 'ativo'
    },
    {
      id: '12',
      nome: 'Carolina',
      email: 'carolina@grupovilanova.com',
      metaTrimestral: 51000000,
      percentualRealizado: 87.4,
      percentualParticipacao: 2.4,
      status: 'ativo'
    }
  ]);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    metaTrimestral: '',
    percentualRealizado: '',
    percentualParticipacao: '',
    status: 'ativo' as 'ativo' | 'inativo'
  });

  const calcularValorParticipacao = (meta: number, percentualRealizado: number, percentualParticipacao: number) => {
    const valorRealizado = (meta * percentualRealizado) / 100;
    return (valorRealizado * percentualParticipacao) / 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoComprador: Comprador = {
      id: editingComprador ? editingComprador.id : Date.now().toString(),
      nome: formData.nome,
      email: formData.email,
      metaTrimestral: Number(formData.metaTrimestral),
      percentualRealizado: Number(formData.percentualRealizado) || 0,
      percentualParticipacao: Number(formData.percentualParticipacao),
      status: formData.status
    };

    if (editingComprador) {
      setCompradores(prev => prev.map(c => c.id === editingComprador.id ? novoComprador : c));
      toast({
        title: "Comprador atualizado",
        description: "As informações do comprador foram atualizadas com sucesso.",
      });
    } else {
      setCompradores(prev => [...prev, novoComprador]);
      toast({
        title: "Comprador adicionado",
        description: "Novo comprador foi adicionado com sucesso.",
      });
    }

    setIsDialogOpen(false);
    setEditingComprador(null);
    setFormData({
      nome: '',
      email: '',
      metaTrimestral: '',
      percentualRealizado: '',
      percentualParticipacao: '',
      status: 'ativo'
    });
  };

  const handleEdit = (comprador: Comprador) => {
    setEditingComprador(comprador);
    setFormData({
      nome: comprador.nome,
      email: comprador.email,
      metaTrimestral: comprador.metaTrimestral.toString(),
      percentualRealizado: comprador.percentualRealizado.toString(),
      percentualParticipacao: comprador.percentualParticipacao.toString(),
      status: comprador.status
    });
    setIsDialogOpen(true);
  };

  const totalMetas = compradores.reduce((acc, c) => acc + c.metaTrimestral, 0);
  const totalRealizado = compradores.reduce((acc, c) => acc + (c.metaTrimestral * c.percentualRealizado / 100), 0);
  const totalParticipacao = compradores.reduce((acc, c) => acc + calcularValorParticipacao(c.metaTrimestral, c.percentualRealizado, c.percentualParticipacao), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestão de Metas</h1>
              <p className="text-muted-foreground">Gerencie metas e participações dos compradores</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Comprador
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingComprador ? 'Editar Comprador' : 'Novo Comprador'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingComprador ? 'Atualize as informações do comprador.' : 'Adicione um novo comprador e defina suas metas.'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta">Meta Trimestral (R$)</Label>
                    <Input
                      id="meta"
                      type="number"
                      value={formData.metaTrimestral}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaTrimestral: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="realizado">Percentual Realizado (%)</Label>
                    <Input
                      id="realizado"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.percentualRealizado}
                      onChange={(e) => setFormData(prev => ({ ...prev, percentualRealizado: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="participacao">Percentual de Participação (%)</Label>
                    <Input
                      id="participacao"
                      type="number"
                      step="0.1"
                      value={formData.percentualParticipacao}
                      onChange={(e) => setFormData(prev => ({ ...prev, percentualParticipacao: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: 'ativo' | 'inativo') => setFormData(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      {editingComprador ? 'Atualizar' : 'Adicionar'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-8">
        <div className="container mx-auto px-6 space-y-8">
          {/* Resumo Geral */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Metas</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalMetas)}</div>
                <p className="text-xs text-muted-foreground">
                  Meta trimestral consolidada
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Realizado</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRealizado)}</div>
                <p className="text-xs text-muted-foreground">
                  {((totalRealizado / totalMetas) * 100).toFixed(1)}% da meta geral
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Participação</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalParticipacao)}</div>
                <p className="text-xs text-muted-foreground">
                  Valor total de participações
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Compradores */}
          <Card>
            <CardHeader>
              <CardTitle>Compradores e Metas</CardTitle>
              <CardDescription>
                Acompanhe o desempenho e participação de cada comprador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Comprador</TableHead>
                    <TableHead>% Realizado</TableHead>
                    <TableHead>Valor Realizado</TableHead>
                    <TableHead>% Participação</TableHead>
                    <TableHead>Valor Participação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {compradores.map((comprador) => {
                    const valorRealizado = (comprador.metaTrimestral * comprador.percentualRealizado) / 100;
                    const valorParticipacao = calcularValorParticipacao(comprador.metaTrimestral, comprador.percentualRealizado, comprador.percentualParticipacao);
                    return (
                      <TableRow key={comprador.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{comprador.nome}</div>
                            <div className="text-sm text-muted-foreground">{comprador.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={Math.min(comprador.percentualRealizado, 100)} 
                              className="w-16 h-2"
                              variant={comprador.percentualRealizado >= 100 ? 'success' : comprador.percentualRealizado >= 75 ? 'warning' : 'default'}
                            />
                            <span className="text-sm font-medium">
                              {comprador.percentualRealizado.toFixed(1)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(valorRealizado)}
                        </TableCell>
                        <TableCell>{comprador.percentualParticipacao}%</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(valorParticipacao)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={comprador.status === 'ativo' ? 'default' : 'secondary'}>
                            {comprador.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(comprador)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};