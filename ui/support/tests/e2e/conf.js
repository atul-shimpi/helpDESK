var baseUrl = 'http://localhost:3001/#!/';

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs_: ['session.js', 'tickets.js'],
  specs: ['tickets.js'],
  baseUrl: baseUrl,
  ticketsPath: baseUrl + 'tickets'
};