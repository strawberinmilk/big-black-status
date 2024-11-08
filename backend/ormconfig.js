const typeorm = require('typeorm');
require('dotenv').config({ path: '../.env' });
module.exports = new typeorm.DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 10103,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/db/*/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  logging: true,
  synchronize: true,
  cli: {
    migrationsDir: 'migrations',
  },
});
