chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
  if (tab.url.indexOf("http://www.drmcq.com/MCQ/Booklet/") != -1) { // Inspect whether the place where user clicked matches with our list of URL
      chrome.tabs.executeScript(tab.id, {file: "fetch.js"}, function () { // Execute your code

      });
  }
});
