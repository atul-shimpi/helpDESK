var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(300);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

browser.driver.manage().window().maximize();

describe('Login Management', function() {
  it('should register', function() {   
    browser.driver;
    
    // navigate to base url
    browser.driver.get(browser.baseUrl);
    
    // navigate to registration link
    element(By.id("register")).click();
    
    // fill registration credentials
    element(By.id("name")).sendKeys("Silvia Kollaca");
    
    var rnd = Math.floor((Math.random() * 100) + 1);    
    
    // email
    element(By.id("email")).sendKeys("silvia" + rnd + "@hotmail.com")
    
    // password
    var password = "silvia" + rnd + "@1601"
    
    element(By.id("password")).sendKeys(password);
    element(By.id("password_confirmation")).sendKeys(password);
    
    // click register button
    element(By.id("register")).click();
    
    // should on tickets list page
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "tickets");
        
    browser.driver.sleep(2000);
     
    // logout
    element(By.id("account-menu")).click();
    element(By.id("logout")).click();
    
    // should be on login page
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });
  
  it('should unregister', function() {   
    browser.driver;
    
    // navigate to base url
    browser.driver.get(browser.baseUrl);
    
    // navigate to registration link
    element(By.id("register")).click();
    
    // fill registration credentials
    element(By.id("name")).sendKeys("Silvia Kollaca");
    
    var rnd = Math.floor((Math.random() * 100) + 1);    
    
    // email
    element(By.id("email")).sendKeys("silvia" + rnd + "@hotmail.com")
    
    // password
    var password = "silvia" + rnd + "@1601"
    
    element(By.id("password")).sendKeys(password);
    element(By.id("password_confirmation")).sendKeys(password);
    
    // click register button
    element(By.id("register")).click();
    
    // should on tickets list page
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "tickets");
        
    browser.driver.sleep(2000);
     
    // logout
    element(By.id("account-menu")).click();
    element(By.id("unregister")).click();
    
    browser.switchTo().alert().accept();
    
    // should be on login page
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });
  
  it('should login with valid credentials', function() {   
    browser.driver;
    
    browser.driver.get(browser.baseUrl);
    
    element(by.id("email")).clear()
    element(By.id("email")).sendKeys("jeniffer@hotmail.com");
    
    element(By.id("password")).clear();
    element(By.id("password")).sendKeys("jeni@1601");
    
    element(By.id("login")).click();
    
    browser.driver.sleep(3000);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "tickets");    
    
    element(By.id("account-menu")).click();
    element(By.id("logout")).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl);
  });
  
});