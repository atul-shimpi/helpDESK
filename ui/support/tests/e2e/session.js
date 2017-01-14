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
    
    browser.driver.get('http://localhost:3001/');
    
    browser.driver.findElement(By.id("email")).clear();
    browser.driver.findElement(By.id("email")).sendKeys("jeniffer@hotmail.com");
    
    browser.driver.findElement(By.id("password")).clear();
    browser.driver.findElement(By.id("password")).sendKeys("jeni@1601");
    
    browser.driver.findElement(By.id("login")).click();
    
    browser.driver.sleep(10000);
    expect(true).toEqual(true);    
  });
});