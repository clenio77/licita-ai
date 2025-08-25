// Azure Function exemplo para integração com Power Automate
module.exports = async function (context, req) {
  context.log('Processando integração externa...');
  // Exemplo: lógica customizada
  context.res = {
    status: 200,
    body: { mensagem: 'Processado com sucesso!' }
  };
};
