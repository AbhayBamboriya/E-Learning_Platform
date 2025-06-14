// models/User.js
import mysql from 'mysql';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

// Database connection configuration
console.log('cjsdjs');

console.log(process.env.DB_HOST);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Function to create a new database connection
export const connection = mysql.createConnection(dbConfig);

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
  } else {
    // You can handle results here if needed
  }
});

const User = {
  comparePassword: async (plaintextPassword, encryptPassword) => {
    console.log('[asswaod', plaintextPassword);
    return await bcrypt.compare(plaintextPassword, encryptPassword);
  },

  generateJWTToken: async (role, id, Name) => {
    return await jwt.sign(
      { id: id, role: role, Name: Name },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
  },

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
    console.log('is user', userData);

    const { Name, role, email, password } = userData;
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO users (name, role, email, password) VALUES (?, ?, ?, ?)',
        [Name, role, email, password],
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
};

export const Doubt = {
  PostDoubt: async (Name, title, description, userId) => {
    console.log(Name);
    console.log('test', Name, title, description, userId);

    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO doubts (Name, title, description, user_id) VALUES (?, ?, ?, ?)',
        [Name, title, description, userId],
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

  GetAnswers: async (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT a.answer, a.teacher_id, t.name AS teacherName 
         FROM answers a
         JOIN users t ON a.teacher_id = t.id
         WHERE a.doubt_id = ?`,
        [id],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            // console.log('checking result', result);
            resolve(result); // Return both answer and teacher's name
          }
        }
      );
    });
  },

  GetResources: async () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT teacherName, url, subject FROM upload', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  SolveDoubt: async (doubtId, answer, Id) => {
    console.log('Inserting answer:');
    console.log('- doubtId:', doubtId);
    console.log('- answer:', answer);
    console.log('- teacher_id:', Id);

    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO answers (doubt_id, answer, teacher_id) VALUES (?, ?, ?)',
        [doubtId, answer, Id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  },

  UploadResources: async (id, secureUrl, subject, description, year, branch) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO upload (id, url, subject, description, year, branch) VALUES (?, ?, ?, ?, ?, ?)',
        [id, secureUrl, subject, description, year, branch],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  },

  UploadBook: async (data) => {
    console.log('data is ', data);

    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO books (year, subject_name, uploader_name, book_name, cloudinary_url) VALUES (?, ?, ?, ?, ?)',
        [data.year, data.subjectName, data.uploaderName, data.bookName, data.secureUrl],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  },

  UploadPaper: async (data) => {
    console.log('data is ', data);

    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO question_papers (subject_name, year, cloudinary_url, branch, PaperYear) VALUES (?, ?, ?, ?, ?)',
        [data.subjectName, data.year, data.cloudinaryUrl, data.branch, data.paperYear],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  },

  GetAllDoubts: async () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM doubts', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
        console.log('res', results);
      });
    });
  },

  GetAllBooks: async () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT year, subject_name, uploader_name, book_name, cloudinary_url FROM books',
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  GetAllPaper: async () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT year, subject_name, branch, cloudinary_url, PaperYear FROM question_papers',
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  GetAllNotes: async () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT users.Name, upload.subject, upload.description, upload.year, upload.branch, upload.url FROM users JOIN upload ON users.id = upload.id;',
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

export default User;