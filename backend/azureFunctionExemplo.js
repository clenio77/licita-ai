module.exports = async function (context, req) {
  context.log('Processando requisicao de licitacao...');
  // ... lógica customizada ...
  context.res = {
    status: 200,
    body: { mensagem: 'Processado com sucesso!' }
  };
};
