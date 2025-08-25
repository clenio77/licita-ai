# Diretriz do Projeto: Observatório de Licitações no Ecossistema Office 365

## Visão Geral
Migrar e adaptar o Observatório de Licitações para o ecossistema Microsoft, utilizando SharePoint, Power Platform, Power BI e Azure Functions, com versionamento e automação via VS Code e GitHub Copilot.

## Objetivos
- Centralizar e automatizar o fluxo de requisições e aprovações de licitações.
- Utilizar ferramentas Microsoft para frontend, backend, automações e dashboards.
- Manter versionamento de todos os artefatos no Git.
- Integrar IA para sumarização e insights.

## Escopo
- Listas do SharePoint como banco de dados.
- Power Apps ou SPFx para frontend.
- Power Automate para automações.
- Azure Functions para lógica customizada.
- Power BI para dashboards.
- Integração com OpenAI/Azure Cognitive Search.

## Restrições
- Uso exclusivo de ferramentas Microsoft e VS Code.
- Versionamento obrigatório de todos os artefatos.

## Critérios de Sucesso
- Fluxo de requisições e aprovações funcionando.
- Dashboards operacionais.
- IA integrada ao fluxo.
- Documentação e versionamento completos.

## Metodologia
- BMAD-METHOD: Breakdown, Model, Assign, Deliver.
- Estrutura de agentes para análise, revisão e entrega.

---

# Estrutura de Agentes

1. Agente de Decomposição (Breakdown):
   - Decompõe o projeto em histórias e tarefas.
2. Agente de Modelagem (Model):
   - Modela as soluções técnicas para cada história.
3. Agente de Atribuição (Assign):
   - Define responsáveis e recursos para cada tarefa.
4. Agente de Entrega (Deliver):
   - Gera artefatos, revisa e entrega incrementos.
5. Agente de Revisão (Review):
   - Revisa entregas e solicita correções ou melhorias.

Cada agente chama o próximo ao finalizar sua etapa, garantindo revisão contínua.

---

# Fluxo de Trabalho
1. Breakdown → 2. Model → 3. Assign → 4. Deliver → 5. Review → (loop até aprovação final)

---

# Observações
- Cada agente deve documentar suas decisões e repassar contexto ao próximo.
- O ciclo se repete até que todas as histórias estejam aprovadas.
