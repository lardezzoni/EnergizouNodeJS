const dotenv = require('dotenv');
const mysql = require('mysql2');
const mysqlPool = require('./mysqlHandler.js')

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err)
  if(err.errno=='ER_TABLE_EXISTS_ERROR'){
  }
  if(err=="Error: Table 'users' already exists"){

  }
  else{
    process.exit(1);

  }
});

dotenv.config({ path: './config.env' });
const app = require('./app');

try{
                
  var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE, password VARCHAR(255) NOT NULL)";
  const createTable = mysqlPool.executeQuery(sql);
       
  var empresas = "CREATE TABLE empresas (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255), senha VARCHAR(30), empresa VARCHAR(100), CNPJ VARCHAR(18) UNIQUE, CEP VARCHAR(9), endereco VARCHAR(5), numero VARCHAR(3), telefone VARCHAR(10), email VARCHAR(255))"
  const createTable2 = mysqlPool.executeQuery(empresas);

  }
catch(err){
  console.log(err)
}


const port = process.env.PORT || 3005;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  if(err.code=='ER_TABLE_EXISTS_ERROR'){
    console.log('Connected to MySQL database!');

  }
  else{
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');

    console.log(err);
    console.log(err.code);
    server.close(() => {
      process.exit(1);
    });
  }
  
});
