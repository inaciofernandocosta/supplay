// Formata valor para exibição sem R$ e ,00
export const formatValue = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Formata valor de milhões (ex: 205000000 -> 205.000.000)
export const formatMillions = (value: number) => {
  return formatValue(value);
};

// Máscara para input de números
export const maskNumber = (value: string) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Se não tem números, retorna vazio
  if (!numbers) return '';
  
  // Formata com pontos separadores
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Number(numbers));
};

// Remove máscara para obter valor numérico
export const unmaskNumber = (value: string): number => {
  return Number(value.replace(/\D/g, '') || '0');
};

// Formata percentual
export const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};