# Frontend - Guia de Uso e Integração

## Componentes SPFx/React

### FormNovaRequisicao.js
- Formulário para criar nova requisição.
- Exibe mensagens de erro e sucesso.
- Valida campos obrigatórios.
- Uso:
```jsx
<FormNovaRequisicao onSubmit={handleNovaRequisicao} />
```

### useRequisicoes.js
- Hook para buscar requisições do SharePoint.
- Retorna `{ requisicoes, loading, erro }`.
- Uso:
```jsx
const { requisicoes, loading, erro } = useRequisicoes();
```

## Power Apps

### powerfx_aprovador.txt
- Fórmula Power Fx para controle de acesso no botão Aprovar:
```
If(
	User().Email = ThisItem.Aprovador.Email,
	DisplayMode.Edit,
	DisplayMode.Disabled
)
```
- Aplicar no campo `DisplayMode` do botão Aprovar.

## Observações
- Todos os artefatos devem ser versionados em `/frontend`.
- Consulte a documentação do projeto para integração completa.
