require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/user');
const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_aqui'; // Substitua por um segredo seguro

const authRoutes = require('./routes/auth');
const sequelize = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoutes);

// Login do Usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Rota Protegida
app.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: 'Acesso permitido', user: decoded });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
});

// Renovar Token
app.post('/refresh-token', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const newToken = jwt.sign({ email: decoded.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: newToken });
    } catch (err) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
});

app.listen(PORT, async () => {
    await sequelize.sync();
    console.log(`Servidor rodando na porta ${PORT}`);
});
