
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6522024',
    password: 'RYWtUzPUCR',
    database: 'sql6522024'
  });
  
connection.connect((err) => {
  if (err) {
    console.log("Error occurred", err);
  } else {
    console.log("Connected to MySQL server");
  }
  });

  module.exports = connection;