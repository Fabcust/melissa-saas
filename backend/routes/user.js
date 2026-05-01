const express = require('express');
console.log('>>> USER.JS CARREGADO <<<');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// GET /api/users/teste - ROTA DE TESTE
router.get('/teste', (req, res) => {
    console.log('>>> ROTA /api/users/teste CHAMADA <<<');
    res.json({ msg: 'user.js funcionando', timestamp: new Date() });
});

// POST /api/users/register
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('>>> REGISTER CHAMADO:', email);

        if (!email || !password) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            credits: 0
        });

        res.status(201).json({ message: 'Usuário criado', userId: user._id });
    } catch (err) {
        console.log('ERRO NO REGISTER:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('>>> LOGIN CHAMADO:', email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('USUÁRIO NÃO ENCONTRADO:', email);
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            console.log('SENHA INVÁLIDA PARA:', email);
            return res.status(400).json({ error: 'Senha inválida' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        console.log('LOGIN OK:', email);
        res.json({ token, credits: user.credits });
    } catch (err) {
        console.log('ERRO NO LOGIN:', err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
