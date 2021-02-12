import { Sequelize } from 'sequelize';

const {
    DB_HOST,
    DB_NAME,
    DB_UNAME,
    DB_PASS,
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_UNAME, DB_PASS, {

    host: DB_HOST,
    dialect: 'mysql',
});
