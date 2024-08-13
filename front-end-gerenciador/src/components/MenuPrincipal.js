import React, { useState, useEffect } from 'react';
import ProdutoForm from './ProdutoForm';
import CompraForm from './CompraForm';
import VenderForm from './VenderForm';
import OutrasSaidasForm from './OutrasSaidasForm';
import OutrasEntradasForm from './OutrasEntradasForm';
import RecurcosForm from './RecurcosForm';
import UsuariosForm from './UsuariosForm';
import SaldoCaixaForm from './SaldoCaixaForm';
import NotasCompraForm from './NotasCompraForm';
import NotasVendaForm from './NotasVendaForm';
import RelatoriosForm from './RelatoriosForm';
import api from '../services/api';

const MenuPrincipal = () => {
    const [portas, setPortas] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchPortas = async () => {
            const result = await api.getSerialPorts();
            setPortas(result);
        };
        fetchPortas();

        const fetchUser = async () => {
            const userInfo = await api.getUser();
            setUser(userInfo);
        };
        fetchUser();
    }, []);

    return (
        <div>
            <h1>Menu Principal</h1>
            <p>Operador: {user && user.nome_usuario}</p>
            <nav>
                <ul>
                    {user && user.tb_tipoUsuario.id_tipoUsuario === 2 && (
                        <>
                            <li><button onClick={() => setComponent(<ProdutoForm />)}>Cadastro de Produto</button></li>
                            <li><button onClick={() => setComponent(<CompraForm />)}>Comprar</button></li>
                            <li><button onClick={() => setComponent(<VenderForm />)}>Vender</button></li>
                            <li><button onClick={() => setComponent(<OutrasSaidasForm />)}>Outras Saídas</button></li>
                            <li><button onClick={() => setComponent(<OutrasEntradasForm />)}>Outras Entradas</button></li>
                            <li><button onClick={() => setComponent(<RecurcosForm />)}>Adicionar Recursos</button></li>
                            <li><button onClick={() => setComponent(<UsuariosForm />)}>Usuários</button></li>
                            <li><button onClick={() => setComponent(<SaldoCaixaForm />)}>Saldo de Caixa</button></li>
                            <li><button onClick={() => setComponent(<NotasCompraForm />)}>Notas de Compra</button></li>
                            <li><button onClick={() => setComponent(<NotasVendaForm />)}>Notas de Venda</button></li>
                            <li><button onClick={() => setComponent(<RelatoriosForm />)}>Relatórios</button></li>
                        </>
                    )}
                </ul>
            </nav>
            <div>
                {component}
            </div>
        </div>
    );
};

export default MenuPrincipal;
