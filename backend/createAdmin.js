const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Ajuste para o caminho correto

dotenv.config({ path: `${__dirname}/.env` });

const createAdminUser = async () => {
  const adminUser = new User({
    email: 'admin@example.com',
    password: 'password123', // Altere para uma senha segura
    credits: 0,
  });

  await adminUser.save();
  console.log('Usuário administrador criado com sucesso.');
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await createAdminUser();
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  });