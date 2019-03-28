const databaseTable = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS parties CASCADE;
DROP TABLE IF EXISTS offices CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

CREATE TABLE users (
  id SERIAL primary key,
  firstName text NOT NULL,
  lastName text NOT NULL,
  otherName text,
  isAdmin BOOLEAN NOT null DEFAULT 'false',
  email VARCHAR(320) NOT NULL,
  password text NOT NULL,
  phonenumber varchar (14) NOT NULL UNIQUE,
  passportUrl varchar (100) NOT NULL,
  registeredAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
INSERT INTO users (firstName, lastName, otherName, isAdmin, email, password, phonenumber, passportUrl) VALUES ('Pascal', 'Ulor', 'Emeka', 'true', 'admin@andela.com', '$2b$10$Ax80YVp8EK5PUt/hyWx1IejBFTB7d.3wfLJw9vqa6Ermp4Db2/TF6', '8069568494', 'mypic.png');

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
    id SERIAL,
    candidate int references users(id),
    office int references offices(id),
    party int references parties(id),
    registered BOOLEAN NOT null DEFAULT 'false',
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (candidate, office)
);

CREATE TABLE votes (
    id SERIAL,
    voter int references users(id),
    office int references offices(id),
    candidate int references users(id),
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (voter, office)
);
  `;

export default databaseTable;
