
var newSiteArr= ["https://www.cnn.com/" , "https://www.nytimes.com/" , "https://www.bloomberg.com/",  "https://www.theguardian.com/us", "https://www.washingtonpost.com/", "https://www.yahoo.com/news/", "https://www.economist.com/",  "https://www.usatoday.com/",  "https://www.huffingtonpost.com/", "https://www.wsj.com/", "https://www.reuters.com/", "https://www.cnbc.com/", "http://www.bbc.com/news",  "http://time.com/", "http://www.latimes.com/", "https://www.usnews.com/",  "http://thehill.com/", "https://www.theatlantic.com/", "http://www.newsweek.com/", "https://www.thedailybeast.com/", "https://www.buzzfeed.com/" , "https://www.politico.com/", "https://www.nationalgeographic.com/", " http://abcnews.go.com/", "https://www.cbsnews.com/", "https://www.nbcnews.com/", "http://www.businessinsider.com/",  "https://www.vox.com/", "https://slate.com/", "https://www.sciencedaily.com/"]


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    for(var i= 0; i<newSiteArr.length; i++) {
        console.log(newSiteArr[i])
        if (~tab.url.indexOf(newSiteArr[i])) {
            console.log("if statement");
            chrome.pageAction.show(tabId);
            break;
        }
    }
});

