// // models/User.js
import mysql from 'mysql';
import bcrypt from 'bcryptjs'
import {config} from 'dotenv'
import jwt from 'jsonwebtoken'
config()

// Database connection configuration
console.log(process.env.DB_HOST)
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);


;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:process.env.DB_NAME,
};

// Function to create a new database connection
const connection = mysql.createConnection(dbConfig);

// Establishing the database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});


connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.log(err);
    (err);
  } else {
    // resolve(results);
    console.log(results);
    
  }
});

const User = {
  getAllUsers: async () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  // Function to get a user by ID
  getUserById: async (userId) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Return the first result (or undefined if not found)
        }
      });
    });
  },

  // comparePassword: async (userId) => {
  //   return await bcrypt.compare(plaintextPassword,encryptPassword)
  // },


  comparePassword: async(plaintextPassword,encryptPassword)=>{
    console.log('[asswaod',plaintextPassword);
    // return console.log(encryptPassword);
    return await bcrypt.compare(plaintextPassword,encryptPassword)
  },


  generateJWTToken: async (userName,email)=>{
    return await jwt.sign(
        // {console.log(this.userName)},
        {userName:userName,email:email},
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.JWT_EXPIRY,
        }
    )},
  // Function to find a user by email
  findByEmail: async (email) => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]); // Return the first result (or undefined if not found)
        }
      });
    });
  },

  // Function to create a new user
  createUser: async (userData) => {
    const { username, email, password } = userData;
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.insertId); // Return the ID of the newly created user
          }
        }
      );
    });
  },

  // Function to update a user's data by ID
  updateUser: async (userId, userData) => {
    const { username, email, password } = userData;
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE users SET username = ?, email = ?, password = ? WHERE user_id = ?',
        [username, email, password, userId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows); // Return the number of affected rows
          }
        }
      );
    });
  },

  // Function to delete a user by ID
  deleteUser: async (userId) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM users WHERE user_id = ?', [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows); // Return the number of affected rows
        }
      });
    });
  },
};

export default User;
