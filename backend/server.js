require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const compression = require('compression');

const app = express();

// Middleware de compressão deve vir primeiro
app.use(compression());

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Inicializa Firebase
const serviceAccount = require('./firebase-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Rota para armazenar contato no Firebase
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  try {
    await db.collection('contacts').add({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: 'Mensagem armazenada com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Erro ao salvar no banco de dados.' });
  }
});

// Inicia o servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
