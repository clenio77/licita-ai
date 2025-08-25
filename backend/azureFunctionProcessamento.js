const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

module.exports = async function (context, req) {
  context.log('Azure Function: Processamento de Requisição iniciado');
  
  try {
    // Validar request
    if (!req.body || !req.body.requisicaoId) {
      context.res = {
        status: 400,
        body: { error: 'ID da requisição é obrigatório' }
      };
      return;
    }

    const { requisicaoId, action, userId, comentario } = req.body;
    
    // Configurar cliente Microsoft Graph
    const graphClient = Client.init({
      authProvider: (done) => {
        done(null, process.env.MICROSOFT_GRAPH_TOKEN);
      }
    });

    // Buscar dados da requisição
    const requisicao = await getRequisicao(graphClient, requisicaoId);
    if (!requisicao) {
      context.res = {
        status: 404,
        body: { error: 'Requisição não encontrada' }
      };
      return;
    }

    // Processar ação baseada no tipo
    let resultado;
    switch (action) {
      case 'aprovar':
        resultado = await aprovarRequisicao(graphClient, requisicaoId, userId, comentario);
        break;
      case 'reprovar':
        resultado = await reprovarRequisicao(graphClient, requisicaoId, userId, comentario);
        break;
      case 'enviar_aprovacao':
        resultado = await enviarParaAprovacao(graphClient, requisicaoId, userId);
        break;
      default:
        context.res = {
          status: 400,
          body: { error: 'Ação não reconhecida' }
        };
        return;
    }

    // Registrar no histórico
    await registrarHistorico(graphClient, requisicaoId, action, userId, comentario);

    // Retornar sucesso
    context.res = {
      status: 200,
      body: {
        message: 'Ação processada com sucesso',
        requisicaoId: requisicaoId,
        action: action,
        resultado: resultado
      }
    };

  } catch (error) {
    context.log.error('Erro na Azure Function:', error);
    context.res = {
      status: 500,
      body: { error: 'Erro interno do servidor', details: error.message }
    };
  }
};

// Funções auxiliares
async function getRequisicao(graphClient, requisicaoId) {
  try {
    const response = await graphClient
      .api(`/sites/{site-id}/lists/Requisições/items/${requisicaoId}`)
      .get();
    return response;
  } catch (error) {
    throw new Error(`Erro ao buscar requisição: ${error.message}`);
  }
}

async function aprovarRequisicao(graphClient, requisicaoId, userId, comentario) {
  try {
    const response = await graphClient
      .api(`/sites/{site-id}/lists/Requisições/items/${requisicaoId}/fields`)
      .patch({
        Status: 'Aprovado',
        'Data de Modificação': new Date().toISOString()
      });
    
    // Enviar notificação por email
    await enviarNotificacaoAprovacao(graphClient, requisicaoId, userId);
    
    return { status: 'Aprovado', timestamp: new Date().toISOString() };
  } catch (error) {
    throw new Error(`Erro ao aprovar requisição: ${error.message}`);
  }
}

async function reprovarRequisicao(graphClient, requisicaoId, userId, comentario) {
  try {
    const response = await graphClient
      .api(`/sites/{site-id}/lists/Requisições/items/${requisicaoId}/fields`)
      .patch({
        Status: 'Reprovado',
        'Data de Modificação': new Date().toISOString()
      });
    
    // Enviar notificação por email
    await enviarNotificacaoReprovacao(graphClient, requisicaoId, userId, comentario);
    
    return { status: 'Reprovado', timestamp: new Date().toISOString() };
  } catch (error) {
    throw new Error(`Erro ao reprovar requisição: ${error.message}`);
  }
}

async function enviarParaAprovacao(graphClient, requisicaoId, userId) {
  try {
    const response = await graphClient
      .api(`/sites/{site-id}/lists/Requisições/items/${requisicaoId}/fields`)
      .patch({
        Status: 'Em Análise',
        'Data de Modificação': new Date().toISOString()
      });
    
    return { status: 'Em Análise', timestamp: new Date().toISOString() };
  } catch (error) {
    throw new Error(`Erro ao enviar para aprovação: ${error.message}`);
  }
}

async function registrarHistorico(graphClient, requisicaoId, action, userId, comentario) {
  try {
    const historicoItem = {
      Requisição: requisicaoId,
      Ação: action,
      Data: new Date().toISOString(),
      Usuário: userId,
      Comentário: comentario || ''
    };

    await graphClient
      .api('/sites/{site-id}/lists/Histórico/items')
      .post(historicoItem);
      
  } catch (error) {
    context.log.warn(`Erro ao registrar histórico: ${error.message}`);
  }
}

async function enviarNotificacaoAprovacao(graphClient, requisicaoId, userId) {
  // Implementar envio de email via Microsoft Graph
  // Esta é uma implementação básica - pode ser expandida
}

async function enviarNotificacaoReprovacao(graphClient, requisicaoId, userId, comentario) {
  // Implementar envio de email via Microsoft Graph
  // Esta é uma implementação básica - pode ser expandida
}
