import { Dialect, Sequelize } from 'sequelize';

// models
import { initUserModel } from './models/user.model';

const configDb = async () => {
    const dbConfig = {
        type: (process.env.DATABASE_TYPE as Dialect) ?? 'mysql',
        name: process.env.DATABASE_NAME ?? 'express',
        host: process.env.DATABASE_HOST ?? 'localhost',
        port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
        user: process.env.DATABASE_USER ?? 'root',
        password: process.env.DATABASE_PASSWORD ?? '',
    };

    const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.type,
    });

    try {
        await sequelize.authenticate();
        console.log('[INFO]: Connection to database established.');
    } catch (error: any) {
        console.error('[SEVERE]: Failed to connect to database. Error: ', error);
    }

    initUserModel(sequelize);
};

export { configDb };
