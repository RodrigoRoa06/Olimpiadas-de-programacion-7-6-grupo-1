require('dotenv').config({ path: '../dependencias.env' });
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('./config/passport');  // Configuración de Passport

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());  // Permitir solicitudes desde diferentes dominios
app.use(session({
  secret: process.env.JWT_SECRET, // Clave secreta para la sesión
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Inicio');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
