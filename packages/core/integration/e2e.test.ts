import * as puppeteer from "puppeteer";
const path = require("path");

describe("Google", () => {
  it('should display "google" text on page', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");

    const textContent = await page.evaluate(() => {
      const q = document.querySelector("button");

      return !q ? false : q.textContent;
    });

    expect(textContent).toMatch("Switch");

    browser.close();
  });

  it("should show empty DropDown", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");

    const button = await page.evaluate(() => document.querySelector("input"));

    await page.click("input");

    await page.waitFor("aside");

    const textContent = await page.evaluate(() => {
      const q = document.querySelector("aside");

      return !q ? false : q.textContent;
    });

    console.log(button, textContent);

    expect(textContent).toMatch("Nothing found");

    browser.close();
  });

  it("should show import CSV", async () => {
    jest.setTimeout(30000);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");

    await page.click("button");

    await page.waitForSelector("#uploadField");

    const fileEle = await page.$("#uploadField");

    if (!fileEle) {
      return browser.close();
    }

    const filePath = path.relative(
      process.cwd(),
      __dirname + "/assets/test.csv"
    );

    await fileEle.uploadFile(filePath);

    await page.click("#uploadButton");

    await page.waitFor(1000);

    const textContent = await page.evaluate(() => {
      const q = document.querySelectorAll("svg")[1];

      return !q ? false : q.textContent;
    });

    console.log(textContent);

    expect(textContent).toMatch("100%");

    browser.close();
  });

  it("should show search results", async () => {
    jest.setTimeout(30000);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://localhost:3000/");

    await page.click("button");

    await page.waitForSelector("#uploadField");

    const fileEle = await page.$("#uploadField");

    if (!fileEle) {
      return browser.close();
    }

    const filePath = path.relative(
      process.cwd(),
      __dirname + "/assets/test.csv"
    );

    await fileEle.uploadFile(filePath);

    await page.click("#uploadButton");

    await page.waitFor(1000);

    await page.click("button");

    await page.focus("#downshift-1-input");

    await page.type("#downshift-1-input", "Calvin");

    await page.waitFor(1000);

    const textContent = await page.evaluate(() => {
      const q = document.querySelectorAll("#downshift-1-item-0")[0];

      return !q ? false : q.textContent;
    });

    expect(textContent).toMatch("Calvin James");

    browser.close();
  });
});
