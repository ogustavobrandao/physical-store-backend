import express from 'express';
import sequelize from './config/database';

const app = express();


app.listen(3000, () => {
    console.log('Servidor em execução em http://localhost:3000');
    sequelize.sync();
})