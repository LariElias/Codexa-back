const express = require('express');
const { appendToSheet } = require('../services/googleSheets');
const router = express.Router();

const getFormattedDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Adiciona zero à esquerda
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; // Formato dia/mês/ano
};
  

router.post('/leads', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' });
  }

  try {
    await appendToSheet([name, email, phone, getFormattedDate()]);
    res.status(201).json({ message: 'Lead capturado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar o lead.' });
  }
});

module.exports = router;
