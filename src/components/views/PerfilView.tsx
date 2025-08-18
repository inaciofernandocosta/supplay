import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Users,
  Settings,
  LogOut
} from "lucide-react";

export const PerfilView = () => {
  // Dados mockados do usuário do AD
  const userData = {
    name: "Carlos Silva Santos",
    email: "carlos.santos@empresa.com.br",
    username: "carlos.santos",
    department: "Comercial",
    position: "Gerente de Compras",
    location: "São Paulo - SP",
    phone: "(11) 99999-9999",
    employeeId: "EMP001234",
    admissionDate: "15/03/2020",
    lastLogin: "18/08/2025 - 09:30",
    status: "Ativo",
    groups: ["Compradores", "Gestores", "Finance_Read", "Estoque_Admin"],
    permissions: ["Dashboard_Geral", "Meu_Orcamento", "Gestao_Estoque", "Liberacoes", "Gestao_Metas"]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
          <p className="text-muted-foreground">Informações do Active Directory</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
          <Button variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-lg">CS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{userData.name}</h3>
                  <p className="text-muted-foreground">{userData.position}</p>
                  <Badge variant="secondary" className="text-xs">
                    {userData.status}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.location}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{userData.department}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Admissão: {userData.admissionDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">ID: {userData.employeeId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Permissões do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Permissões do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Módulos Acessíveis:</h4>
                  <div className="flex flex-wrap gap-2">
                    {userData.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission.replace(/_/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar com informações adicionais */}
        <div className="space-y-6">
          {/* Status de Conectividade */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status da Sessão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge className="bg-success text-success-foreground">
                  Conectado
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Último login:</span>
                <span className="text-sm">{userData.lastLogin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Usuário AD:</span>
                <span className="text-sm font-mono">{userData.username}</span>
              </div>
            </CardContent>
          </Card>

          {/* Grupos do AD */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Users className="h-4 w-4 mr-2" />
                Grupos do AD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userData.groups.map((group) => (
                  <div
                    key={group}
                    className="flex items-center p-2 rounded-md bg-muted/50"
                  >
                    <Users className="h-3 w-3 mr-2 text-muted-foreground" />
                    <span className="text-sm">{group}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informações de Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Autenticação:</span>
                  <span>Active Directory</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">2FA:</span>
                  <Badge variant="outline" className="text-xs">Habilitado</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sessão:</span>
                  <Badge variant="outline" className="text-xs">8h restantes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};