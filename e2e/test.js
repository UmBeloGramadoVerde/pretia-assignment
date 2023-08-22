const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');


async function example() {
  let options = new chrome.Options();
  options.addArguments("--no-sandbox");

  let driver = new Builder()
    .forBrowser("chrome")
    .usingServer('http://localhost:4444/wd/hub')
    .setChromeOptions(options)
    .build();

  
  try {
    await driver.get("http://localhost:3001");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
  } finally {
    await driver.quit();
  }
}
example();
