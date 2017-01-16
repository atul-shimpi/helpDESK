/*var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};*/

browser.driver.manage().window().maximize();
browser.driver;

function login() {      
  browser.driver.get(browser.baseUrl);
  
  element(by.id("email")).clear()
  element(By.id("email")).sendKeys("shimpiatul@hotmail.com");
  
  element(By.id("password")).clear();
  element(By.id("password")).sendKeys("admin1234");
  
  element(By.id("login")).click();
}

function logout() { 
  element(By.id("account-menu")).click();
  element(By.id("logout")).click();
}

function ticketsCount(callback) {
  element(by.css('table[id=\'tickets\']')).all(by.css('tr')).count()
  .then(function(rows) {
    callback(rows - 1);
  });
}

function ticketCommentTable(row, callback) {
  var cols = element(by.repeater('ticket in tickets').row(row).column('ticket.comment'));
  
  cols.getText().then(function (comment) {
    callback(comment)
  });    
}

function ticketIdTable(callback) {
  var cols = element(by.repeater('ticket in tickets').row(1).column('ticket.id'));
  
  cols.getText().then(function (ticket_id) {
    callback(ticket_id)
  });    
}

describe('Ticket Management', function() {
  it('should create a new ticket', function() {  
    login();
    browser.driver.sleep(2000);
    
    ticketsCount(function(rows) {
      var count = rows;
      
      element(By.id("new-ticket")).click();
      
      element(by.cssContainingText('option', 'Email configuration')).click();
      element(By.id("description")).sendKeys("Configure outlook");
      element(by.cssContainingText('option', 'Alex Hudson')).click();
      element(By.id("save")).click();
      
      ticketsCount(function(rows) {
        expect(rows).toEqual(count + 1);
      });
    });    
  });    
  
  it('should delete a ticket', function() {  
    ticketsCount(function(rows) {
      var count = rows;
      
      ticketIdTable(function(id) {
        element(By.id("delete-" + id)).click();
        browser.switchTo().alert().accept();
        browser.driver.sleep(2000);
      
        ticketsCount(function(rows) {
          expect(rows).toEqual(count - 1);
        });
      });    
    });
  });
  
  it('should update a ticket', function() { 
    login();
    browser.driver.sleep(2000);
   
    ticketIdTable(function(id) {
      element(By.id("edit-" + id)).click();
      
      element(by.cssContainingText('option', 'Peter Border')).click();
      element(By.id("comment")).sendKeys("Hello, any update ?");
      element(By.id("update")).click();
      
      ticketCommentTable(1, function(comment) {
        expect(comment).toEqual("Hello, any update ?");
        logout();
      });      
    });
    
  });
});