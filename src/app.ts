const express = require('express');

const app = express();


app.listen(3000, () => {
    console.log('Servidor em execução em http://localhost:3000');
})