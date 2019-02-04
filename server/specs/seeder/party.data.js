export default {
  validData1: {
    name: 'PPC',
    hqAddress: 'J32 epic road',
    logoUrl: 'logo.png',
    about: 'This is a demo party',
    email: 'ppc@gmail.com',
    phonenumber: '8069568491',
  },
  validData2: {
    hqAddress: 'J32 epic road',
    name: 'ABC',
    logoUrl: 'logo.png',
    about: 'This is a demo party',
    email: 'abc@gmail.com',
    phonenumber: '8069568494',
  },

  emptyData: {
    hqAddress: '',
    name: '',
    logoUrl: '',
    about: '',
    email: '',
    phonenumber: '',
  },
  invalidData: {
    hqAddress: '--d',
    name: 'ABC123',
    logoUrl: 'logo',
    about: 'T',
    email: 'abc',
    phonenumber: 'y8069568494',
  },
  incompleteData: {
    hqAddress: 'J32 epic road',
    name: 'ABC',
    logoUrl: 'logo.png',
    about: 'This is a demo party',
  },
  validUpdate1: {
    name: 'shell',
    department: 'Rivers',
    details: 'Request Details must be between 20 to 1000 characters',
  },
  validUpdate2: {
    name: 'HNN',
  },
  invalidUpdate1: {
    name: '12gtbank',
  },
  invalidUpdate2: {
    name: 'a',
  },
};

