import pg from 'pg';
import _ from 'lodash';
import dotenv from 'dotenv';
import winston from '../config/winston';
import databaseTable from './databaseTables';
import config from '../config/config';

dotenv.config();

const defaultENV = config.development;
const env = process.env.NODE_ENV || 'development';
const environmentConfig = config[env];
const connectionString = _.merge(defaultENV, environmentConfig);

global.gConfig = connectionString;

const { Pool } = pg;

const pool = new Pool(connectionString);

const seed = () => {
  const qry = databaseTable;
  pool.query(qry, (err, result) => {
    if (err) {
      winston.info(err.toString());
    } else {
      winston.info(result);
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
