exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['session.js'],
  baseUrl: 'http://localhost:3001/#!/'
};