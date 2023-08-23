const { Builder, By, Key, until } = require("selenium-webdriver");

const timestamp = new Date().getTime();
const mockUser = "selenium_username" + timestamp;
const mockPass = "selenium_password" + timestamp;
const mockEmail = `selenium_email${timestamp}@email.com`;
const mockName = "selenium_name" + timestamp;

let createdPostId = null;

async function testFlows() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await registerTest(driver);
    await loginTest(driver);
    await postTest(driver);
  } catch (error) {
    console.error(error);
  } finally {
    // Close the browser
    //driver.quit();
  }
}

async function registerTest(driver) {
  try {
    await driver.get("http://127.0.0.1:3001/register");

    const usernameInput = await driver.findElement(By.id("usernameInput"));
    const passwordInput = await driver.findElement(By.id("passwordInput"));
    const emailInput = await driver.findElement(By.id("emailInput"));
    const nameInput = await driver.findElement(By.id("nameInput"));
    const registerButton = await driver.findElement(By.id("registerButton"));

    await usernameInput.sendKeys(mockUser);
    await passwordInput.sendKeys(mockPass);
    await emailInput.sendKeys(mockEmail);
    await nameInput.sendKeys(mockName);

    await registerButton.click();

    await driver.wait(until.urlContains("/login"), 10000);

    const url = await driver.getCurrentUrl();
    console.log("Register successful. Page URL:", url);
  } catch (error) {
    throw ("Register failed:", error);
  }
}
async function loginTest(driver) {
  try {
    await driver.get("http://127.0.0.1:3001/login");

    const usernameInput = await driver.findElement(By.id("usernameInput"));
    const passwordInput = await driver.findElement(By.id("passwordInput"));
    const loginButton = await driver.findElement(By.id("loginButton"));

    await usernameInput.sendKeys(mockUser);
    await passwordInput.sendKeys(mockPass);

    await loginButton.click();

    await driver.wait(until.urlContains("/all-posts"), 10000);

    const url = await driver.getCurrentUrl();
    console.log("Login successful. Page URL:", url);
  } catch (error) {
    throw ("Login failed:", error);
  }
}

async function postTest(driver) {
  try {
    await driver.get("http://127.0.0.1:3001/write");

    await driver.sleep(5000)

    const titleInput = await driver.findElement(By.id("titleInput"));
    const textInput = await driver.findElement(By.id("textInput"));
    const jsonInput = await driver.findElement(By.id("jsonInput"));
    const submitButton = await driver.findElement(By.id("submitButton"));

    await titleInput.sendKeys("titleInput");
    await textInput.sendKeys("textInput");
    await jsonInput.sendKeys("jsonInput");

    await submitButton.click();

    await driver.wait(until.urlContains("/view/"), 10000);

    const url = await driver.getCurrentUrl();
    createdPostId = url.split("/view/")[1];
    console.debug("createdPostId", createdPostId);
    console.log("Posting successful. Page URL:", url);
  } catch (error) {
    throw ("Posting failed:", error);
  }
}

testFlows();
