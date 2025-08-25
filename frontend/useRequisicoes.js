// Exemplo de hook para buscar requisições do SharePoint (SPFx)
// Hook para buscar requisições do SharePoint (SPFx)
// Inclui loading, tratamento de erro e comentários explicativos
import { useEffect, useState } from 'react';

export function useRequisicoes() {
  const [requisicoes, setRequisicoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    setLoading(true);
    setErro('');
    fetch("/_api/web/lists/getbytitle('Requisicoes')/items")
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar requisições');
        return res.json();
      })
      .then(data => setRequisicoes(data.value || []))
      .catch(e => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { requisicoes, loading, erro };
}
