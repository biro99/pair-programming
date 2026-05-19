const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Servidor Ligado');
});

app.listen(3000, () => {
    console.log('Servidor ligado ')
});