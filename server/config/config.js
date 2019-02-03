import dotenv from 'dotenv';

dotenv.config();

export default {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
  },
  test: {
    username: process.env.DB_TEST_PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE_TEST,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
