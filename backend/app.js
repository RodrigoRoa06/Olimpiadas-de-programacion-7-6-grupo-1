require('dotenv').config({ path: '../dependencias.env' });
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./config/passport'); 

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Inicio');
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
