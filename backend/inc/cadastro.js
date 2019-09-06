const conn = require('./db');

module.exports = {

    save(email, password) {
        return new Promise((resolve, reject)=>{
            
            conn.query('INSERT INTO tb_users (email, password) VALUES (?, ?)', [
                email,
                password
            ], (err, results) => {
                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }
            })
        });
    }
}