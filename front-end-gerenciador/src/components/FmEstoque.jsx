import React, { useState, useEffect } from 'react';

const FmEstoque = () => {
  const [produtos, setProdutos] = useState([]);
  const [produtoCorrente, setProdutoCorrente] = useState(null);
  const [novoSaldo, setNovoSaldo] = useState('');
  const [codProd, setCodProd] = useState('');
  const [desc, setDesc] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    // Simular a obtenção de dados de uma fonte de dados
    const produtosData = [
      { id_prod: 1, desc_prod: 'Produto 1', saldo: 10 },
      { id_prod: 2, desc_prod: 'Produto 2', saldo: 20 },
    ];
    setProdutos(produtosData);
    setIsEditing(false);
    setNovoSaldo('');
    setCodProd('');
    setDesc('');
  };

  const calcularSaldo = (id) => {
    // Simular cálculo de saldo
    const totalC = 100; // Total de entrada
    const totalV = 50; // Total de saída
    return totalC - totalV;
  };

  const corrigirSaldo = () => {
    setIsEditing(true);
  };

  const confirmarSaldo = () => {
    const saldoAtual = produtoCorrente.saldo;
    const novoSaldoDecimal = parseFloat(novoSaldo);

    if (saldoAtual > novoSaldoDecimal) {
      const saida = saldoAtual - novoSaldoDecimal;
      if (window.confirm(`Para alterar: ${produtoCorrente.desc_prod} de: ${saldoAtual} Kg, para: ${novoSaldoDecimal} Kg, é necessário saída de: ${saida} Kg, deseja continuar?`)) {
        console.log(`Saída confirmada: ${saida} Kg`);
      }
    } else if (saldoAtual < novoSaldoDecimal) {
      const entrada = novoSaldoDecimal - saldoAtual;
      if (window.confirm(`Para alterar: ${produtoCorrente.desc_prod} de: ${saldoAtual} para: ${novoSaldoDecimal} é necessário entrada de: ${entrada} Kg, deseja continuar?`)) {
        console.log(`Entrada confirmada: ${entrada} Kg`);
      }
    }

    load();
  };

  const handleProdutoClick = (produto) => {
    setProdutoCorrente(produto);
    setNovoSaldo('');
  };

  const handleCodProdChange = (e) => {
    const value = e.target.value;
    setCodProd(value);
    if (value === '') {
      setProdutos([
        { id_prod: 1, desc_prod: 'Produto 1', saldo: 10 },
        { id_prod: 2, desc_prod: 'Produto 2', saldo: 20 },
      ]);
    } else {
      const filtered = produtos.filter(p => p.id_prod === parseInt(value, 10));
      setProdutos(filtered);
    }
  };

  const handleDescChange = (e) => {
    const value = e.target.value;
    setDesc(value);
    const filtered = produtos.filter(p => p.desc_prod.startsWith(value));
    setProdutos(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Estoque</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Descrição:</label>
        <input
          type="text"
          value={desc}
          onChange={handleDescChange}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Código do Produto:</label>
        <input
          type="text"
          value={codProd}
          onChange={handleCodProdChange}
        />
      </div>
      {isEditing && (
        <div style={{ marginBottom: '10px' }}>
          <label>Novo Saldo:</label>
          <input
            type="text"
            value={novoSaldo}
            onChange={(e) => setNovoSaldo(e.target.value)}
          />
        </div>
      )}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={corrigirSaldo} disabled={isEditing}>Corrigir Saldo</button>
        {isEditing && (
          <>
            <button onClick={confirmarSaldo}>Confirmar</button>
            <button onClick={load}>Cancelar</button>
          </>
        )}
      </div>
      <div>
        <h2>Lista de Produtos</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Saldo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_prod}>
                <td>{produto.id_prod}</td>
                <td>{produto.desc_prod}</td>
                <td>{calcularSaldo(produto.id_prod)}</td>
                <td>
                  <button onClick={() => handleProdutoClick(produto)}>Selecionar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FmEstoque;
