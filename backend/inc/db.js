const mysql2 = require('mysql2');
 
// create the connection to database
const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'provadev',
  password: '',
});


module.exports = connection;