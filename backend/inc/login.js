const conn = require('./db');

 module.exports = {

     login(email, password){

        return new Promise ((resolve, reject)=>{

            conn.query('SELECT * FROM tb_users WHERE email = ? ', [email], (err, result)=>{
                if(err){
                    reject(err);
                }else{
                    if(!result.length > 0){
                        reject('Usuário ou senha incorretos!');
                    }else{
                        let row = result[0];
                        if(row.password !== password){
                            reject('Usuário ou senha incorretos!'); 
                        }else{
                            resolve(row);
                        }
                    }
                }
            });
        });
     }
 }