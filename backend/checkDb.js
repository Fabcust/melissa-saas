const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI; // URL de conexão do MongoDB

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    mongoose.connection.close(); // Fecha a conexão após o teste
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    process.exit(1); // Indica erro
  });