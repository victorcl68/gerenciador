require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql5725386', 'sql5725386', process.env.DB_SENHA, {
    host: 'sql5.freemysqlhosting.net',
    dialect: 'mysql',
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco de dados MySQL com Sequelize');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

module.exports = sequelize;
