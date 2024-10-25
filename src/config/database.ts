import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    models: [__dirname + '/../models'],
})

sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi estabelecida com sucesso');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

sequelize.sync({ alter:true })
    .then(() => {
        console.log("Modelos sincronizados com sucesso.");
    })
    .catch(error => {
        console.error("Erro na sincronização:", error);
    });

export default sequelize;