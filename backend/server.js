const routes = require('./routes');
const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');
const cors = require('cors');

const server = express();

const port = process.env.PORT || 3333 ;

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParse.urlencoded({extended: true}));

server.use(express.json());
server.use(cors()); //permite que a app seja acessada por qualquer endereço
server.use(routes);


server.listen(port, (err) => {
    if (err) {
        console.log('Servidor não rodou!');
    } else {
        console.log('Servidor rodando');
    }
});