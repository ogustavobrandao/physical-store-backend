import express from 'express';
import sequelize from './config/database';
import lojaRoutes from './routes/lojaRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json()); 

app.use('/api', lojaRoutes);

app.use(errorHandler);

sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor em execução em http://localhost:3000');
        })
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

export default app;