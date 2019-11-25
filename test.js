var webdriver = require("selenium-webdriver");
var fs = require('fs');

require("geckodriver");// Application Server
const serverUri = "http://localhost:3000/#";

var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "chrome" })
 .build();
 
function takeScreenshot() {
  return new Promise((resolve, reject) => {
    browser.takeScreenshot().then(function(data){
      resolve(data);
    });  
  });
}

describe("Home Page", function() {
  it("Should take a screenshot", function() {
    return new Promise((resolve, reject) => {
      browser
        .get(serverUri)
        .then(takeScreenshot)
        .then(screenshot => {
          var base64Data = screenshot.replace(/^data:image\/png;base64,/,"")
          fs.writeFile("actual/foo.png", base64Data, 'base64', function(err) {
            if(err) console.log(err);
          });

          resolve();
        })
        .catch(err => reject(err));
    });
  });
 
  after(function() {
    browser.quit();
  });
});