require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const livrosRouter = require('./routes/livros');
const alunosRouter = require('./routes/alunos');
const emprestimosRouter = require('./routes/emprestimos');

app.use('/livros', livrosRouter);
app.use('/alunos', alunosRouter);
app.use('/emprestimos', emprestimosRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta 3000');
});