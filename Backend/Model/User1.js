// // models/User.js
// // const { DataTypes } = require('sequelize');
// import DataTypes from 'sequelize'
// import sequelize from '../config/db';
// // const sequelize = require('./index');


// // Define User model
// const User = sequelize.define('User', {
//   user_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   username: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     unique: true,
//     allowNull: false
//   },
//   password_hash: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   first_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   last_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   date_of_birth: {
//     type: DataTypes.DATEONLY
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   updated_at: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   status: {
//     type: DataTypes.ENUM('active', 'inactive', 'banned'),
//     defaultValue: 'active'
//   }
// }, {
//   tableName: 'Users',
//   timestamps: false, // Disable automatic timestamps
// });

// module.exports = User;
