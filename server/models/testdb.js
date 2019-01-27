const userdb = [
  {
    id: 1,
    firstName: 'Pascal',
    lastName: 'Don',
    otherName: 'Emeka',
    email: 'pc@yahoo.com',
    password: '123',
    passportUrl: 'eme.jpg',
    isAdmin: true,
    registeredAt: '14-12-2018',
  },
  {
    id: 2,
    Name: 'Clark',
    lastName: 'kent',
    otherName: 'Superman',
    email: 'sups@gmail.com',
    password: '123',
    passportUrl: 'sups.jpg',
    isAdmin: false,
    registeredAt: '14-12-2018',
  },
  {
    id: 3,
    Name: 'Mike',
    lastName: 'John',
    otherName: 'Luke',
    email: 'mj@yahoo.com',
    password: '678',
    passportUrl: 'mj.jpg',
    isAdmin: false,
    registeredAt: '14-12-2018',
  },
];

const partydb = [
  {
    id: 1,
    userId: userdb[0].id,
    name: 'APP',
    hqAddress: '32 Epic road',
    email: 'app@yahoo.com',
    phonenumber: '8061234567',
    about: 'This is a demo party',
    logoUrl: 'app.jpg',
    date: '01-10-1960',
  },
  {
    id: 2,
    name: 'PPP',
    userId: userdb[0].id,
    hqAddress: '1 Issac John road',
    email: 'ppp@yahoo.com',
    phonenumber: '8061234568',
    about: 'This is a demo party',
    logoUrl: 'ppp.png',
    date: '01-10-1960',
  },
  {
    id: 3,
    name: 'JP',
    userId: userdb[0].id,
    hqAddress: '5 Alibab road',
    email: 'jp@yahoo.com',
    phonenumber: '8061234569',
    about: 'This is a demo party',
    logoUrl: 'JP.pix',
    date: '01-10-1960',
  },
];

const officedb = [
  {
    id: 1,
    type: 'Federal',
    name: 'Presidential',
    userId: 1,
  },
  {
    id: 2,
    type: 'Legislative',
    name: 'Senate',
    userId: 1,
  },
  {
    id: 2,
    type: 'State',
    name: 'Gorvernor',
    userId: 1,
  },
];

const testdb = { partydb, userdb, officedb };

export default testdb;
