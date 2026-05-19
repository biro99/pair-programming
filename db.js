const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',        
    password: 'root',  
    database: 'sgbe',
    port: 3307
});


pool.getConnection()
    .then(conexao => {
        console.log('Conexão com o banco MySQL realizada com sucesso!');
        conexao.release();
    })
    .catch(erro => {
        console.error('Erro ao conectar no MySQL:', erro.message);
    });


module.exports = pool;