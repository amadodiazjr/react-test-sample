/**
 * Dependency Modules
 */
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
var fs = require('fs');

require("geckodriver");// Application Server
const serverUri = "http://localhost:3000/#";
const appTitle = "React App";

/**
 * Config for Chrome browser
 * @type {webdriver}
 */
var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "chrome" })
 .build();
 
//  new Promise((resolve, reject) => {
//   browser
//    .get(serverUri)
//    .then(logTitle)
//    .then(title => {
//     assert.strictEqual(title, appTitle);
//     resolve();
//    })
//    .catch(err => reject(err));
//  });
 
 /**
 * Config for Firefox browser (Comment Chrome config when you intent to test in Firefox)
 * @type {webdriver}
 */

 /*
var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "firefox" })
 .build();
 */

 /**
 * Function to get the title and resolve it it promise.
 * @return {[type]} [description]
 */
function takeScreenshot() {
  return new Promise((resolve, reject) => {
    browser.takeScreenshot().then(function(data){
      resolve(data);
    });  
  });
}

describe("Home Page", function() {
  /**
   * Test case to load our application and check the title.
   */
  it("Should load the home page and get title", function() {
    return new Promise((resolve, reject) => {
      browser
      .get(serverUri)
      .then(takeScreenshot)
      .then(screenshot => {
        var base64Data = screenshot.replace(/^data:image\/png;base64,/,"")
        fs.writeFile("out.png", base64Data, 'base64', function(err) {
              if(err) console.log(err);
        });

        resolve();
      })
      .catch(err => reject(err));
    });
  });
 
  /**
    * End of test cases use.
    * Closing the browser and exit.
    */
  after(function() {
    // End of test use this.
    browser.quit();
  });
});