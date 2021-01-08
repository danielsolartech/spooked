import { Spooked } from 'spooked';

if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

const app = new Spooked({
    database: {
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        name: process.env.DB_NAME || 'Spooked',
    },
});

try {
    app.getDatabaseManager().connect();
} catch (e) {
    console.log('Spooked Error', e);
}
