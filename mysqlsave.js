
const mysql = require('mysql2');

async function main() {
    // Carrega os dados do arquivo JSON
    const dados = JSON.parse(fs.readFileSync('veiculos.json'));

    // Cria a conexão com o banco de dados
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'seu_usuario',
        password: 'sua_senha',
        database: 'seu_banco_de_dados'
    });

    const sql = `
  CREATE TABLE veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(255) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    ano INT NOT NULL,
    preco FLOAT NOT NULL
  );
`;
    await connection.query(sql);


    // Insere os dados no banco de dados
    for (const marca in dados) {
        for (const modelo in dados[marca]) {
            for (const ano in dados[marca][modelo]) {
                const preco = dados[marca][modelo][ano];
                const sql = 'INSERT INTO veiculos (marca, modelo, ano, preco) VALUES (?, ?, ?, ?)';
                const values = [marca, modelo, ano, preco];
                await connection.query(sql, values);
            }
        }
    }

    // Fecha a conexão com o banco de dados
    connection.end();
}

main();

