const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mercadopago = require('mercadopago');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('MONGO_URI:', process.env.MONGO_URI);

// CORS deve vir ANTES de tudo
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.0.15:5173', 'https://captivity-lived-headsman.ngrok-free.dev'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log('Erro MongoDB:', err));

// Rotas do Aplicativo
const creditRoutes = require('./routes/credit');
const userRoutes = require('./routes/user');

app.use('/api/credits', creditRoutes);
app.use('/api/users', userRoutes);

// Webhook para atualizações do Mercado Pago
app.post('/webhook', async (req, res) => {
 const { id, type } = req.body;
 console.log('Webhook recebido:', type, id);

 try {
  if (type === 'payment' || type === 'subscription_preapproval') {
 // Aqui você busca os detalhes no Mercado Pago e atualiza o User
 console.log('Processando pagamento...');
 }
 return res.status(200).send('OK');
 } catch (error) {
 console.error('Erro no Webhook:', error);
 return res.status(500).send('Erro Interno');
 }
});

app.listen(PORT, () => {
 console.log(`Servidor rodando na porta ${PORT}`);
});