const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Ativar Middleware para permitir requisições de outros domínios (CORS)
app.use(cors());

// Middleware para servir os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Rota para servir o index.html do React
app.get('./frontend', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Middleware para permitir que o Express leia os dados do corpo da requisição
app.use(bodyParser.json());

// Rota para receber os dados do formulário de contato
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  // Aqui você pode salvar os dados ou enviar um e-mail, por exemplo.
  console.log(`Recebido contato de ${name} (${email}): ${message}`);

  return res.status(200).json({ success: true, message: 'Mensagem recebida com sucesso!' });
});

// Inicia o servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor rodando em http://localhost:5000');
});



