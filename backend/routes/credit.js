const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;
    
    try {
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Valor inválido' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        user.credits += amount;
        await user.save();
        res.json({ message: 'Créditos adicionados', credits: user.credits });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/use', authMiddleware, async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;
    
    try {
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Valor inválido' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        if (user.credits < amount) {
            return res.status(400).json({ error: 'Créditos insuficientes' });
        }

        user.credits -= amount;
        await user.save();
        res.json({ message: 'Créditos usados', credits: user.credits });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
