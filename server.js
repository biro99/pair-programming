require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const alunosRouter = require('./routes/alunos');
const livrosRouter = require('./routes/livros');
const emprestimosRouter = require('./routes/emprestimos');

app.use('/alunos', alunosRouter);
app.use('/livros', livrosRouter);
app.use('/emprestimos', emprestimosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});