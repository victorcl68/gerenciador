import React, { useState, useEffect } from 'react';

const FmLogin = ({ onLogin }) => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [logar, setLogar] = useState(false);

  const clicar = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLogar(true);
          onLogin(data.usuario); // Use this to pass the logged-in user to the parent component or context
        } else {
          alert('Usuario ou senha invalido');
        }
      } else {
        alert('Erro ao tentar se conectar ao servidor');
      }
    } catch (error) {
      alert('String de conexão: User inexistente', 'Erro');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      clicar();
    }
  };

  useEffect(() => {
    // Equivalent to fm_login_Load
    const lerConfiguracao = async () => {
      // Simulate reading configuration
      console.log('Ler configuração');
    };

    const lerCabecario = async () => {
      // Simulate reading header
      console.log('Ler cabeçário');
    };

    lerConfiguracao();
    lerCabecario();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div>
        <button onClick={clicar}>Login</button>
        <button onClick={() => window.close()}>Cancelar</button>
      </div>
    </div>
  );
};

export default FmLogin;
