//    var CLIENT_ID = undefined;
//    var CLIENT_SECRET = undefined;

// var list = document.getElementById('list');

// document.addEventListener('DOMContentLoaded', () => {
    CLIENT_ID = config.ID;
    CLIENT_SECRET = config.SECRET;
//    //watsonCat is an empty array for storing categories imported from the watson API
//    watsonCat = [];
//   //charity navigator will take those categories and perform a query search 

//  var request = new XMLHttpRequest();

//   request.open('GET', `https://api.data.charitynavigator.org/v2/Organizations?app_id=${CLIENT_ID}&app_key=${CLIENT_SECRET}&search=pollution&minRating=4&sort=RELEVANCE%3ADESC`, true);
//   //create callback
//   //when the page loads
//   request.onreadystatechange = function () {
//     //if request status code is OK 
//     if (request.readyState == request.DONE) {
//       var responseData = JSON.parse(request.responseText);
//       renderHTML(responseData)

//       console.log(responseData[0].charityName + responseData[0].mission);
//     }
//   }
//   request.send();

//   console.log(request.readyState);
//   console.log(request.status)
// }); 


//user preference
newsCategories = [];

currentCat = [];

for (var i = 0; i < currentCat.length; i++) {
  if (currentCat == 'pollution') {

  }
}

var url_var="https%3A%2F%2Fwww.washingtonpost.com%2Fnews%2Fspeaking-of-science%2Fwp%2F2018%2F03%2F27%2Farchaeologists-discover-81-ancient-settlements-in-the-amazon%2F%3Futm_term%3D.a0a00031bc2b";

axios.get(`https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&url=${url_var}&features=concepts%2Ccategories&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.mentions=false&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


axios.get(`https://api.data.charitynavigator.org/v2/Organizations?app_id=${CLIENT_ID}&app_key=${CLIENT_SECRET}&search=pollution&minRating=4&sort=RELEVANCE%3ADESC`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

function renderHTML(response) {
  var htmlString =  "";
    for (i = 0; i < response.length; i++) {
    htmlString += "<li>" + response[i].charityName + "</li>";
}
list.innerHTML;
}