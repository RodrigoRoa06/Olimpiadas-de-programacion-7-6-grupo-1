require('dotenv').config({ path: './.env' });
const { Sequelize } = require('sequelize');

// Crear la instancia de Sequelize con la configuración desde .env
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',  // Especifica que el dialecto es MySQL
    logging: false     // Desactiva el logging de Sequelize (opcional)
});

// Exportar la instancia de Sequelize para usarla en otros módulos



sequelize.authenticate()
  .then(() => {
    console.log('Conexión realizada con éxito.');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
module.exports = sequelize;
