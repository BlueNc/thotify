console.log('Thotify service worker started !')

chrome.contextMenus.create({
  id: "thotify-selection",
  title: "Thotify: %s",
  contexts:["selection"]
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "thotify-selection") {
    chrome.windows.create({
      url: chrome.runtime.getURL('index.html') + '?page=search&value=' +  info.selectionText,
      type: 'popup'
    });
  }
});
