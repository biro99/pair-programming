const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [resultados] = await db.query('SELECT * FROM livros');
    res.json(resultados);
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao buscar livros');
  }
});

router.post('/', async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      for (const livro of req.body) {
        const { titulo, autor } = livro;
        await db.query('INSERT INTO livros (titulo, autor) VALUES (?, ?)', [titulo, autor]);
      }
      return res.status(201).send('Todos os livros foram cadastrados com sucesso!');
    } 
    
    const { titulo, autor } = req.body;
    await db.query('INSERT INTO livros (titulo, autor) VALUES (?, ?)', [titulo, autor]);
    res.status(201).send('Livro cadastrado com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao cadastrar livro(s)');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor } = req.body;
    const [resultado] = await db.query(
      'UPDATE livros SET titulo = ?, autor = ? WHERE id = ?',
      [titulo, autor, id]
    );
    if (resultado.affectedRows === 0) {
      return res.status(404).send('Livro não encontrado');
    }
    res.send('Livro atualizado com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao atualizar livro');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM livros WHERE id = ?', [id]);
    if (resultado.affectedRows === 0) {
      return res.status(404).send('Livro não encontrado');
    }
    res.send('Livro excluído com sucesso!');
  } catch (erro) {
    console.error(erro);
    res.status(500).send('Erro ao excluir livro');
  }
});

module.exports = router;