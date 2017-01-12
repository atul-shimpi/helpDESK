class Metric {
  constructor(name, count, direction) {
    this.name = name;
    this.count = count;
    this.direction = direction;
  }
}

class Metrics {
  constructor() {
    this.metrics = []; 
    this.status = null;    
  }
  
  add(metric) {
    this.metrics.push(metric);
  } 
}

class Environment {
  constructor(name) {
    this.name = name;    
  }
}

class Environments {
  constructor() {
    this.environments = []; 
    this.status = null; 
    this.timeStamp = null;    
  }
  
  add(environment) {
    this.environments.push(environment);
  } 
}

class Test {
  constructor(testsCount, passedCount, codeCoverage, status) {
    this.testsCount = testsCount;
    this.passedCounts = passedCount;
    this.codeCoverage = codeCoverage;
    this.status = status;
  }
}

class Build {
  constructor(type, id, owner, timeStarted, state, metrics, env, unitTest, functionalTest) {
    this.id = id;
    this.type = type;
    this.owner = owner;
    this.timeStarted = timeStarted;
    this.state = state;
    this.metrics = metrics;   
    this.env = env;
    this.unitTest = unitTest;
    this.functionalTest = functionalTest;
  }
  
  isBuildItem() {
    return this.type === 'Build';
  }
  
  isFirewallItem(){
    return this.type === 'Firewall';
  }
}

var builds = [];

// Builds
//============================================================

// Metrics
var metrics = [];

metrics.status = 'Pending';

// environments
var env = new Environments();

env.status = 'Pending';
env.timeStamp = '10:46 AM 04/17/2014';

env.add(new Environment('Debug'));
env.add(new Environment('Release'));

// tests
var unitTest = new Test(55, 40, 67, 'Pending');
var funcTest = new Test(155, 140, 78, 'Pending');
builds.push(new Build('Build', 'Tenrox-R1_1235', '', '', 'Pending', metrics, env, unitTest, funcTest));
//============================================================

// metrics
var metrics = [];

metrics.status = 'Running';
metrics.push(new Metric('Test', 88, 'up'));
metrics.push(new Metric('Maintainability', 97, 'up'));
metrics.push(new Metric('Security', 33, 'normal'));
metrics.push(new Metric('Workmanship', 42, 'normal'));

// environments
var env = new Environments();

env.status = 'Running';
env.timeStamp = '12:00 AM 04/18/2014';

env.add(new Environment('Debug'));
env.add(new Environment('Release'));

// tests
var unitTest = new Test(134, 78, 67, 'Running');
var funcTest = new Test(155, 140, 78, 'Pending');

builds.push(new Build('Firewall', '432462', 'jtuck', '4/18/2014 12:12pm', 'Running', metrics, env, unitTest, funcTest ));
//============================================================

// metrics
var metrics = [];

metrics.status = 'Rejected';
metrics.push(new Metric('Test', 55, 'up'));
metrics.push(new Metric('Maintainability', 76, 'up'));
metrics.push(new Metric('Security', 12, 'normal'));
metrics.push(new Metric('Workmanship', 67, 'normal'));

// environments
var env = new Environments();

env.status = 'Rejected';
env.timeStamp = '04:31 AM 04/21/2014';

env.add(new Environment('Debug'));
env.add(new Environment('Release'));

// tests
var unitTest = new Test(88, 56, 98, 'Rejected');
var funcTest = new Test(68, 34, 78, 'Rejected');

builds.push(new Build('Firewall', '432461', 'samy', '4/18/2014 10:53am', 'Rejected', metrics, env, unitTest, funcTest));
//============================================================

// metrics
var metrics = [];

metrics.status = 'Complete';
metrics.push(new Metric('Test', 164, 'up'));
metrics.push(new Metric('Maintainability', 32, 'up'));
metrics.push(new Metric('Security', 23, 'normal'));
metrics.push(new Metric('Workmanship', 172, 'normal'));

// environments
var env = new Environments();

env.status = 'Complete';
env.timeStamp = '09:17 AM 04/22/2014';

env.add(new Environment('Debug'));
env.add(new Environment('Release'));

// tests
var unitTest = new Test(200, 134, 56, 'Complete');
var funcTest = new Test(144, 115, 78, 'Complete');

builds.push(new Build('Build','Tenrox-R1_1234', '', '4/17/2014 9:42am', 'Complete', metrics, env, unitTest, funcTest));
//============================================================

// metrics
var metrics = [];

metrics.status = 'Rejected';
metrics.push(new Metric('Test', 164, 'up'));
metrics.push(new Metric('Maintainability', 153, 'up'));
metrics.push(new Metric('Security', 243, 'normal'));
metrics.push(new Metric('Workmanship', 154, 'normal'));

// environments
var env = new Environments();

env.status = 'Rejected';
env.timeStamp = '11:34 AM 04/16/2014';

env.add(new Environment('Debug'));
env.add(new Environment('Release'));

// tests
var unitTest = new Test(132, 87, 68, 'Rejected');
var funcTest = new Test(144, 115, 78, 'Rejected');

builds.push(new Build('Firewall', '432460', 'samy', '4/17/2014 7:51am', 'Rejected', metrics, env, unitTest, funcTest));
//============================================================

// Metrics
var metrics = [];

metrics.status = 'Accepted';
metrics.push(new Metric('Test', 118, 'up'));
metrics.push(new Metric('Maintainability', 76, 'up'));
metrics.push(new Metric('Security', 45, 'normal'));
metrics.push(new Metric('Workmanship', 98, 'normal'));

// environments
var env = new Environments();

env.status = 'Accepted';
env.timeStamp = '11:34 AM 04/16/2014';

env.add(new Environment('Debug'));
env.add(new Environment('Release'));

// tests
var unitTest = new Test(132, 87, 68, 'Accepted');
var funcTest = new Test(144, 115, 78, 'Accepted');

builds.push(new Build('Firewall', '432459', 'samy', '4/16/2014 6:43am', 'Accepted', metrics, env, unitTest, funcTest));
//============================================================


export {builds}