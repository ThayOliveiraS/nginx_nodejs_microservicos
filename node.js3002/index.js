import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
const upload = multer();

const PORT = 3002;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

const db = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: '123456',
  database: 'db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

app.post('/cliente/gravar', (req, res) => {
const sql = 'INSERT INTO clientes (nome, telefone, email, idtiposdeclientes, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
const variables = [req.body.nome, req.body.telefone, req.body.email, req.body.idtiposdeclientes, req.body.cep, req.body.logradouro, req.body.numero, req.body.complemento, req.body.bairro, req.body.cidade, req.body.uf];
db.query(sql, variables, (err) => {
  if (err) {
  return res.status(404).send({ err: err });
}
});
res.status(201).send('Cadastro criado com Sucesso.');
});

app.listen(PORT, () => {
  console.log('Server is running on port 3002.')
});