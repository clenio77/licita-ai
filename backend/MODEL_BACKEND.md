# Modelagem Técnica - Backend e Flows

## Power Automate
- Fluxo 1: Aprovação de Requisição
  - Gatilho: Quando item criado na lista Requisições
  - Ações: Notificar aprovador, atualizar status para 'Pendente', registrar histórico
- Fluxo 2: Aprovação/Reprovação
  - Gatilho: Quando status alterado para 'Aprovado' ou 'Reprovado'
  - Ações: Notificar solicitante, registrar histórico
- Fluxo 3: Integração com OpenAI
  - Ação HTTP: Enviar descrição da requisição para API OpenAI, salvar resumo no campo Observações

## Azure Functions
- Função: Processar lógica customizada (ex: validação extra, integração externa)
- Linguagem: Node.js ou Python
- Endpoint protegido por API Key
- Integração com Power Automate via chamada HTTP

## Critérios de Aceitação
- Fluxos exportados em JSON e versionados em /flows
- Funções exportadas e documentadas em /backend
- Integração funcional entre Power Automate, Azure Functions e listas do SharePoint

---

O próximo agente irá atribuir responsáveis e recursos para cada fluxo e função.
