import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send,
  Bot,
  User,
  Phone,
  CheckCircle2,
  Clock
} from "lucide-react";

interface Message {
  id: number;
  tipo: 'user' | 'bot';
  usuario: string;
  conteudo: string;
  timestamp: string;
  acao?: {
    tipo: 'aprovacao' | 'consulta' | 'alerta';
    dados?: any;
  };
}

export const AgenteView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      tipo: 'user',
      usuario: 'João Duarte',
      conteudo: 'Quanto usei da minha meta este mês?',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 2,
      tipo: 'bot',
      usuario: 'Agente IA',
      conteudo: 'Olá João! Você utilizou R$ 4.550.000 do seu orçamento de R$ 5.000.000, representando 91% do total. Restam apenas R$ 450.000 disponíveis. ⚠️ Atenção: Você está próximo do limite!',
      timestamp: '2024-01-15 14:30'
    },
    {
      id: 3,
      tipo: 'user',
      usuario: 'João Duarte',
      conteudo: 'Preciso fazer uma entrada de R$ 250.000. Posso solicitar liberação?',
      timestamp: '2024-01-15 14:32'
    },
    {
      id: 4,
      tipo: 'bot',
      usuario: 'Agente IA',
      conteudo: '🚫 Essa entrada excederia seu orçamento. Criei uma solicitação de liberação para o Diretor Comercial com justificativa "Oportunidade de compra - Desconto 15%". Status: Aguardando aprovação.',
      timestamp: '2024-01-15 14:32',
      acao: {
        tipo: 'aprovacao',
        dados: { valor: 250000, status: 'pendente' }
      }
    },
    {
      id: 5,
      tipo: 'user',
      usuario: 'Diretor Comercial',
      conteudo: '@agente qual o status das solicitações pendentes?',
      timestamp: '2024-01-15 15:15'
    },
    {
      id: 6,
      tipo: 'bot',
      usuario: 'Agente IA',
      conteudo: '📋 Você tem 2 solicitações pendentes:\n\n1️⃣ João Duarte - R$ 250.000 (Desconto 15%)\n2️⃣ Pedro Santos - R$ 180.000 (Estoque crítico)\n\n💰 Total: R$ 430.000\n\n⚡ Clique nos botões abaixo para aprovar rapidamente:',
      timestamp: '2024-01-15 15:15',
      acao: {
        tipo: 'aprovacao',
        dados: { solicitacoes: 2, valorTotal: 430000 }
      }
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [activeUser, setActiveUser] = useState<'comprador' | 'diretor'>('comprador');

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      tipo: 'user',
      usuario: activeUser === 'comprador' ? 'João Duarte' : 'Diretor Comercial',
      conteudo: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        tipo: 'bot',
        usuario: 'Agente IA',
        conteudo: '🤖 Processando sua solicitação... (Esta é uma simulação)',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Agente IA - WhatsApp</h1>
        <p className="text-sm lg:text-base text-muted-foreground">Simulação de interação via Evolution API</p>
      </div>

      {/* User Toggle */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Simular como:</span>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant={activeUser === 'comprador' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveUser('comprador')}
                className="gap-2 flex-1 sm:flex-none"
              >
                <User className="h-4 w-4" />
                Comprador
              </Button>
              <Button
                variant={activeUser === 'diretor' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveUser('diretor')}
                className="gap-2 flex-1 sm:flex-none"
              >
                <CheckCircle2 className="h-4 w-4" />
                Diretor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="glass-card">
        <CardHeader className="bg-success/5 border-b border-border/50">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-success rounded-lg">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg">Grupo Torre de Controle</span>
              <p className="text-sm text-muted-foreground font-normal">WhatsApp Business - Evolution API</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success">Online</span>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages Area */}
          <div className="h-80 lg:h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.tipo === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2 max-w-sm lg:max-w-md ${message.tipo === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={
                      message.tipo === 'bot' ? 'bg-primary text-primary-foreground' :
                      message.usuario === 'Diretor Comercial' ? 'bg-warning text-warning-foreground' :
                      'bg-success text-success-foreground'
                    }>
                      {message.tipo === 'bot' ? (
                        <Bot className="h-4 w-4" />
                      ) : message.usuario === 'Diretor Comercial' ? 'DC' : 'JD'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`space-y-1 min-w-0 ${message.tipo === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground truncate">
                        {message.usuario}
                      </span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      message.tipo === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card border border-border/50'
                    }`}>
                      <p className="text-sm whitespace-pre-line break-words">{message.conteudo}</p>
                      
                      {message.acao && message.acao.tipo === 'aprovacao' && (
                        <div className="mt-3 pt-3 border-t border-border/20 space-y-2">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button size="sm" className="bg-gradient-success hover:bg-success/90 gap-1 text-xs">
                              <CheckCircle2 className="h-3 w-3" />
                              Aprovar R$ 250K
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border/50 bg-card">
            <div className="flex gap-2">
              <Input
                placeholder={`Digite sua mensagem como ${activeUser === 'comprador' ? 'Comprador' : 'Diretor'}...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="gap-2 flex-shrink-0">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Enviar</span>
              </Button>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-muted/50 text-xs">
                💰 Consultar orçamento
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted/50 text-xs">
                📊 Performance produtos
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted/50 text-xs">
                ⚡ Solicitar liberação
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted/50 text-xs">
                📋 Status pendências
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Info */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Integração WhatsApp Business
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">🔗 Evolution API</h4>
              <p className="text-sm text-muted-foreground">
                API conectada com webhooks ativos para receber e enviar mensagens automaticamente.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">🤖 Agente N8N</h4>
              <p className="text-sm text-muted-foreground">
                Processamento inteligente de comandos com acesso direto ao banco Oracle/Concinco.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">⚡ Ações Rápidas</h4>
              <p className="text-sm text-muted-foreground">
                Aprovações e consultas diretas via chat, sem precisar acessar o sistema web.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};