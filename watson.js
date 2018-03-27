// This also requires npm installing IBM Watson's natural language understanding. 

//var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var clientID = config2.ID;
var clientKey = config2.SECRET;

var nlu = new NaturalLanguageUnderstandingV1({
  username: clientKey,
  password: clientID,
  version: '2017-02-27',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/'
});

var currentURL = 'https://www.washingtonpost.com/news/energy-environment/wp/2018/03/22/plastic-within-the-great-pacific-garbage-patch-is-increasing-exponentially-scientists-find/?utm_term=.4b0db9779f4e'

var parameters = {
    'url': currentURL,
    'features': {
        'categories': {}
    }
  };
  
nlu.analyze(parameters, function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
  });