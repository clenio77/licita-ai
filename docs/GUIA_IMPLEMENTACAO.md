# Guia de Implementação Completa - Licita-AI

## 📋 Visão Geral da Implementação

Este guia fornece instruções passo a passo para implementar completamente o sistema Licita-AI no ambiente Office 365.

## 🚀 Fase 1: Preparação do Ambiente

### 1.1 Configuração do SharePoint

#### **Passo 1: Acessar SharePoint Admin Center**
1. **Abrir navegador** e acessar: `https://[empresa]-admin.sharepoint.com`
2. **Fazer login** com conta de administrador global
3. **Navegar** para "Sites" → "Active sites"

#### **Passo 2: Criar Site de Licitações**
1. **Clicar** em "Create" → "Site"
2. **Selecionar** "Team site"
3. **Preencher**:
   - **Site name**: `licitacoes`
   - **Site description**: `Sistema de Gerenciamento de Licitações`
   - **Privacy**: `Private` (recomendado)
4. **Clicar** "Next" → "Finish"

#### **Passo 3: Configurar Permissões**
1. **Acessar** o site criado: `https://[empresa].sharepoint.com/sites/licitacoes`
2. **Clicar** em "Settings" (ícone engrenagem) → "Site permissions"
3. **Clicar** em "Advanced permissions settings"
4. **Clicar** em "Groups" → "Create group"
5. **Criar grupos**:
   - **Solicitantes**: `licitacoes-solicitantes`
   - **Aprovadores**: `licitacoes-aprovadores`
   - **Gerentes**: `licitacoes-gerentes`

#### **Passo 4: Habilitar Microsoft Graph API**
1. **Acessar** Azure Portal: `https://portal.azure.com`
2. **Navegar** para "Azure Active Directory" → "App registrations"
3. **Clicar** "New registration"
4. **Preencher**:
   - **Name**: `LicitaAI-Graph-API`
   - **Supported account types**: `Accounts in this organizational directory only`
5. **Clicar** "Register"
6. **Anotar** "Application (client) ID" e "Directory (tenant) ID"

### 1.2 Configuração do Power Platform

#### **Passo 1: Acessar Power Platform Admin Center**
1. **Abrir** navegador e acessar: `https://admin.powerplatform.microsoft.com`
2. **Fazer login** com conta de administrador global
3. **Navegar** para "Environments"

#### **Passo 2: Criar Ambiente de Desenvolvimento**
1. **Clicar** em "New environment"
2. **Preencher**:
   - **Environment name**: `LicitaAI-Dev`
   - **Type**: `Sandbox`
   - **Region**: `United States` (ou região mais próxima)
3. **Clicar** "Save"

#### **Passo 3: Configurar Conectores SharePoint**
1. **Navegar** para "Data" → "Connectors"
2. **Procurar** por "SharePoint"
3. **Clicar** em "SharePoint" → "Configure"
4. **Selecionar** ambiente `LicitaAI-Dev`
5. **Clicar** "Save"

#### **Passo 4: Configurar Variáveis de Ambiente**
1. **Navegar** para "Environments" → `LicitaAI-Dev`
2. **Clicar** em "Settings" → "Environment variables"
3. **Clicar** em "New"
4. **Criar variáveis**:
   - **Name**: `OpenAI_API_Key`
   - **Value**: `[sua_chave_openai]`
   - **Type**: `Text`
5. **Clicar** "Save"

### 1.3 Configuração do Azure

#### **Passo 1: Acessar Azure Portal**
1. **Abrir** navegador e acessar: `https://portal.azure.com`
2. **Fazer login** com conta Microsoft 365

#### **Passo 2: Criar Function App**
1. **Clicar** em "Create a resource"
2. **Procurar** por "Function App"
3. **Clicar** "Create"
4. **Preencher**:
   - **Subscription**: Selecionar sua assinatura
   - **Resource group**: `licitai-rg` (criar novo)
   - **Function App name**: `licitai-functions`
   - **Publish**: `Code`
   - **Runtime stack**: `Node.js`
   - **Version**: `18 LTS`
   - **Region**: Mesma região do Power Platform
5. **Clicar** "Review + create" → "Create"

#### **Passo 3: Configurar Microsoft Graph Permissions**
1. **Navegar** para "Azure Active Directory" → "App registrations"
2. **Selecionar** o app `LicitaAI-Graph-API` criado anteriormente
3. **Clicar** em "API permissions"
4. **Clicar** "Add permission"
5. **Selecionar** "Microsoft Graph" → "Application permissions"
6. **Adicionar permissões**:
   - `Sites.ReadWrite.All`
   - `User.Read.All`
   - `Mail.Send`
7. **Clicar** "Add permissions"
8. **Clicar** "Grant admin consent"

#### **Passo 4: Configurar Variáveis de Ambiente**
1. **Navegar** para Function App criada
2. **Clicar** em "Configuration" → "Application settings"
3. **Clicar** "New application setting"
4. **Adicionar configurações**:
   - **Name**: `MICROSOFT_GRAPH_TOKEN`
   - **Value**: `[token_do_graph]`
   - **Name**: `SHAREPOINT_SITE_ID`
   - **Value**: `[id_do_site]`
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `[chave_api_openai]`
5. **Clicar** "Save"

## 📊 Fase 2: Implementação das Listas SharePoint

### 2.1 Criar Lista "Requisições"

#### **Passo 1: Acessar o Site**
1. **Abrir** navegador e acessar: `https://[empresa].sharepoint.com/sites/licitacoes`
2. **Fazer login** com conta de usuário com permissões de administrador

#### **Passo 2: Criar Nova Lista**
1. **Clicar** em "New" → "List"
2. **Selecionar** "Blank list"
3. **Preencher**:
   - **Name**: `Requisições`
   - **Description**: `Lista para gerenciar requisições de licitações`
4. **Clicar** "Create"

#### **Passo 3: Configurar Colunas**
1. **Clicar** em "Settings" (ícone engrenagem) → "List settings"
2. **Na seção "Columns", clicar** "Create column" para cada coluna:

   **Coluna 1: Título da Licitação**
   - **Name**: `Título da Licitação`
   - **Type**: `Single line of text`
   - **Required**: ✅ Yes
   - **Maximum number of characters**: `255`
   - **Clicar** "OK"

   **Coluna 2: Descrição**
   - **Name**: `Descrição`
   - **Type**: `Multiple lines of text`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 3: Data de Abertura**
   - **Name**: `Data de Abertura`
   - **Type**: `Date and Time`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 4: Status**
   - **Name**: `Status`
   - **Type**: `Choice`
   - **Choices**: 
     ```
     Pendente
     Em Análise
     Aprovado
     Reprovado
     Cancelado
     ```
   - **Default value**: `Pendente`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 5: Solicitante**
   - **Name**: `Solicitante`
   - **Type**: `Person or Group`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 6: Aprovador**
   - **Name**: `Aprovador`
   - **Type**: `Person or Group`
   - **Required**: ❌ No
   - **Clicar** "OK"

   **Coluna 7: Valor Estimado**
   - **Name**: `Valor Estimado`
   - **Type**: `Currency`
   - **Required**: ❌ No
   - **Clicar** "OK"

   **Coluna 8: Categoria**
   - **Name**: `Categoria`
   - **Type**: `Choice`
   - **Choices**:
     ```
     Serviços
     Produtos
     Obras
     Tecnologia
     Outros
     ```
   - **Required**: ❌ No
   - **Clicar** "OK"

   **Coluna 9: Observações**
   - **Name**: `Observações`
   - **Type**: `Multiple lines of text`
   - **Required**: ❌ No
   - **Clicar** "OK"

   **Coluna 10: Data de Criação**
   - **Name**: `Data de Criação`
   - **Type**: `Date and Time`
   - **Required**: ❌ No
   - **Clicar** "OK"

   **Coluna 11: Data de Modificação**
   - **Name**: `Data de Modificação`
   - **Type**: `Date and Time`
   - **Required**: ❌ No
   - **Clicar** "OK"

#### **Passo 4: Configurar Views**
1. **Clicar** em "Settings" → "List settings"
2. **Na seção "Views", clicar** "Create view"
3. **Criar view "Todas as Requisições"**:
   - **View name**: `Todas as Requisições`
   - **Columns**: Selecionar todas as colunas principais
   - **Sort**: `Data de Criação` (descending)
   - **Clicar** "OK"
4. **Criar view "Minhas Requisições"**:
   - **View name**: `Minhas Requisições`
   - **Filter**: `Solicitante is equal to [Me]`
   - **Clicar** "OK"
5. **Criar view "Pendentes de Aprovação"**:
   - **View name**: `Pendentes de Aprovação`
   - **Filter**: `Status is equal to Pendente`
   - **Clicar** "OK"

### 2.2 Criar Lista "Histórico"

#### **Passo 1: Criar Nova Lista**
1. **Clicar** em "New" → "List"
2. **Selecionar** "Blank list"
3. **Preencher**:
   - **Name**: `Histórico`
   - **Description**: `Lista para rastrear histórico de ações nas requisições`
4. **Clicar** "Create"

#### **Passo 2: Configurar Colunas**
1. **Clicar** em "Settings" → "List settings"
2. **Criar colunas**:

   **Coluna 1: Requisição**
   - **Name**: `Requisição`
   - **Type**: `Lookup`
   - **Get information from**: `Requisições`
   - **In this column**: `Título da Licitação`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 2: Ação**
   - **Name**: `Ação`
   - **Type**: `Choice`
   - **Choices**:
     ```
     Criada
     Editada
     Enviada para Aprovação
     Aprovada
     Reprovada
     Cancelada
     Comentário Adicionado
     ```
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 3: Data**
   - **Name**: `Data`
   - **Type**: `Date and Time`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 4: Usuário**
   - **Name**: `Usuário`
   - **Type**: `Person or Group`
   - **Required**: ✅ Yes
   - **Clicar** "OK"

   **Coluna 5: Comentário**
   - **Name**: `Comentário`
   - **Type**: `Multiple lines of text`
   - **Required**: ❌ No
   - **Clicar** "OK"

#### **Passo 3: Configurar Views**
1. **Criar view "Todas as Ações"**:
   - **View name**: `Todas as Ações`
   - **Sort**: `Data` (descending)
   - **Clicar** "OK"
2. **Criar view "Ações por Requisição"**:
   - **View name**: `Ações por Requisição`
   - **Group by**: `Requisição`
   - **Clicar** "OK"

### 2.3 Configurar Permissões

#### **Passo 1: Usar PowerShell (Recomendado)**
1. **Instalar** PnP PowerShell:
   ```powershell
   Install-Module -Name PnP.PowerShell -Force
   ```

2. **Executar script**:
   ```powershell
   # Conectar ao SharePoint
   Connect-PnPOnline -Url "https://[empresa].sharepoint.com/sites/licitacoes" -Interactive

   # Grupo Solicitantes
   New-PnPGroup -Title "Solicitantes" -Description "Usuários que podem criar requisições"
   Set-PnPGroupPermissions -Identity "Solicitantes" -List "Requisições" -AddRole "Contribute"
   Set-PnPGroupPermissions -Identity "Solicitantes" -List "Histórico" -AddRole "Read"

   # Grupo Aprovadores
   New-PnPGroup -Title "Aprovadores" -Description "Usuários que podem aprovar requisições"
   Set-PnPGroupPermissions -Identity "Aprovadores" -List "Requisições" -AddRole "Full Control"
   Set-PnPGroupPermissions -Identity "Aprovadores" -List "Histórico" -AddRole "Full Control"

   # Grupo Gerentes
   New-PnPGroup -Title "Gerentes" -Description "Usuários com acesso total"
   Set-PnPGroupPermissions -Identity "Gerentes" -List "Requisições" -AddRole "Full Control"
   Set-PnPGroupPermissions -Identity "Gerentes" -List "Histórico" -AddRole "Full Control"
   ```

#### **Passo 2: Usar Interface Web (Alternativa)**
1. **Acessar** cada lista
2. **Clicar** em "Settings" → "List settings"
3. **Clicar** em "Permissions for this list"
4. **Clicar** em "Manage parent"
5. **Adicionar usuários** aos grupos criados

## 🔄 Fase 3: Implementação dos Fluxos Power Automate

### 3.1 Fluxo de Criação de Requisição

#### **Passo 1: Acessar Power Automate**
1. **Abrir** navegador e acessar: `https://flow.microsoft.com`
2. **Fazer login** com conta Microsoft 365
3. **Clicar** em "My flows"

#### **Passo 2: Criar Novo Fluxo**
1. **Clicar** em "Create" → "Automated cloud flow"
2. **Procurar** por "SharePoint"
3. **Selecionar** "When an item is created"
4. **Clicar** "Create"

#### **Passo 3: Configurar Trigger**
1. **Na seção "When an item is created"**:
   - **Site Address**: Selecionar site `licitacoes`
   - **List Name**: Selecionar lista `Requisições`
2. **Clicar** "Next step"

#### **Passo 4: Adicionar Ação "Get user profile"**
1. **Clicar** em "Add an action"
2. **Procurar** por "Get user profile"
3. **Selecionar** "Office 365 Users - Get user profile"
4. **Configurar**:
   - **User (UPN)**: `@{triggerOutputs()?['body/Solicitante']}`
5. **Clicar** "Next step"

#### **Passo 5: Adicionar Ação "Create item" (Histórico)**
1. **Clicar** em "Add an action"
2. **Procurar** por "SharePoint"
3. **Selecionar** "Create item"
4. **Configurar**:
   - **Site Address**: Selecionar site `licitacoes`
   - **List Name**: Selecionar lista `Histórico`
   - **Requisição**: `@{triggerOutputs()?['body/ID']}`
   - **Ação**: `Criada`
   - **Data**: `@{utcNow()}`
   - **Usuário**: `@{triggerOutputs()?['body/Solicitante']}`
   - **Comentário**: `Nova requisição criada automaticamente`
5. **Clicar** "Next step"

#### **Passo 6: Adicionar Ação "Send email"**
1. **Clicar** em "Add an action"
2. **Procurar** por "Send email"
3. **Selecionar** "Office 365 Outlook - Send an email (V2)"
4. **Configurar**:
   - **To**: `@{body('Get_user_profile')?['mail']}`
   - **Subject**: `Requisição de Licitação Criada - #@{triggerOutputs()?['body/ID']}`
   - **Body**: 
     ```
     Sua requisição foi criada com sucesso e está aguardando aprovação.
     
     Detalhes:
     Título: @{triggerOutputs()?['body/Título da Licitação']}
     Descrição: @{triggerOutputs()?['body/Descrição']}
     Data de Abertura: @{formatDateTime(triggerOutputs()?['body/Data de Abertura'], 'dd/MM/yyyy')}
     
     Status: @{triggerOutputs()?['body/Status']}
     
     Você será notificado quando houver atualizações.
     ```
5. **Clicar** "Next step"

#### **Passo 7: Adicionar Condição para Aprovador**
1. **Clicar** em "Add an action"
2. **Selecionar** "Condition"
3. **Configurar**:
   - **Choose a value**: `@{triggerOutputs()?['body/Aprovador']}`
   - **is equal to**: `''`
4. **Clicar** "Next step"

#### **Passo 8: Configurar Ações da Condição**
1. **Na seção "If yes"** (sem aprovador):
   - **Adicionar ação** "Send email" para admin
   - **To**: `admin@empresa.com`
   - **Subject**: `Nova Requisição Sem Aprovador - #@{triggerOutputs()?['body/ID']}`
   - **Body**: Texto apropriado

2. **Na seção "If no"** (com aprovador):
   - **Adicionar ação** "Get user profile" para aprovador
   - **Adicionar ação** "Send email" para aprovador
   - **To**: `@{body('Get_user_profile_2')?['mail']}`
   - **Subject**: `Nova Requisição para Aprovação - #@{triggerOutputs()?['body/ID']}`

#### **Passo 9: Salvar e Testar**
1. **Clicar** em "Save"
2. **Nomear** fluxo: `Fluxo - Criação de Requisição`
3. **Clicar** em "Test" → "Manually"
4. **Criar item** na lista Requisições para testar

### 3.2 Fluxo de Aprovação

#### **Passo 1: Criar Novo Fluxo**
1. **Clicar** em "Create" → "Automated cloud flow"
2. **Procurar** por "SharePoint"
3. **Selecionar** "When an item is modified"
4. **Clicar** "Create"

#### **Passo 2: Configurar Trigger**
1. **Na seção "When an item is modified"**:
   - **Site Address**: Selecionar site `licitacoes`
   - **List Name**: Selecionar lista `Requisições`
2. **Clicar** em "Show advanced options"
3. **Adicionar filtro**:
   - **Filter Query**: `Status eq 'Aprovado' or Status eq 'Reprovado'`
4. **Clicar** "Next step"

#### **Passo 3: Adicionar Ações**
1. **Adicionar** "Get user profile" para solicitante
2. **Adicionar** "Get user profile" para aprovador
3. **Adicionar** "Create item" no histórico
4. **Adicionar** "Send email" para solicitante
5. **Adicionar** "Condition" para status aprovado/reprovado
6. **Configurar** emails específicos para cada status

#### **Passo 4: Salvar e Testar**
1. **Salvar** fluxo como `Fluxo - Aprovação de Requisição`
2. **Testar** modificando status de uma requisição

### 3.3 Fluxo de Integração OpenAI

#### **Passo 1: Criar Novo Fluxo**
1. **Clicar** em "Create" → "Automated cloud flow"
2. **Procurar** por "SharePoint"
3. **Selecionar** "When an item is created or modified"
4. **Clicar** "Create"

#### **Passo 2: Configurar Trigger**
1. **Site Address**: Selecionar site `licitacoes`
2. **List Name**: Selecionar lista `Requisições`
3. **Adicionar filtro**: `not(equals(triggerOutputs()?['body/Descrição'], ''))`

#### **Passo 3: Adicionar Variáveis**
1. **Clicar** em "Add an action"
2. **Selecionar** "Initialize variable"
3. **Criar variáveis**:
   - `varDescricao`: `@{triggerOutputs()?['body/Descrição']}`
   - `varTitulo`: `@{triggerOutputs()?['body/Título da Licitação']}`
   - `varCategoria`: `@{triggerOutputs()?['body/Categoria']}`
   - `varValorEstimado`: `@{triggerOutputs()?['body/Valor Estimado']}`

#### **Passo 4: Adicionar Ação HTTP para OpenAI**
1. **Clicar** em "Add an action"
2. **Procurar** por "HTTP"
3. **Selecionar** "HTTP with Azure AD OAuth"
4. **Configurar**:
   - **Method**: `POST`
   - **URI**: `https://api.openai.com/v1/chat/completions`
   - **Headers**: 
     ```
     Authorization: Bearer @{variables('varOpenAIToken')}
     Content-Type: application/json
     ```
   - **Body**: 
     ```json
     {
       "model": "gpt-4o-mini",
       "messages": [
         {
           "role": "system",
           "content": "Você é um assistente especializado em análise de licitações..."
         },
         {
           "role": "user",
           "content": "Título: @{variables('varTitulo')}\nCategoria: @{variables('varCategoria')}\nValor Estimado: @{variables('varValorEstimado')}\nDescrição: @{variables('varDescricao')}"
         }
       ],
       "max_tokens": 500,
       "temperature": 0.3
     }
     ```

#### **Passo 5: Processar Resposta OpenAI**
1. **Adicionar** "Parse JSON" para processar resposta
2. **Adicionar** "Update item" para atualizar campo Observações
3. **Adicionar** "Create item" no histórico
4. **Adicionar** condições para alertas de complexidade

#### **Passo 6: Configurar Variável de Ambiente**
1. **Clicar** em "Settings" → "Environment variables"
2. **Criar variável** `OpenAI_API_Key`
3. **Valor**: Sua chave API OpenAI

#### **Passo 7: Salvar e Testar**
1. **Salvar** fluxo como `Fluxo - Integração OpenAI`
2. **Testar** criando/modificando requisição com descrição

## ⚙️ Fase 4: Implementação das Azure Functions

### 4.1 Configuração do Function App

#### **Passo 1: Acessar Azure Portal**
1. **Abrir** navegador e acessar: `https://portal.azure.com`
2. **Fazer login** com conta Microsoft 365
3. **Verificar** se tem acesso à assinatura Azure

#### **Passo 2: Criar Resource Group**
1. **Clicar** em "Create a resource"
2. **Procurar** por "Resource group"
3. **Clicar** "Create"
4. **Preencher**:
   - **Subscription**: Selecionar sua assinatura
   - **Resource group name**: `licitai-rg`
   - **Region**: Mesma região do Power Platform
5. **Clicar** "Review + create" → "Create"

#### **Passo 3: Criar Function App**
1. **Clicar** em "Create a resource"
2. **Procurar** por "Function App"
3. **Clicar** "Create"
4. **Preencher aba "Basics"**:
   - **Subscription**: Selecionar sua assinatura
   - **Resource group**: `licitai-rg`
   - **Function App name**: `licitai-functions-[suaempresa]`
   - **Publish**: `Code`
   - **Runtime stack**: `Node.js`
   - **Version**: `18 LTS`
   - **Region**: Mesma região do Power Platform
5. **Clicar** "Next: Hosting"
6. **Preencher aba "Hosting"**:
   - **Operating System**: `Windows`
   - **Plan type**: `Consumption (Serverless)`
7. **Clicar** "Next: Monitoring"
8. **Preencher aba "Monitoring"**:
   - **Enable Application Insights**: ✅ Yes
   - **Application Insights**: `Create new`
   - **Name**: `licitai-insights-[suaempresa]`
9. **Clicar** "Review + create" → "Create"

#### **Passo 4: Aguardar Deploy**
1. **Aguardar** criação completa (5-10 minutos)
2. **Clicar** em "Go to resource" quando finalizar

### 4.2 Deploy da Function de Processamento

#### **Passo 1: Acessar Function App**
1. **No Azure Portal**, navegar para Function App criada
2. **Clicar** em "Functions" no menu lateral
3. **Clicar** em "Create"

#### **Passo 2: Criar Nova Função**
1. **Selecionar** "HTTP trigger"
2. **Preencher**:
   - **Template**: `HTTP trigger`
   - **New Function**: `ProcessamentoRequisicao`
   - **Authorization level**: `Function`
3. **Clicar** "Create"

#### **Passo 3: Configurar Código**
1. **Na função criada**, clicar em "Code + Test"
2. **Substituir** código padrão pelo código do arquivo `backend/azureFunctionProcessamento.js`
3. **Clicar** em "Save"

#### **Passo 4: Configurar Bindings**
1. **Clicar** em "Integration" no menu lateral
2. **Verificar** se o binding HTTP está configurado:
   - **Route**: `{*route}`
   - **Methods**: `GET, POST`
3. **Clicar** em "Save"

#### **Passo 5: Configurar CORS (se necessário)**
1. **No menu lateral**, clicar em "Configuration"
2. **Procurar** por "CORS"
3. **Adicionar** origens permitidas:
   - `https://[empresa].sharepoint.com`
   - `https://flow.microsoft.com`
4. **Clicar** "Save"

### 4.3 Configuração de Variáveis de Ambiente

#### **Passo 1: Acessar Configurações**
1. **No Function App**, clicar em "Configuration" no menu lateral
2. **Clicar** em "Application settings"

#### **Passo 2: Adicionar Configurações**
1. **Clicar** em "New application setting"
2. **Adicionar configurações**:

   **Configuração 1:**
   - **Name**: `MICROSOFT_GRAPH_TOKEN`
   - **Value**: `[token_do_graph]`
   - **Clicar** "OK"

   **Configuração 2:**
   - **Name**: `SHAREPOINT_SITE_ID`
   - **Value**: `[id_do_site]`
   - **Clicar** "OK"

   **Configuração 3:**
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `[chave_api_openai]`
   - **Clicar** "OK"

3. **Clicar** em "Save"

#### **Passo 3: Obter Valores das Configurações**

**Para obter MICROSOFT_GRAPH_TOKEN:**
1. **Acessar** Azure Portal → "Azure Active Directory"
2. **Navegar** para "App registrations"
3. **Selecionar** app `LicitaAI-Graph-API`
4. **Clicar** em "Certificates & secrets"
5. **Clicar** "New client secret"
6. **Anotar** o valor gerado

**Para obter SHAREPOINT_SITE_ID:**
1. **Acessar** site SharePoint: `https://[empresa].sharepoint.com/sites/licitacoes`
2. **Clicar** em "Settings" → "Site information"
3. **Anotar** "Site ID"

**Para obter OPENAI_API_KEY:**
1. **Acessar** OpenAI: `https://platform.openai.com/api-keys`
2. **Criar** nova chave API
3. **Anotar** a chave gerada

### 4.4 Configuração de Permissões Microsoft Graph

#### **Passo 1: Verificar Permissões**
1. **No Azure Portal**, navegar para "Azure Active Directory"
2. **Clicar** em "App registrations"
3. **Selecionar** app `LicitaAI-Graph-API`

#### **Passo 2: Adicionar Permissões**
1. **Clicar** em "API permissions"
2. **Verificar** se as permissões estão adicionadas:
   - `Sites.ReadWrite.All`
   - `User.Read.All`
   - `Mail.Send`
3. **Se não estiverem**, clicar em "Add permission"
4. **Selecionar** "Microsoft Graph" → "Application permissions"
5. **Adicionar** as permissões necessárias

#### **Passo 3: Conceder Consentimento**
1. **Verificar** se o status é "Granted for [empresa]"
2. **Se não estiver**, clicar em "Grant admin consent for [empresa]"
3. **Confirmar** a ação

### 4.5 Testar Azure Function

#### **Passo 1: Obter URL da Função**
1. **Na função criada**, clicar em "Code + Test"
2. **Copiar** a "Function URL"
3. **Anotar** a URL para testes

#### **Passo 2: Testar com Postman ou Similar**
1. **Abrir** Postman ou similar
2. **Criar** requisição POST para a URL da função
3. **Headers**:
   ```
   Content-Type: application/json
   ```
4. **Body** (JSON):
   ```json
   {
     "requisicaoId": "1",
     "action": "aprovar",
     "userId": "usuario@empresa.com",
     "comentario": "Teste de aprovação"
   }
   ```
5. **Enviar** requisição
6. **Verificar** resposta (deve ser 200 OK)

#### **Passo 3: Verificar Logs**
1. **No Azure Portal**, clicar em "Monitor" na função
2. **Verificar** logs de execução
3. **Identificar** possíveis erros

## 🎨 Fase 5: Implementação do Power App

### 5.1 Criação do App

#### **Passo 1: Acessar Power Apps Studio**
1. **Abrir** navegador e acessar: `https://make.powerapps.com`
2. **Fazer login** com conta Microsoft 365
3. **Verificar** se está no ambiente correto (`LicitaAI-Dev`)

#### **Passo 2: Criar Novo App**
1. **Clicar** em "Create"
2. **Selecionar** "Blank app"
3. **Preencher**:
   - **App name**: `LicitaAI - Gerenciamento de Requisições`
   - **Environment**: `LicitaAI-Dev`
4. **Clicar** "Create"

#### **Passo 3: Aguardar Criação**
1. **Aguardar** Power Apps Studio abrir
2. **Verificar** se o app foi criado com sucesso

### 5.2 Configuração de Conexões

#### **Passo 1: Conectar SharePoint**
1. **No Power Apps Studio**, clicar em "View" → "Data sources"
2. **Clicar** em "Add data source"
3. **Procurar** por "SharePoint"
4. **Selecionar** "SharePoint"
5. **Configurar**:
   - **Site Address**: `https://[empresa].sharepoint.com/sites/licitacoes`
   - **List Name**: `Requisições`
6. **Clicar** "Connect"
7. **Repetir** para lista `Histórico`

#### **Passo 2: Verificar Conexões**
1. **Na aba "Data sources"**, verificar se as conexões estão ativas
2. **Testar** conexão clicando em "Test connection"
3. **Verificar** se os dados são carregados

### 5.3 Implementação das Telas

#### **Passo 1: Tela Home**
1. **Renomear** primeira tela para `Home`
2. **Adicionar controles**:
   - **Label** com título: "Licita-AI - Sistema de Requisições"
   - **Button** "Nova Requisição" → `Navigate('NovaRequisicao')`
   - **Button** "Minhas Requisições" → `Navigate('MinhasRequisicoes')`
   - **Button** "Aprovações Pendentes" → `Navigate('AprovacoesPendentes')`
   - **Button** "Dashboard" → `Navigate('Dashboard')`

#### **Passo 2: Tela Nova Requisição**
1. **Clicar** em "+" para adicionar nova tela
2. **Renomear** para `NovaRequisicao`
3. **Adicionar controles**:
   - **TextInput** para título
   - **TextArea** para descrição
   - **DatePicker** para data de abertura
   - **Dropdown** para categoria
   - **NumberInput** para valor estimado
   - **PeoplePicker** para aprovador
   - **Button** "Salvar Rascunho"
   - **Button** "Enviar para Aprovação"

#### **Passo 3: Tela Minhas Requisições**
1. **Adicionar** nova tela `MinhasRequisicoes`
2. **Adicionar Gallery**:
   - **Data source**: `Filter(Requisicoes, Solicitante.Email eq User().Email)`
   - **Layout**: Vertical
   - **Template**: Adicionar labels para título, status, data
   - **Button** "Ver Detalhes"

#### **Passo 4: Tela Aprovações Pendentes**
1. **Adicionar** nova tela `AprovacoesPendentes`
2. **Adicionar Gallery**:
   - **Data source**: `Filter(Requisicoes, Status eq 'Pendente' or Status eq 'Em Análise')`
   - **Template**: Adicionar botões "Aprovar" e "Reprovar"
   - **Visible**: `User().Email in 'Aprovadores'`

#### **Passo 5: Tela Dashboard**
1. **Adicionar** nova tela `Dashboard`
2. **Adicionar controles**:
   - **Labels** para KPIs principais
   - **Galleries** para gráficos de status e categoria
   - **Gallery** para requisições recentes

### 5.4 Configuração de Segurança

#### **Passo 1: Controle de Acesso por Usuário**
1. **Para funcionalidades de aprovação**:
   ```powerapps
   // No botão "Aprovar", propriedade Visible:
   User().Email in 'Aprovadores'
   ```

2. **Para visualização própria**:
   ```powerapps
   // No Gallery "Minhas Requisições":
   Filter(Requisicoes, Solicitante.Email eq User().Email)
   ```

#### **Passo 2: Configurar Permissões de Tela**
1. **Na tela "Aprovações Pendentes"**:
   - **Propriedade Visible**: `User().Email in 'Aprovadores'`
2. **Na tela "Dashboard"**:
   - **Permitir acesso** para todos os usuários

### 5.5 Configuração de Fórmulas

#### **Passo 1: Fórmulas de Navegação**
1. **Botão "Nova Requisição"**:
   ```powerapps
   Navigate('NovaRequisicao')
   ```

2. **Botão "Voltar"**:
   ```powerapps
   Navigate('Home')
   ```

#### **Passo 2: Fórmulas de Dados**
1. **Salvar requisição**:
   ```powerapps
   Patch('Requisicoes', Defaults('Requisicoes'), {
     'Título da Licitação': txtTitulo.Text,
     'Descrição': txtDescricao.Text,
     'Data de Abertura': dpDataAbertura.SelectedDate,
     'Categoria': ddCategoria.Selected,
     'Valor Estimado': numValorEstimado.Value,
     'Aprovador': ppAprovador.Selected,
     'Status': 'Pendente',
     'Solicitante': User(),
     'Data de Criação': Now()
   })
   ```

2. **Aprovar requisição**:
   ```powerapps
   Patch('Requisicoes', LookUp('Requisicoes', ID = varRequisicaoSelecionada.ID), {
     'Status': 'Aprovado',
     'Data de Modificação': Now()
   })
   ```

### 5.6 Testar Power App

#### **Passo 1: Teste Básico**
1. **Clicar** em "Preview" no Power Apps Studio
2. **Testar** navegação entre telas
3. **Verificar** se os controles estão funcionando

#### **Passo 2: Teste de Dados**
1. **Criar** nova requisição
2. **Verificar** se foi salva no SharePoint
3. **Testar** funcionalidades de aprovação

#### **Passo 3: Teste de Permissões**
1. **Fazer login** com usuário solicitante
2. **Verificar** acesso às funcionalidades
3. **Fazer login** com usuário aprovador
4. **Verificar** acesso às funcionalidades de aprovação

### 5.7 Publicar Power App

#### **Passo 1: Salvar App**
1. **Clicar** em "File" → "Save"
2. **Verificar** se não há erros

#### **Passo 2: Publicar**
1. **Clicar** em "File" → "Publish"
2. **Selecionar** ambiente de produção
3. **Clicar** "Publish"
4. **Verificar** se foi publicado com sucesso

#### **Passo 3: Compartilhar**
1. **Clicar** em "Share"
2. **Adicionar** usuários ou grupos
3. **Definir** permissões de acesso

## 📈 Fase 6: Implementação do Dashboard (ALTERNATIVAS AO POWER BI)

### ⚠️ **IMPORTANTE: Problemas de Performance do Power BI Web**

O Power BI web pode ter problemas de carregamento lento. Recomendamos usar uma das alternativas abaixo para melhor performance:

### **Opção 1: Dashboard em Power Apps (RECOMENDADO)**

#### **Passo 1: Criar Novo App para Dashboard**
1. **Acessar** Power Apps Studio: `https://make.powerapps.com`
2. **Clicar** em "Create" → "Blank app"
3. **Nomear**: `LicitaAI - Dashboard`
4. **Clicar** "Create"

#### **Passo 2: Conectar SharePoint**
1. **Clicar** em "View" → "Data sources"
2. **Adicionar** conexão SharePoint:
   - **Site**: `https://[empresa].sharepoint.com/sites/licitacoes`
   - **Listas**: `Requisições` e `Histórico`
3. **Clicar** "Connect"

#### **Passo 3: Implementar Tela Dashboard**
1. **Renomear** primeira tela para `Dashboard`
2. **Adicionar Container** para KPIs:
   - **Layout**: Horizontal
   - **Gap**: 16px
3. **Adicionar 4 Containers** para KPIs:
   - **Total Requisições**: `CountRows(Requisicoes)`
   - **Pendentes**: `CountRows(Filter(Requisicoes, Status = "Pendente"))`
   - **Aprovadas**: `CountRows(Filter(Requisicoes, Status = "Aprovado"))`
   - **Taxa Aprovação**: `Round(CountRows(Filter(Requisicoes, Status = "Aprovado")) / CountRows(Requisicoes) * 100, 1) & "%"`

#### **Passo 4: Adicionar Gráficos**
1. **Container para Gráficos**:
   - **Layout**: Horizontal
   - **Gap**: 16px
2. **Gráfico de Status**:
   - **Gallery** com `GroupBy(Requisicoes, 'Status', 'Count', CountRows(ThisRecord))`
   - **Template**: Labels para status e contagem
3. **Gráfico de Categoria**:
   - **Gallery** com `GroupBy(Requisicoes, 'Categoria', 'Count', CountRows(ThisRecord))`
   - **Template**: Labels para categoria e contagem

#### **Passo 5: Adicionar Tabela de Requisições**
1. **Container para Tabela**:
   - **Layout**: Vertical
2. **Gallery** para requisições:
   - **Data source**: `SortByColumns(Requisicoes, 'Data de Criação', SortOrder.Descending)`
   - **Template**: Labels para título, status, solicitante, data

#### **Passo 6: Personalizar Cores e Layout**
1. **Cores dos KPIs**:
   - **Total**: Azul (#2196F3)
   - **Pendentes**: Laranja (#FF9800)
   - **Aprovadas**: Verde (#4CAF50)
   - **Taxa**: Roxo (#9C27B0)
2. **Estilos dos containers**:
   - **Background**: Cores correspondentes com transparência
   - **Border**: 2px solid com cor principal
   - **Border-radius**: 8px
   - **Padding**: 20px

#### **Passo 7: Testar e Publicar**
1. **Clicar** em "Preview" para testar
2. **Verificar** se dados são carregados
3. **Salvar** e "Publish" o app

**Vantagens:**
- ✅ Carregamento instantâneo
- ✅ Integração nativa com SharePoint
- ✅ Sem problemas de performance web
- ✅ Atualização em tempo real

### **Opção 2: SharePoint Modern Lists com JSON Formatting**

#### **Passo 1: Criar Lista Dashboard**
1. **Acessar** site SharePoint: `https://[empresa].sharepoint.com/sites/licitacoes`
2. **Clicar** em "New" → "List"
3. **Selecionar** "Blank list"
4. **Nomear**: `Dashboard_Principal`
5. **Clicar** "Create"

#### **Passo 2: Adicionar Colunas Calculadas**
1. **Clicar** em "Settings" → "List settings"
2. **Criar colunas**:
   - **Total_Requisicoes**: `=CountRows(Requisicoes)`
   - **Pendentes**: `=CountRows(Filter(Requisicoes, Status = "Pendente"))`
   - **Aprovadas**: `=CountRows(Filter(Requisicoes, Status = "Aprovado"))`
   - **Taxa_Aprovacao**: `=Round(CountRows(Filter(Requisicoes, Status = "Aprovado")) / CountRows(Requisicoes) * 100, 1)`

#### **Passo 3: Aplicar JSON Formatting**
1. **Clicar** em "Settings" → "List settings"
2. **Clicar** em "Column formatting"
3. **Selecionar** coluna `Total_Requisicoes`
4. **Colar** JSON do arquivo `data/SharePoint_Dashboard_Formatting.json`
5. **Clicar** "Save"

#### **Passo 4: Criar View Personalizada**
1. **Clicar** em "Settings" → "List settings"
2. **Na seção "Views"**, clicar "Create view"
3. **Nomear**: `Dashboard`
4. **Selecionar** todas as colunas calculadas
5. **Clicar** "OK"

#### **Passo 5: Personalizar Layout**
1. **Editar** view criada
2. **Aplicar** JSON formatting na view
3. **Configurar** cores e estilos
4. **Testar** responsividade

**Vantagens:**
- ✅ Performance máxima (nativo do SharePoint)
- ✅ Sem dependências externas
- ✅ Responsivo em todos os dispositivos
- ✅ Atualização automática

### **Opção 3: SPFx Webpart com Chart.js**

#### **Passo 1: Preparar Ambiente de Desenvolvimento**
1. **Instalar** Node.js (versão 16 ou superior)
2. **Instalar** Yeoman: `npm install -g yo @microsoft/generator-sharepoint`
3. **Verificar** instalação: `yo --version`

#### **Passo 2: Criar Projeto SPFx**
1. **Abrir** terminal/prompt de comando
2. **Navegar** para pasta de projetos
3. **Executar**: `yo @microsoft/sharepoint`
4. **Preencher**:
   - **Solution name**: `licitai-dashboard`
   - **Target environment**: `SharePoint Online only`
   - **Framework**: `React`
   - **Web part name**: `Dashboard`
   - **Description**: `Dashboard para sistema Licita-AI`

#### **Passo 3: Instalar Dependências**
1. **Navegar** para pasta do projeto: `cd licitai-dashboard`
2. **Instalar** dependências: `npm install`
3. **Instalar** Chart.js: `npm install chart.js react-chartjs-2`

#### **Passo 4: Desenvolver Webpart**
1. **Abrir** projeto no VS Code
2. **Editar** arquivo `src/webparts/dashboard/DashboardWebPart.tsx`
3. **Implementar** lógica de dashboard
4. **Adicionar** gráficos com Chart.js

#### **Passo 5: Conectar SharePoint**
1. **Configurar** PnP para acessar listas
2. **Implementar** queries para dados
3. **Configurar** autenticação

#### **Passo 6: Build e Deploy**
1. **Build** do projeto: `gulp build`
2. **Bundle** do projeto: `gulp bundle --ship`
3. **Package** do projeto: `gulp package-solution --ship`
4. **Deploy** no SharePoint

**Vantagens:**
- ✅ Controle total sobre UI/UX
- ✅ Gráficos interativos
- ✅ Performance otimizada
- ✅ Customização avançada

### **Opção 4: Azure Functions + API REST + Frontend Leve**

#### **Passo 1: Desenvolver API REST**
1. **No Azure Portal**, acessar Function App criada
2. **Criar** nova função HTTP trigger
3. **Implementar** endpoints para:
   - `GET /api/dashboard/kpis`
   - `GET /api/dashboard/status`
   - `GET /api/dashboard/categorias`
   - `GET /api/dashboard/requisicoes`

#### **Passo 2: Implementar Cache Redis**
1. **Criar** Azure Redis Cache
2. **Configurar** variáveis de ambiente
3. **Implementar** lógica de cache na API

#### **Passo 3: Criar Frontend HTML/CSS/JS**
1. **Criar** arquivo `index.html`
2. **Implementar** dashboard responsivo
3. **Adicionar** Chart.js para gráficos
4. **Implementar** chamadas para API

#### **Passo 4: Deploy Frontend**
1. **Publicar** em Azure Static Web Apps
2. **Configurar** autenticação
3. **Configurar** CORS na API

**Vantagens:**
- ✅ Performance máxima com cache
- ✅ Escalabilidade Azure
- ✅ Flexibilidade total
- ✅ Controle de performance

## 🔐 Fase 7: Configuração de Segurança e Permissões

### 7.1 Row-Level Security (RLS)
```dax
// No Power BI, configurar RLS (se usar Power BI):
[Email] = USERNAME() // Para solicitantes
[IsApprover] = TRUE // Para aprovadores
```

### 7.2 Grupos de Usuários SharePoint
```powershell
# Script para configurar grupos e permissões
# Executar após criação das listas
```

### 7.3 Configuração de Aprovadores
```json
// Lista de aprovadores no Power Automate
{
  "aprovadores": [
    "gerente1@empresa.com",
    "gerente2@empresa.com",
    "diretor@empresa.com"
  ]
}
```

## 🧪 Fase 8: Testes e Validação

### 8.1 Testes Unitários
1. **Testar criação de requisição**
2. **Testar fluxo de aprovação**
3. **Testar integração OpenAI**
4. **Testar Azure Functions**

### 8.2 Testes de Integração
1. **Testar fluxo completo end-to-end**
2. **Testar notificações por email**
3. **Testar permissões de usuário**
4. **Testar dashboard escolhido**

### 8.3 Testes de Performance
1. **Testar com múltiplas requisições**
2. **Testar tempo de resposta**
3. **Testar limites de API**
4. **Testar performance do dashboard**

## 📚 Fase 9: Documentação e Treinamento

### 9.1 Documentação Técnica
1. **Atualizar README.md**
2. **Criar guias de usuário**
3. **Documentar procedimentos de manutenção**

### 9.2 Treinamento de Usuários
1. **Criar apresentação de treinamento**
2. **Conduzir sessões de treinamento**
3. **Criar vídeos tutoriais**

## 🚀 Fase 10: Deploy em Produção

### 10.1 Checklist de Produção
- [ ] Todas as listas SharePoint criadas
- [ ] Todos os fluxos Power Automate funcionando
- [ ] Azure Functions deployadas e testadas
- [ ] Power App publicado e testado
- [ ] Dashboard escolhido funcionando
- [ ] Integração OpenAI testada
- [ ] Permissões configuradas
- [ ] Usuários treinados

### 10.2 Monitoramento
1. **Configurar alertas de erro**
2. **Configurar métricas de uso**
3. **Configurar backup automático**

## 🔧 Troubleshooting Comum

### Problemas de Conexão SharePoint
```bash
# Verificar permissões
# Verificar configuração de site
# Verificar conectores Power Automate
```

### Problemas de Azure Functions
```bash
# Verificar logs no Application Insights
# Verificar variáveis de ambiente
# Verificar permissões Microsoft Graph
```

### Problemas de Power App
```bash
# Verificar conexões SharePoint
# Verificar fórmulas Power Fx
# Verificar permissões de usuário
```

### Problemas de Performance do Dashboard
```bash
# Se usar Power BI: Verificar tamanho dos dados
# Se usar Power Apps: Verificar conexões SharePoint
# Se usar SharePoint: Verificar JSON formatting
# Se usar SPFx: Verificar bundle size
```

## 📞 Suporte e Manutenção

### Contatos de Suporte
- **Administrador SharePoint**: admin@empresa.com
- **Desenvolvedor Backend**: dev@empresa.com
- **Suporte Power Platform**: power@empresa.com

### Procedimentos de Manutenção
1. **Backup diário das listas**
2. **Monitoramento de fluxos**
3. **Atualizações de segurança**
4. **Otimizações de performance**

## 🎯 **RECOMENDAÇÃO FINAL PARA DASHBOARD**

### **Para Melhor Performance, Use:**
1. **🥇 Power Apps Dashboard** - Melhor equilíbrio performance/funcionalidade
2. **🥈 SharePoint Modern Lists** - Performance máxima, funcionalidade básica
3. **🥉 SPFx + Chart.js** - Performance alta, customização total
4. **❌ Power BI Web** - Problemas de performance conhecidos

---

**Este guia deve ser seguido sequencialmente para garantir uma implementação bem-sucedida do sistema Licita-AI.**
