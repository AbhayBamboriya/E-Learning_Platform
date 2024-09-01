// // models/index.js
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// // Initialize Sequelize instance
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql',
//   logging: false, // Set to true to enable SQL query logging
// });

// // Test the connection
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// // Export the Sequelize instance
// module.exports = sequelize;
