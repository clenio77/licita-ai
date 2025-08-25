// Exemplo de componente React para formulário de nova requisição (SPFx)
// Formulário de nova requisição (SPFx/React)
// Exibe feedback visual após envio e validação customizada dos campos obrigatórios
import * as React from 'react';

export default function FormNovaRequisicao({ onSubmit }) {
  const [titulo, setTitulo] = React.useState('');
  const [descricao, setDescricao] = React.useState('');
  const [dataAbertura, setDataAbertura] = React.useState('');
  const [sucesso, setSucesso] = React.useState(false);
  const [erro, setErro] = React.useState('');

  // Validação customizada dos campos obrigatórios
  function validarCampos() {
    if (!titulo) return 'Título é obrigatório.';
    if (!descricao) return 'Descrição é obrigatória.';
    if (!dataAbertura) return 'Data de abertura é obrigatória.';
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setErro(erroValidacao);
      setSucesso(false);
      return;
    }
    try {
      onSubmit({ titulo, descricao, dataAbertura });
      setSucesso(true);
      setErro('');
      setTitulo('');
      setDescricao('');
      setDataAbertura('');
    } catch (e) {
      setErro('Erro ao enviar requisição.');
      setSucesso(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Título da Licitação:
        <input value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </label>
      <label>Descrição:
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required />
      </label>
      <label>Data de Abertura:
        <input type="date" value={dataAbertura} onChange={e => setDataAbertura(e.target.value)} required />
      </label>
      <button type="submit">Enviar</button>
      {erro && <div style={{ color: 'red' }}>{erro}</div>}
      {sucesso && <div style={{ color: 'green' }}>Requisição enviada com sucesso!</div>}
    </form>
  );
}
