import dataBaseQuerry from './databaseConnection';

const { databaseConnection } = dataBaseQuerry;

const Seed = {
  userQuery: 'INSERT INTO users (firstName, lastName, otherName, is_admin, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
  partyQuery: 'INSERT INTO parties (name, userId, hqAddress, about, email, phonenumber, logoUrl) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
  officeQuery: 'INSERT INTO offices (name, userId, type) VALUES ($1, $2, $3) RETURNING *',
  candidateQuery: 'INSERT INTO candidates (candidate, party, office) VALUES ($1, $2, $3) RETURNING *',
  voteQuery: 'INSERT INTO votes (office, candidate) VALUES ($1, $2) RETURNING *',
};

const seedQuery = (table, col1, col2, $1, $2) => databaseConnection.query(`SELECT * FROM ${table} WHERE ${col1} = $1 AND ${col2} = $2`, [$1, $2]);

export default { Seed, seedQuery };
