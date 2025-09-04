const mysql = require('mysql2/promise');
require('dotenv').config();
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CONN_LIMIT,
} = process.env;

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: Number(DB_CONN_LIMIT),
      queueLimit: 0,
    });
  }
  return pool;
}

async function initDb() {
  const poolInstance = getPool();
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const connection = await poolInstance.getConnection();
  try {
    await connection.query(createTableSql);
    // eslint-disable-next-line no-console
    console.log('Ensured table `schools` exists.');
  } finally {
    connection.release();
  }
}

module.exports = { getPool, initDb };

