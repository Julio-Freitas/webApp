const routes = require('./routes');
const express = require('express');
const cors = require('cors');

const server = express();



server.use(express.json());
server.use(cors()); //permite que a app seja acessada por qualquer endereço
server.use(routes);

server.listen(3333, () => {
    console.log('servidor rodando!');
}); 

