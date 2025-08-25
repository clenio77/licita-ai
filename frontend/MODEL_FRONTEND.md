# Modelagem Técnica - Frontend (Power Apps/SPFx)

## Abordagem 1: Power Apps
- App conectado à lista Requisições do SharePoint
- Telas:
  - Formulário de Nova Requisição (campos: Título, Descrição, Data de Abertura, Solicitante)
  - Dashboard de Status (galeria com cards de requisições e status)
  - Tela de Aprovação (visível apenas para aprovadores, botão Aprovar/Reprovar)
- Regras de negócio:
  - Apenas o aprovador pode aprovar/reprovar
  - Campos obrigatórios validados via Power Fx
- Exportação do app em .msapp para versionamento

## Abordagem 2: SPFx (SharePoint Framework)
- Webpart React conectada à lista Requisições via REST API
- Componentes:
  - Formulário de Nova Requisição (React Hook Form)
  - Dashboard de Status (Chart.js para gráficos, tabela de requisições)
  - Tela de Aprovação (condicional por usuário logado)
- Integração com SharePoint usando @pnp/sp ou fetch
- Controle de acesso via contexto do usuário (MSGraph ou contexto do SharePoint)
- Exportação do projeto SPFx para versionamento

## Critérios de Aceitação
- Interface responsiva e similar ao licitacao-ai
- Integração funcional com listas do SharePoint
- Controle de acesso implementado
- Artefatos exportados e versionados em /frontend

---

O próximo agente irá atribuir responsáveis e recursos para cada tarefa/modelo do frontend.
