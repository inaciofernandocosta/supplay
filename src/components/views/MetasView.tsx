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

import { formatValue, formatMillions, maskNumber, unmaskNumber } from "@/lib/formatters";

interface Comprador {
  id: string;
  nome: string;
  email: string;
  metaTrimestral: number;
  percentualRealizado: number;
  percentualParticipacao: number;
  status: 'ativo' | 'inativo';
}

const formatCurrency = formatValue;

export const MetasView = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingComprador, setEditingComprador] = useState<Comprador | null>(null);
  const [metaMensal, setMetaMensal] = useState<number>(0);
  const [metaMensalInput, setMetaMensalInput] = useState<string>('');
  const [metaSalva, setMetaSalva] = useState<number>(0);
  const [isEditingDistribution, setIsEditingDistribution] = useState(false);
  const [distributionEdits, setDistributionEdits] = useState<Record<string, number>>({});
  const [distributionEditInputs, setDistributionEditInputs] = useState<Record<string, string>>({});

  const handleSalvarMeta = () => {
    if (metaMensal > 0) {
      setMetaSalva(metaMensal);
      toast({
        title: "Meta salva com sucesso!",
        description: `Meta mensal de ${formatValue(metaMensal)} foi definida e distribuída.`,
      });
    } else {
      toast({
        title: "Erro ao salvar meta",
        description: "Por favor, digite um valor válido para a meta.",
        variant: "destructive",
      });
    }
  };
  const [compradores, setCompradores] = useState<Comprador[]>([
    {
      id: '1',
      nome: 'João Batista',
      email: 'joao.batista@grupovilanova.com',
      metaTrimestral: 60000000,
      percentualRealizado: 84.0,
      percentualParticipacao: 12.0,
      status: 'ativo'
    },
    {
      id: '2',
      nome: 'João Duarte',
      email: 'joao.duarte@grupovilanova.com',
      metaTrimestral: 54000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 10.5,
      status: 'ativo'
    },
    {
      id: '3',
      nome: 'Daniel',
      email: 'daniel@grupovilanova.com',
      metaTrimestral: 57000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 11.0,
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Tatiane',
      email: 'tatiane@grupovilanova.com',
      metaTrimestral: 48000000,
      percentualRealizado: 82.5,
      percentualParticipacao: 9.0,
      status: 'ativo'
    },
    {
      id: '5',
      nome: 'Paulo',
      email: 'paulo@grupovilanova.com',
      metaTrimestral: 54000000,
      percentualRealizado: 91.7,
      percentualParticipacao: 10.5,
      status: 'ativo'
    },
    {
      id: '6',
      nome: 'Carlos',
      email: 'carlos@grupovilanova.com',
      metaTrimestral: 51000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 9.5,
      status: 'ativo'
    },
    {
      id: '7',
      nome: 'Vinicius Vila',
      email: 'vinicius.vila@grupovilanova.com',
      metaTrimestral: 45000000,
      percentualRealizado: 85.0,
      percentualParticipacao: 8.5,
      status: 'ativo'
    },
    {
      id: '8',
      nome: 'Vinicius Focomix',
      email: 'vinicius.focomix@grupovilanova.com',
      metaTrimestral: 42000000,
      percentualRealizado: 95.0,
      percentualParticipacao: 8.0,
      status: 'ativo'
    },
    {
      id: '9',
      nome: 'Danilo',
      email: 'danilo@grupovilanova.com',
      metaTrimestral: 48000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 9.0,
      status: 'ativo'
    },
    {
      id: '10',
      nome: 'Alexandre',
      email: 'alexandre@grupovilanova.com',
      metaTrimestral: 51000000,
      percentualRealizado: 90.9,
      percentualParticipacao: 9.5,
      status: 'ativo'
    },
    {
      id: '11',
      nome: 'Rômulo',
      email: 'romulo@grupovilanova.com',
      metaTrimestral: 54000000,
      percentualRealizado: 90.0,
      percentualParticipacao: 10.5,
      status: 'ativo'
    },
    {
      id: '12',
      nome: 'Carolina',
      email: 'carolina@grupovilanova.com',
      metaTrimestral: 51000000,
      percentualRealizado: 87.4,
      percentualParticipacao: 2.0,
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
  const totalPercentualParticipacao = compradores.reduce((acc, c) => acc + c.percentualParticipacao, 0);

  const calcularDistribuicao = (comprador: Comprador) => {
    if (metaSalva === 0) return 0;
    // Se há edição manual para este comprador, usa o valor editado
    if (distributionEdits[comprador.id] !== undefined) {
      return distributionEdits[comprador.id];
    }
    // Caso contrário, usa a distribuição automática
    return (metaSalva * comprador.percentualParticipacao) / 100;
  };

  const getMetaEditada = () => {
    return Object.values(distributionEdits).reduce((acc, valor) => acc + valor, 0);
  };

  const hasManualEdits = () => {
    return Object.keys(distributionEdits).length > 0;
  };

  const handleEditDistribution = () => {
    setIsEditingDistribution(true);
    // Inicializar os inputs com os valores atuais
    const newInputs: Record<string, string> = {};
    compradores.forEach((comprador) => {
      const valorAtual = calcularDistribuicao(comprador);
      newInputs[comprador.id] = formatValue(valorAtual).replace('R$ ', '').replace(/\./g, '').replace(',', '.');
    });
    setDistributionEditInputs(newInputs);
  };

  const handleSaveDistribution = () => {
    const newEdits: Record<string, number> = {};
    Object.entries(distributionEditInputs).forEach(([id, input]) => {
      const valor = unmaskNumber(input.replace('.', ','));
      if (valor > 0) {
        newEdits[id] = valor;
      }
    });
    setDistributionEdits(newEdits);
    setIsEditingDistribution(false);
    toast({
      title: "Distribuição editada com sucesso!",
      description: "As alterações na distribuição foram salvas.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditingDistribution(false);
    setDistributionEditInputs({});
  };

  const handleDistributionInputChange = (compradorId: string, value: string) => {
    const maskedValue = maskNumber(value);
    setDistributionEditInputs(prev => ({
      ...prev,
      [compradorId]: maskedValue
    }));
  };

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
          {/* Card de Meta Mensal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Definir Meta do Mês
              </CardTitle>
              <CardDescription>
                Digite a meta mensal para distribuição automática pelos compradores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="meta-mensal">Valor da Meta</Label>
                    <Input
                      id="meta-mensal"
                      type="text"
                      placeholder="Digite a meta do mês"
                      value={metaMensalInput}
                      onChange={(e) => {
                        const maskedValue = maskNumber(e.target.value);
                        setMetaMensalInput(maskedValue);
                        setMetaMensal(unmaskNumber(maskedValue));
                      }}
                      className="text-lg"
                    />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Total de Participação</div>
                    <div className="text-2xl font-bold text-primary">
                      100.0%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">
                      {metaSalva > 0 ? `Meta atual: ${formatValue(metaSalva)}` : 'Nenhuma meta definida'}
                    </div>
                    {hasManualEdits() && (
                      <div className="text-sm text-muted-foreground">
                        Meta editada: {formatValue(getMetaEditada())}
                      </div>
                    )}
                  </div>
                  <Button 
                    onClick={handleSalvarMeta}
                    disabled={metaMensal === 0}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Gravar Meta
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribuição por Compradores */}
          {metaSalva > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Distribuição da Meta</CardTitle>
                    <CardDescription>
                      Como a meta de {formatValue(metaSalva)} será distribuída entre os compradores
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!isEditingDistribution ? (
                      <Button
                        variant="outline"
                        onClick={handleEditDistribution}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Editar Distribuição
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleSaveDistribution}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Salvar
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {compradores.map((comprador) => {
                    const valorDistribuido = calcularDistribuicao(comprador);
                    return (
                      <div key={comprador.id} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-corporate space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground text-sm">{comprador.nome}</h4>
                          <Badge variant="outline">{comprador.percentualParticipacao}%</Badge>
                        </div>
                        <div className="text-right">
                          {isEditingDistribution ? (
                            <Input
                              type="text"
                              value={distributionEditInputs[comprador.id] || ''}
                              onChange={(e) => handleDistributionInputChange(comprador.id, e.target.value)}
                              className="text-lg font-bold text-primary text-right"
                              placeholder="Digite o valor"
                            />
                          ) : (
                            <div className="text-lg font-bold text-primary">
                              {formatValue(valorDistribuido)}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};