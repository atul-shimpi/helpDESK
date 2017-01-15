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

describe('Login', function() {
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