import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Settings, Calculator, Save, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConfiguracaoForm {
  markdownAtivo: boolean;
  percentualMarkdown: string;
}

export const ConfiguracoesView = () => {
  const { toast } = useToast();
  
  const form = useForm<ConfiguracaoForm>({
    defaultValues: {
      markdownAtivo: true,
      percentualMarkdown: '16,5'
    }
  });

  const onSubmit = (data: ConfiguracaoForm) => {
    console.log('Configurações salvas:', data);
    toast({
      title: "Configurações salvas",
      description: "As configurações foram atualizadas com sucesso.",
    });
  };

  const percentualMarkdown = form.watch('percentualMarkdown');
  const markdownAtivo = form.watch('markdownAtivo');

  // Calcula o divisor para o exemplo (100 - percentual)
  const calcularDivisor = () => {
    const percentual = parseFloat(percentualMarkdown.replace(',', '.'));
    if (isNaN(percentual) || percentual <= 0 || percentual >= 100) return '83,5';
    return (100 - percentual).toFixed(1).replace('.', ',');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Settings className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações do Sistema</h1>
          <p className="text-muted-foreground">Configure parâmetros globais do sistema</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-primary" />
                <CardTitle>Configuração de Markdown</CardTitle>
              </div>
              <CardDescription>
                Configure o percentual de markdown usado para cálculos de preço de venda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="markdownAtivo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-medium">
                        Ativar Markdown
                      </FormLabel>
                      <FormDescription>
                        Habilita o cálculo automático do markdown no sistema
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {markdownAtivo && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="percentualMarkdown"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Percentual de Markdown (%)</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input
                              placeholder="16,5"
                              className="max-w-xs"
                              {...field}
                            />
                            <span className="text-muted-foreground">%</span>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Percentual padrão do markdown. Pode ser alterado por administradores.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center space-x-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Como funciona o cálculo:</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Markdown configurado:</span>
                        <Badge variant="secondary">{percentualMarkdown}%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Divisor para cálculo:</span>
                        <Badge variant="outline">{calcularDivisor()}</Badge>
                      </div>
                      <div className="mt-3 p-3 bg-card rounded border-l-4 border-l-primary">
                        <div className="font-medium text-xs text-foreground mb-1">Fórmula:</div>
                        <div className="text-xs font-mono">
                          Markdown = Custo ÷ {calcularDivisor()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Salvar Configurações</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};