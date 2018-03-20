chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
    if (~tab.url.indexOf('https://www.nytimes.com/')) {
    chrome.pageAction.show(tabId);
    }
    });

    