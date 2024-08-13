import axios from 'axios';

const api = {
    getSerialPorts: async () => {
        // Simulação de chamada à API
        return ['COM1', 'COM2', 'COM3'];
    },
    getUser: async () => {
        // Simulação de chamada à API
        return { nome_usuario: 'Operador', tb_tipoUsuario: { id_tipoUsuario: 2 } };
    },
    createProduto: async (produto) => {
        // Simulação de chamada à API
        console.log('Produto criado:', produto);
    }
};

export default api;
