// backend/server.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();

// Middlewares
app.use(express.json());
app.use(cors());  // Permitir solicitudes desde diferentes dominios

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar servidor

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en pueto ${PORT}`);
});
