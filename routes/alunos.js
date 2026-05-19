const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [resultados] = await db.query('SELECT * FROM alunos');
    res.json(resultados);
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao buscar alunos');
  }
});

router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      for (const aluno of req.body) {
        const { nome, turma, matricula } = aluno;
        await db.query('INSERT INTO alunos (nome, turma, matricula) VALUES (?, ?, ?)', [nome, turma, matricula]);
      }
      return res.status(201).send('Todos os alunos foram cadastrados com sucesso!');
    } 
    
    const { nome, turma, matricula } = req.body;
    await db.query('INSERT INTO alunos (nome, turma, matricula) VALUES (?, ?, ?)', [nome, turma, matricula]);
    res.status(201).send('Aluno cadastrado com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao cadastrar aluno(s)');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, turma, matricula } = req.body;
    const [resultado] = await db.query(
      'UPDATE alunos SET nome = ?, turma = ?, matricula = ? WHERE id = ?',
      [nome, turma, matricula, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).send('Aluno não encontrado');
    }
    res.send('Aluno updated com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao atualizar aluno');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).send('Aluno não encontrado');
    }
    res.send('Aluno excluído com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao excluir aluno');
  }
});

module.exports = router;