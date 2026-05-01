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
  const { id, event_type } = req.body;

  try {
    const paymentDetails = await mercadopago.payment.get(id);

    if (event_type === 'payment.created' || event