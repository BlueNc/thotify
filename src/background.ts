console.log('Thotify service worker started !')

chrome.contextMenus.create({
  id: "thotify-selection",
  title: "Thotify: %s",
  contexts:["selection"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "thotify-selection" && info.selectionText) {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html') + '#/search?value=' +  encodeURIComponent(info.selectionText)
    });
  }
});


chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.tabs.create({
    url: chrome.runtime.getURL('index.html') + '#/search?value=' +  encodeURIComponent(text)
  });
});

chrome.runtime.onInstalled.addListener(function (object) {
  if (object.reason === 'install') {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html') + '#/getting-started'});
  }
});
