const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log('Usuário encontrado:', user); // Log para verificar
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Senha do usuário:', user.password); // Log para verificação
    console.log('Comparação da senha:', { enteredPassword: password, dbPassword: user.password, isMatch });
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token gerado:', token);
    res.status(200).json({ token, credits: user.credits });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/test-login', async (req, res) => {
  // Usar administrador
  const adminUser = await User.findOne({ email: 'admin@example.com' });
  if (!adminUser) return res.status(404).json({ message: 'Usuário Admin não encontrado' });
  // Gera o token se o usuário existir
  const token = jwt.sign({ id: adminUser._id, email: adminUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
});

router.get('/activities', async (req, res) => {
  //... Código existente para obter atividades
});

module.exports = router;