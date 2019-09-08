const express = require('express');
const routes = express.Router();
const conn = require('./inc/db');
const cadastro = require('./inc/cadastro');
const registro = require('./inc/registro');
const login = require('./inc/login');

/** retornando todos os registros */
routes.get('/', (req, res)=>{

    return conn.query("SELECT * FROM tb_register ORDER BY data DESC", (err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.send(results);
        }
    });
 

});

/** cadastrando novo usuário no banco de dados */
routes.post('/cadastro', (req, res)=>{

    cadastro.save(req.body.email, req.body.password).then(results =>{

        return res.json({ok: 'cadastrado!', data: results});

    }).catch(err => {

        return res.json({nok: 'erro ao cadastrar!', err});

    });
});

/** recebendo requisição de usuário para acessar login */
routes.post('/login', (req, res)=>{

   
    login.login(req.body.email, req.body.password).then(results => {

        return res.json({ok: 'Usuário existe'});

    }).catch(err => {

        return res.json({nok: 'Usuário não existe', err});

    });
});


/** lista de usuários existentes no banco de dados */
routes.get('/login', (req, res)=>{
    
    conn.query('SELECT * FROM tb_users' ,(err, results)=>{
        if(err){
            res.send(err);
        }else{
            res.send(results);
        }
    });
});

/** cadastrar registro */
routes.post('/registro', async (req, res) => {

  await  registro.contar(req.body.data, req.body.userID).then( results => {

        if (results === 'pode registrar') {

             registro.save(req.body.entrada, req.body.saidaAlmoco, req.body.retornoAlmoco, req.body.saida, req.body.data, req.body.userID).then( results => {
                 return  res.json({ ok: 'cadastrado!', data: results });

            }).catch(err => {
                return res.json({ nok: 'erro ao cadastrar!', err });
            });

        } else {
            return res.json(results);
        }
    }).catch(err => {
        return res.json(err);
    });
});

/** recebendo requisição de usuário para acessar login */
routes.put('/registro', (req, res)=>{

    registro.update(req.body.entrada, req.body.saidaAlmoco, req.body.retornoAlmoco, req.body.saida,  req.body.userID).then(results=>{
         return  res.json({ ok: 'Atualizado!'});
    }).catch(err => {
 
         return res.json({nok: 'Erro ao autalizar', err});
 
     });
 });

module.exports = routes;