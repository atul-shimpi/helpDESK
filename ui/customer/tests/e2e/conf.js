var baseUrl = 'http://localhost:3001/#!/';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['session.js', 'tickets.js'],
  specs_: ['tickets.js'],
  baseUrl: baseUrl,
  ticketsPath: baseUrl + 'tickets'
};