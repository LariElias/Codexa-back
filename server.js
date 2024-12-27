require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const leadsRoutes = require('./src/routes/leads');

const app = express();
app.use(bodyParser.json()); // Permite receber JSON no body

// Rotas
app.use('/api', leadsRoutes);

// Configuração do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
