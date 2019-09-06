const mysql2 = require('mysql2');
 
// create the connection to database
const connection = mysql2.createConnection({
  host: 'localhost:3306',
  user: 'jotaw647',
  database: 'jotaw647_provadev',
  password: 'julioefran261289',
});


module.exports = connection;