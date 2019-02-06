import pg from 'pg';
import url from 'url';
import dotenv from 'dotenv';
import winston from '../config/winston';
import databaseTable from './databaseTables';

dotenv.config();

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
};

const { Pool } = pg;

const pool = new Pool(config);

const seed = () => {
  const qry = databaseTable;
  pool.query(qry, (err, result) => {
    if (err) {
      winston.info(err.toString());
    } else {
      winston.info('Migration Successful');
    }
  });
};

const migrate = () => {
  pool.connect()
    .then((client) => {
      winston.info('database connection established');
      if (client) {
        seed();
      }
    });
};

migrate();

const databaseConnection = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
export default { migrate, databaseConnection };
