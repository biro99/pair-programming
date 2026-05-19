const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [resultados] = await db.query('SELECT * FROM emprestimos');
    res.json(resultados);
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao buscar empréstimos');
  }
});

router.post('/', async (req, res) => {
  try {
    const { livro_id, aluno_id, data_emprestimo, data_prevista } = req.body;
    await db.query(
      'INSERT INTO emprestimos (livro_id, aluno_id, data_emprestimo, data_prevista) VALUES (?, ?, ?, ?)',
      [livro_id, aluno_id, data_emprestimo, data_prevista]
    );
    res.status(201).send('Empréstimo registrado com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao registrar empréstimo');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { livro_id, aluno_id, data_emprestimo, data_prevista, data_devolucao } = req.body;
    const [resultado] = await db.query(
      'UPDATE emprestimos SET livro_id = ?, aluno_id = ?, data_emprestimo = ?, data_prevista = ?, data_devolucao = ? WHERE id = ?',
      [livro_id, aluno_id, data_emprestimo, data_prevista, data_devolucao, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).send('Empréstimo não encontrado');
    }
    res.send('Empréstimo updated com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao atualizar empréstimo');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM emprestimos WHERE id = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).send('Empréstimo não encontrado');
    }
    res.send('Empréstimo excluído com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao excluir empréstimo');
  }
});

module.exports = router;