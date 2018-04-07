var newSiteArr = ["https://www.cnn.com/", "https://www.nytimes.com/", "https://www.bloomberg.com/", "https://www.theguardian.com/us", "https://www.washingtonpost.com/", "https://www.yahoo.com/news/", "https://www.economist.com/", "https://www.usatoday.com/", "https://www.huffingtonpost.com/", "https://www.wsj.com/", "https://www.reuters.com/", "https://www.cnbc.com/", "http://www.bbc.com/news", "http://time.com/", "http://www.latimes.com/", "https://www.usnews.com/", "http://thehill.com/", "https://www.theatlantic.com/", "http://www.newsweek.com/", "https://www.thedailybeast.com/", "https://www.buzzfeed.com/", "https://www.politico.com/", "https://www.nationalgeographic.com/", " http://abcnews.go.com/", "https://www.cbsnews.com/", "https://www.nbcnews.com/", "http://www.businessinsider.com/", "https://www.vox.com/", "https://slate.com/", "https://www.sciencedaily.com/"]

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    for (var i = 0; i < newSiteArr.length; i++) {
        if (~tab.url.indexOf(newSiteArr[i])) {
            chrome.pageAction.show(tabId);
            break;
        }
    }
});

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

chrome.storage.sync.get('userid', function (items) {
    var userid = items.userid;
    if (userid) {
        useToken(userid);
        console.log("user created " + userid)
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({
            userid: userid
        }, function () {
            console.log("I am stored " + userid);
            useToken(userid);
        });
    }

    function useToken(userid) {
        // TODO: Use user id for authentication or whatever you want.
        console.log("token " + userid)

        axios.post(`http://localhost:3000/users/${userid}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
});



