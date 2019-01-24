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
    phonenumber: '08061234567',
    about: 'This is a demo party',
    logoUrl: 'app.jpg',
    date: '01-10-1960',
  },
  {
    id: 1,
    name: 'PPP',
    userId: userdb[0].id,
    hqAddress: '1 Issac John road',
    email: 'ppp@yahoo.com',
    phonenumber: '08061234568',
    about: 'This is a demo party',
    logoUrl: 'ppp.png',
    date: '01-10-1960',
  },
  {
    id: 1,
    name: 'JP',
    userId: userdb[0].id,
    hqAddress: '5 Alibab road',
    email: 'jp@yahoo.com',
    phonenumber: '08061234569',
    about: 'This is a demo party',
    logoUrl: 'JP.pix',
    date: '01-10-1960',
  },
];

const testdb = { partydb, userdb };

export default testdb;
