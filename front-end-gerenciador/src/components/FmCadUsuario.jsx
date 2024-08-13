import React, { useState, useEffect } from 'react';

const FmCadUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [usuarioCorrente, setUsuarioCorrente] = useState(null);
  const [tipoCorrente, setTipoCorrente] = useState(null);

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    console.log('Component loaded');
    // Simulate fetching data from a database
    setTipos(['Admin', 'User']);
    setUsuarios([{ id: 1, nome: 'Usuario1', senha: '123', tipo: 'Admin' }]);
  }, []);

  const clik = () => {
    if (usuarioCorrente) {
      setNome(usuarioCorrente.nome);
      setSenha(usuarioCorrente.senha);
      setConfSenha('');
      setTipo(usuarioCorrente.tipo);
    }
  };

  const handleNovoClick = () => {
    console.log('Novo usuario');
    setNome('');
    setSenha('');
    setConfSenha('');
    setTipo('');
    setUsuarioCorrente(null);
  };

  const handleCancelarClick = () => {
    console.log('Cancelamento da ação');
    clik();
  };

  const handleSalvarClick = () => {
    if (!nome || !senha || !confSenha || !tipo) {
      console.log('Todos os campos são obrigatórios');
      return;
    }

    if (senha !== confSenha) {
      console.log('Senhas diferentes, verifique!');
      return;
    }

    if (!usuarioCorrente) {
      if (usuarios.some((u) => u.nome === nome)) {
        console.log(`Usuario ${nome} já existe, tente novamente!`);
        return;
      }

      const novoUsuario = { id: usuarios.length + 1, nome, senha, tipo };
      setUsuarios([...usuarios, novoUsuario]);
      console.log('Usuario cadastrado com sucesso!');
    } else {
      const updatedUsuarios = usuarios.map((u) =>
        u.id === usuarioCorrente.id ? { ...u, nome, senha, tipo } : u
      );
      setUsuarios(updatedUsuarios);
      console.log('Usuario alterado com sucesso!');
    }

    handleCancelarClick();
  };

  const handleAlterarClick = (usuario) => {
    console.log('Alterando usuario');
    setUsuarioCorrente(usuario);
    clik();
  };

  const handleExcluirClick = (id) => {
    console.log('Usuario excluído');
    setUsuarios(usuarios.filter((u) => u.id !== id));
    setUsuarioCorrente(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cadastro de Usuario</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Confirme a Senha:</label>
        <input
          type="password"
          value={confSenha}
          onChange={(e) => setConfSenha(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Tipo:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Selecione</option>
          {tipos.map((t, index) => (
            <option key={index} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleNovoClick}>Novo</button>
        <button onClick={handleCancelarClick}>Cancelar</button>
        <button onClick={handleSalvarClick}>Salvar</button>
      </div>
      <div>
        <h2>Lista de Usuários</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nome}</td>
                <td>{u.tipo}</td>
                <td>
                  <button onClick={() => handleAlterarClick(u)}>Alterar</button>
                  <button onClick={() => handleExcluirClick(u.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FmCadUsuario;
