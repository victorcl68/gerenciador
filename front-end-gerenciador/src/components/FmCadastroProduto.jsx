import React, { useState } from 'react';

const FmCadastroProduto = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [codPro, setCodPro] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleNovoClick = () => {
    console.log('Novo produto');
    setDescricao('');
    setCodPro('');
    setValor('');
    setIsEditing(true);
  };

  const handleCancelarClick = () => {
    console.log('Cancelamento da ação');
    setIsEditing(false);
  };

  const handleSalvarClick = () => {
    console.log('Produto salvo');
    setIsEditing(false);
  };

  const handleAlterarClick = () => {
    if (!codPro) {
      console.log('Selecione um produto válido!');
    } else {
      console.log('Alterando produto');
      setIsEditing(true);
    }
  };

  const handleExcluirClick = () => {
    console.log('Produto excluído');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Produto</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Código:</label>
        <input
          type="text"
          value={codPro}
          onChange={(e) => setCodPro(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Descrição:</label>
        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Valor:</label>
        <input
          type="text"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleNovoClick} disabled={isEditing}>Novo</button>
        <button onClick={handleCancelarClick} disabled={!isEditing}>Cancelar</button>
        <button onClick={handleSalvarClick} disabled={!isEditing}>Salvar</button>
        <button onClick={handleAlterarClick} disabled={isEditing}>Alterar</button>
        <button onClick={handleExcluirClick} disabled={isEditing}>Excluir</button>
      </div>
    </div>
  );
};

export default FmCadastroProduto;
