const databaseTable = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS parties CASCADE;
DROP TABLE IF EXISTS offices CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS electionresult;

CREATE TABLE users (
  id SERIAL primary key,
  firstName text NOT NULL,
  lastName text NOT NULL,
  otherName text,
  is_admin BOOLEAN NOT null,
  email VARCHAR(320) NOT NULL,
  password text NOT NULL,
  registeredAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
INSERT INTO users (firstName, lastName, otherName, is_admin, email, password) VALUES ('Pascal', 'Ulor', 'Emeka', 'true', 'pascal@andela.com', '$2b$10$Ax80YVp8EK5PUt/hyWx1IejBFTB7d.3wfLJw9vqa6Ermp4Db2/TF6');

CREATE TABLE parties (
  id SERIAL primary key,
  name VARCHAR(50) NOT NULL,
  userId int NOT NULL,
  hqAddress text NOT NULL,
  about text NOT NULL,
  email VARCHAR(320) NOT NULL,
  phonenumber varchar(30) NOT NULL UNIQUE,
  logoUrl varchar (50) NOT NULL,
  createdat TIMESTAMP NOT NULL DEFAULT NOW(),
  updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
  );
  INSERT INTO parties (name, userId, hqAddress, about, email, phonenumber, logoUrl) 
  VALUES ('PUNIT', 1, '32 UK', 'I am a man blessed by GOD', 'pas@google.com', '8069568494', 'punit.png');

CREATE TABLE offices (
    id SERIAL primary key,
    name VARCHAR(50) NOT NULL,
    userId int NOT NULL,
    type VARCHAR(50) NOT NULL,
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (userId) REFERENCES "users" (id) ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO offices (name, userId, type) 
  VALUES ('President', 1, 'Federal');

CREATE TABLE candidates (
    id SERIAL primary key,
    candidate int references users(id),
    party int references parties(id),
    office int references offices(id),
    createdOn TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE votes (
    id SERIAL primary key,
    office int references offices(id),
    candidate int references candidates(id),
    createdOn TIMESTAMP NOT NULL DEFAULT NOW()
);
  `;

export default databaseTable;
