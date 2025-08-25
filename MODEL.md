# Modelagem das Soluções Técnicas (Model)

## História 1: Estruturação do Repositório e Ambiente
- Estrutura de diretórios conforme diretriz
- Arquivos: README.md, .gitignore, PROJECT_CHARTER.md, BREAKDOWN.md
- Ferramentas: VS Code, extensões recomendadas (Copilot, Power Platform, Azure, SPFx)

## História 2: Banco de Dados (SharePoint Lists)
- Listas: Requisições e Histórico
- Schema em JSON (PnP)
- Colunas: Título, Descrição, Data de Abertura, Status, Solicitante, Aprovador
- Versionamento dos schemas em /data/

## História 3: Frontend (Power Apps/SPFx)
- Power Apps: app conectado à lista Requisições, formulários customizados, controle de acesso por usuário
- SPFx: webpart React, integração com listas via REST API, UI com Chart.js
- Artefatos exportados em /frontend/

## História 4: Backend e Automações (Power Automate/Azure Functions)
- Power Automate: fluxos para aprovação, notificação, registro no histórico
- Azure Functions: Node.js ou Python, integração via API Key, lógica customizada
- Artefatos exportados em /flows/ e /backend/

## História 5: Dashboards (Power BI)
- Relatórios conectados às listas SharePoint
- Indicadores: status, aprovadores, prazos
- Relatórios versionados em /docs/ ou /frontend/

## História 6: Integração de IA
- Power Automate: chamada HTTP para OpenAI
- Azure Cognitive Search: indexação de documentos (opcional)
- Artefatos e exemplos de integração em /flows/ e /backend/

## História 7: Documentação e Diretrizes
- Documentação técnica e de uso em /docs/
- Guias de contribuição e setup

---

Cada item modelado será atribuído a responsáveis e recursos pelo próximo agente.
