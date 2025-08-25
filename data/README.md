# Estrutura de Dados - SharePoint Lists

## Requisicoes.schema.json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/list-formatting.schema.json",
  "title": "Requisições",
  "columns": [
    {"name": "Título da Licitação", "type": "Text"},
    {"name": "Descrição", "type": "Note"},
    {"name": "Data de Abertura", "type": "DateTime"},
    {"name": "Status", "type": "Choice", "choices": ["Pendente", "Aprovado", "Reprovado"]},
    {"name": "Solicitante", "type": "User"},
    {"name": "Aprovador", "type": "User"}
  ]
}

## Historico.schema.json
{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/list-formatting.schema.json",
  "title": "Histórico",
  "columns": [
    {"name": "Requisição", "type": "Lookup", "list": "Requisições"},
    {"name": "Ação", "type": "Text"},
    {"name": "Data", "type": "DateTime"},
    {"name": "Usuário", "type": "User"}
  ]
}
