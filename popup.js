
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
      //console.log(response.data);

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

      // Render returned charities to HTML 
      for (var i = 0; i < charities.length; i++) {

      var charityList = document.getElementById("charities");

      var charityDiv = document.createElement("div"); 
      charityDiv.setAttribute("class", "charity");

      var nameDiv = document.createElement("div"); 
      nameDiv.setAttribute("class", "name");

      var missionDiv = document.createElement("div"); 
      missionDiv.setAttribute("class", "mission");

      var buttonDiv = document.createElement("div"); 
      buttonDiv.setAttribute("class", "button");

      // we will display name, mission, button (with URL)
      var charityName = document.createTextNode(charities[i].name);

      var charityMission = document.createTextNode(charities[i].mission);
        
      //store url link that goes inside the button
      var link = charities[i].URL;
      console.log(link);

      //  Create the button
      var charityButton = document.createElement("button");
      charityButton.innerHTML = "Donate To This Charity";

      buttonDiv.appendChild(charityButton);

      // Add event handler, closure
      charityButton.addEventListener ("click", function(i) {
        return function () {
          var x = window.open(`${charities[i].URL}`, "_blank");
        };
      }(i));  

      nameDiv.appendChild(charityName);
      missionDiv.appendChild(charityMission);
      charityDiv.appendChild(nameDiv);
      charityDiv.appendChild(missionDiv);
      charityDiv.appendChild(buttonDiv);
      charityList.appendChild(charityDiv);     
    }

  })
  .catch(function (error) {
    console.log(error);
  });
}