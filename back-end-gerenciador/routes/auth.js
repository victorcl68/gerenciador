const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    try {
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'Usuário registrado com sucesso', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
});

module.exports = router;
