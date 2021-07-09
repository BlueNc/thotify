console.log('toto')

chrome.contextMenus.create({
  id: "thotify-selection",
  title: "Thotify: %s",
  contexts:["selection"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "thotify-selection") {
    chrome.tabs.create({
      url: chrome.runtime.getURL('index.html') + '?page=server&value=' +  info.selectionText
    });
  }
});
