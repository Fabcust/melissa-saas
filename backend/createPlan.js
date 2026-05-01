const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Função para criar o plano
const createPlan = async () => {
  try {
    const planData = {
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: 100,
        currency_id: 'BRL',
        start_date: new Date(),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        trial_period: 7,
      },
      back_url: 'https://captivity-lived-headsman.ngrok-free.dev',
      reason: 'Assinatura do Plano Pro',
    };

    const response = await axios.post('https://api.mercadopago.com/preapproval_plan', planData, {
      headers: {
        Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`
      }
    });

    console.log('Plano criado com sucesso:', response.data);
    console.log('ID do plano:', response.data.id); // Salvar o plan_id para referência futura
  } catch (error) {
    console.error('Erro ao criar plano:', error.response ? error.response.data : error.message);
  }
};

createPlan();