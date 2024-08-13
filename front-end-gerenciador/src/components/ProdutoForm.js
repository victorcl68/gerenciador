import React, { useState } from 'react';
import api from '../services/api';

const ProdutoForm = () => {
    const [produto, setProduto] = useState({ desc_prod: '', val_prod: 0 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.createProduto(produto);
        alert('Produto cadastrado com sucesso!');
        setProduto({ desc_prod: '', val_prod: 0 });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Produto</h2>
            <div>
                <label>Descrição:</label>
                <input type="text" value={produto.desc_prod} onChange={(e) => setProduto({ ...produto, desc_prod: e.target.value })} />
            </div>
            <div>
                <label>Valor:</label>
                <input type="number" value={produto.val_prod} onChange={(e) => setProduto({ ...produto, val_prod: parseFloat(e.target.value) })} />
            </div>
            <button type="submit">Salvar</button>
        </form>
    );
};

export default ProdutoForm;
