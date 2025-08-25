# Dashboard Power BI - Licita-AI

## Visão Geral
Dashboard completo para monitoramento e análise de requisições de licitações, conectado às listas SharePoint.

## Conectores de Dados

### 1. SharePoint Lists
- **Requisições**: Lista principal com todas as requisições
- **Histórico**: Lista de auditoria com todas as ações

### 2. Configuração de Conexão
```
URL: https://empresa.sharepoint.com/sites/licitacoes
Lista: Requisições
Autenticação: OAuth 2.0 (Microsoft Account)
```

## Páginas do Dashboard

### Página 1: Visão Geral
**Indicadores Principais (KPIs):**
- Total de Requisições
- Requisições Pendentes
- Requisições Aprovadas
- Requisições Reprovadas
- Taxa de Aprovação (%)
- Tempo Médio de Aprovação (dias)

**Gráficos:**
- Gráfico de pizza: Distribuição por Status
- Gráfico de barras: Requisições por Mês
- Gráfico de linha: Evolução do Status ao longo do tempo

### Página 2: Análise por Categoria
**Métricas:**
- Requisições por Categoria (Serviços, Produtos, Obras, Tecnologia, Outros)
- Valor Total Estimado por Categoria
- Tempo Médio de Aprovação por Categoria

**Visualizações:**
- Treemap: Distribuição por Categoria e Valor
- Gráfico de barras empilhadas: Status por Categoria
- Tabela: Top 10 Requisições por Valor

### Página 3: Performance de Aprovação
**Métricas:**
- Aprovadores mais ativos
- Tempo médio de resposta por aprovador
- Volume de trabalho por aprovador
- Requisições críticas (alto valor) pendentes

**Visualizações:**
- Gráfico de barras: Performance por Aprovador
- Scatter plot: Tempo vs. Valor das Requisições
- Heatmap: Volume de trabalho por período

### Página 4: Análise Temporal
**Métricas:**
- Sazonalidade das requisições
- Tendências mensais/trimestrais
- Comparação ano atual vs. anterior
- Previsão de demanda

**Visualizações:**
- Gráfico de linha: Tendência temporal
- Gráfico de barras: Comparação anual
- Gráfico de área: Acumulado mensal

## Fórmulas DAX Principais

### 1. Taxa de Aprovação
```dax
Taxa de Aprovação = 
DIVIDE(
    CALCULATE(
        COUNTROWS('Requisições'),
        'Requisições'[Status] = "Aprovado"
    ),
    COUNTROWS('Requisições'),
    0
)
```

### 2. Tempo Médio de Aprovação
```dax
Tempo Médio de Aprovação = 
AVERAGEX(
    'Requisições',
    DATEDIFF(
        'Requisições'[Data de Criação],
        'Requisições'[Data de Modificação],
        DAY
    )
)
```

### 3. Valor Total Estimado
```dax
Valor Total Estimado = 
SUM('Requisições'[Valor Estimado])
```

### 4. Requisições Pendentes
```dax
Requisições Pendentes = 
CALCULATE(
    COUNTROWS('Requisições'),
    'Requisições'[Status] IN {"Pendente", "Em Análise"}
)
```

## Filtros Globais

### Filtros de Data
- Seletor de período (Últimos 30 dias, 90 dias, 1 ano)
- Seletor de data específica
- Comparação de períodos

### Filtros de Status
- Múltipla seleção de status
- Filtro por aprovador
- Filtro por categoria

### Filtros de Valor
- Faixa de valores estimados
- Filtro por criticidade (alto valor)

## Atualizações e Refresh

### Configuração de Refresh
- **Automático**: A cada 1 hora
- **Manual**: Botão de refresh na interface
- **Programado**: Diário às 6h da manhã

### Notificações
- Alertas para requisições pendentes há mais de 5 dias
- Notificações para aprovadores com alto volume
- Alertas para requisições de alto valor

## Exportação e Compartilhamento

### Formatos de Exportação
- PDF (relatórios estáticos)
- PowerPoint (apresentações)
- Excel (dados brutos)
- Imagem (PNG/JPEG)

### Compartilhamento
- Workspace do Power BI
- Acesso por grupos de usuários
- Permissões baseadas em roles

## Configuração de Segurança

### Row-Level Security (RLS)
```dax
// Usuários veem apenas suas próprias requisições
[Email] = USERNAME()

// Aprovadores veem todas as requisições
[IsApprover] = TRUE
```

### Grupos de Usuários
- **Solicitantes**: Acesso apenas às próprias requisições
- **Aprovadores**: Acesso completo ao dashboard
- **Gerentes**: Acesso a todas as métricas e dados
- **Administradores**: Acesso total e configurações

## Manutenção e Monitoramento

### Verificações Diárias
- Conexão com SharePoint
- Qualidade dos dados
- Performance das consultas
- Uso do dashboard

### Otimizações
- Índices nas consultas
- Cache de dados frequentes
- Compressão de dados
- Limpeza de dados antigos

## Troubleshooting

### Problemas Comuns
1. **Erro de conexão**: Verificar permissões SharePoint
2. **Dados desatualizados**: Verificar refresh automático
3. **Performance lenta**: Otimizar consultas DAX
4. **Erro de autenticação**: Verificar configuração OAuth

### Logs e Monitoramento
- Logs de conexão SharePoint
- Métricas de performance
- Alertas de erro
- Relatórios de uso
