
CLIENT_ID = config.ID;
CLIENT_SECRET = config.SECRET;


chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true
}, function (tabs) {
  var url = tabs[0].url;
  watsonCallFunc(url);

})

var watsonCallFunc = function (url_var) {

  axios.get(`https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&url=${url_var}&features=concepts%2Ccategories&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.mentions=false&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true`)
    .then(function (response) {
      //console.log(response);
      console.log(response.data.categories[0].label);
      let labelStr = response.data.categories[0].label;
      let labelArr = labelStr.split("/");
      let category = labelArr.slice(-1)[0];
      console.log(category);
      charityNavFunc(category);

    })
    .catch(function (error) {
      console.log(error);
    });

}

var charityNavFunc = function (category_var) {

  axios.get(`https://api.data.charitynavigator.org/v2/Organizations?app_id=${CLIENT_ID}&app_key=${CLIENT_SECRET}&search=${category_var}&minRating=4&sort=RELEVANCE%3ADESC`)
    .then(function (response) {
      console.log(response.data);

      let charities = [];

      for (let i = 0; i < 5; i++) {
        charities.push({
          name: response.data[i].charityName,
          mission: response.data[i].mission,
          category: response.data[i].category.categoryName,
          cause: response.data[i].cause.causeName,
          URL: response.data[i].organization.charityNavigatorURL,
          rating: response.data[i].currentRating.rating
        });
      }

      console.log(charities);

      axios.post('/db/charityInfo.sql', {
        charityName: this.charityName.value,
        mission: this.mission.value,
        category: this.category.categoryName.value

      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

        //loop through the array
        for (var i = 0; i < charities.length; i++) {
       
        //  bind to unordered list by id
        var displayCharityList = document.getElementById("charities_results"); 
        
        // create a new li
        var newLI = document.createElement("li") 
        console.log(newLI)
        
        // create a new content
        var newContent = document.createTextNode(charities[i].name);

        // append new content to the li
        newLI.appendChild(newContent);

        //append newLI to the ul
        displayCharityList.appendChild(newLI);

        //the above code only render the charity name thus far
      }


    })
    .catch(function (error) {
      console.log(error);
    });
}