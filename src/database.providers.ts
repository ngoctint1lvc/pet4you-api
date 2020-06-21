import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            return await createConnection({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: 'bitnami_opencart',
                entities: [
                    __dirname + '/../dist/*.entity.js'
                ],
                synchronize: true,
            });
        }
    },
];