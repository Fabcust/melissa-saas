const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS tem que vir ANTES das rotas e do express.json
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://192.168.0.15:5173',
    'https://melissa-saas.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB - Railway injeta as variáveis direto
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Erro MongoDB:', err));

// Routes
const creditRoutes = require('./routes/credit');
const userRoutes = require('./routes/user');

app.use('/api/credits', creditRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Melissa API rodando' });
});

// IMPORTANTE: '0.0.0.0' pra Railway funcionar
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
