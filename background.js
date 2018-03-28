

//This is the real code- It is the real code that works on one site//

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
//     if (~tab.url.indexOf("https://www.bloomberg.com/")) {
//     chrome.pageAction.show(tabId);
//     }
//     });
//------------------------------------------------



chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
    if (~tab.url.indexOf("https://www.bloomberg.com/")) {
    chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.cnn.com/" )) {
        chrome.pageAction.show(tabId);
    }
    

    else if (~tab.url.indexOf("https://www.nytimes.com/")) {
        chrome.pageAction.show(tabId);
    }
    
    else if (~tab.url.indexOf("https://www.theguardian.com/us")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.washingtonpost.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.yahoo.com/news/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.economist.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.usatoday.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.huffingtonpost.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.wsj.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.reuters.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.cnbc.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("http://www.bbc.com/news")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("http://time.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("http://www.latimes.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.usnews.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("http://thehill.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.theatlantic.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("http://www.newsweek.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.thedailybeast.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.buzzfeed.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.politico.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://news.nationalgeographic.com/")) { 
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("http://abcnews.go.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.nbcnews.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("http://www.businessinsider.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.vox.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://slate.com/")) {
        chrome.pageAction.show(tabId);
    }


    else if (~tab.url.indexOf("https://www.sciencedaily.com/")) {
        chrome.pageAction.show(tabId);
    }

    else if (~tab.url.indexOf("https://www.cbsnews.com/")) {
        chrome.pageAction.show(tabId);
    }


    });


var newSiteArr= ["https://www.cnn.com/“ , “https://www.nytimes.com/" , "https://www.bloomberg.com/“,  “https://www.theguardian.com/us ”, “https://www.washingtonpost.com/”, “https://www.yahoo.com/news/”, “https://www.economist.com/”,  “https://www.usatoday.com/“,  “https://www.huffingtonpost.com/”, “https://www.wsj.com/”, “https://www.reuters.com/", "https://www.cnbc.com/”, “http://www.bbc.com/news”,  “http://time.com/”, “http://www.latimes.com/”, “https://www.usnews.com/”,  “http://thehill.com/”, “https://www.theatlantic.com/”, “http://www.newsweek.com/”, “https://www.thedailybeast.com/”, “https://www.buzzfeed.com/news?utm_term=.ikEgXop41#.lrNx5P6p7” , “https://www.politico.com/”, “https://www.nationalgeographic.com/”, “ http://abcnews.go.com/“, “https://www.cbsnews.com/”, “https://www.nbcnews.com/”, “http://www.businessinsider.com/”,  “https://www.vox.com/”, “https://slate.com/”, “https://www.sciencedaily.com/"]

