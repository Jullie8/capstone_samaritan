
CLIENT_ID = config.ID;
CLIENT_SECRET = config.SECRET;

//get current url
chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true
  }, function (tabs) {
  var url = tabs[0].url;
  watsonCallFunc(url);
})

var watsonCallFunc = function (url_var) {
  console.log(url_var)
  axios.get(`https://watson-api-explorer.mybluemix.net/natural-language-understanding/api/v1/analyze?version=2017-02-27&url=${url_var}&features=concepts%2Ckeywords%2Ccategories&return_analyzed_text=false&clean=true&fallback_to_raw=true&concepts.limit=8&emotion.document=true&entities.limit=50&entities.mentions=false&entities.emotion=false&entities.sentiment=false&keywords.limit=50&keywords.emotion=false&keywords.sentiment=false&relations.model=en-news&semantic_roles.limit=50&semantic_roles.entities=false&semantic_roles.keywords=false&sentiment.document=true`)
    .then(function (response) {
      console.log(response);
      //console.log(response.data.categories[0].label);
      let labelStr = response.data.categories[0].label;
      let labelArr = labelStr.split("/");
      let category = labelArr.slice(-1)[0];
      console.log(labelArr);
      console.log(category);

      let concept = response.data.concepts[0].text;
      console.log("concept: " + concept);
      let keywords = [];
      keywords.push(response.data.keywords[0].text);
      keywords.push(response.data.keywords[1].text);
      console.log("keywords " + keywords);

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
      console.log("arr length " + response.data.length);
      let charities = [];

      if(response.data.length === 0){
        defaultCharities();
      }
      else {

      let totalCharities = 5; //number of total charities dispalyed in pop up

        if(response.data.length < totalCharities){
          totalCharities = response.data.length;
      }
      for (let i = 0; i < totalCharities; i++) {
        //split into words and do word count; check if asks with <
        let length = 24;
        let missionArr = (response.data[i].mission).split(" ");
        let missionShort = "";

        for(let i=0; i < length; i++){
          missionShort+= " " + (missionArr[i]);
        }
        missionShort += "..."

        // Fix for "Dr."  "Mr." "Inc." 
        //escape <>

        charities.push({
          name: response.data[i].charityName,
          mission: missionShort,
          category: response.data[i].category.categoryName,
          cause: response.data[i].cause.causeName,
          URL: response.data[i].organization.charityNavigatorURL,
          rating: response.data[i].currentRating.rating
        });
      }

      console.log("charities" + charities);      
      // call render html func 
      renderCharities(charities);
    }
    })

  .catch(function (error) {
    console.log(error);
    
    // call default charities function
    defaultCharities();

  });
}

function storeCharity(userId, charityName, charityUrl) {

  axios.post(`http://localhost:3000/users/${userId}/charities`, {
    URL: charityUrl,
    charityName: charityName,
    user_id: userId
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function renderCharities(charities){
  console.log("render func call " + charities);

  var loader = document.getElementById("loader");
  loader.parentNode.removeChild(loader);

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

    //display name, mission, button (with URL)
    var charityName = document.createTextNode(charities[i].name);
    var charityMission = charities[i].mission;
      
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
        // API call to database with user_id and charity info
        console.log("Button clicked! " + charities[i].name + " " + charities[i].URL);
        chrome.storage.sync.get('userid', function (items) {
        var userid = items.userid;
        console.log("user id in popup : " + userid)
        storeCharity(userid, charities[i].name, charities[i].URL);
        })
        var x = window.open(`${charities[i].URL}`, "_blank");
      };
    }(i));  

    nameDiv.appendChild(charityName);
    missionDiv.innerHTML = charityMission;
    charityDiv.appendChild(nameDiv);
    charityDiv.appendChild(missionDiv);
    charityDiv.appendChild(buttonDiv);
    charityList.appendChild(charityDiv); 
    var hr = document.createElement('hr');
    charityList.appendChild(hr);    
  }
}

function defaultCharities() {
  console.log('No charities were returned');
  var noData = document.getElementById('noData');
  noData.innerHTML = ('Sorry, we could not find any matching charities, but check out the following organizations:'); 
  
        defaultCharities = [];
        defaultCharities.push({
          name: "World Wildlife Fund",
          mission: "Founded in 1961, World Wildlife Fund's (WWF) mission is the conservation of nature. Using the best available scientific knowledge and advancing that knowledge where we can, we work to preserve the diversity and abundance of life on Earth and the health of ecological systems.",
          URL: "https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=4770"
        })
        defaultCharities.push({
          name: "American Civil Liberties Union Foundation",
          mission: "The American Civil Liberties Union (ACLU) Foundation is the arm of the ACLU that conducts litigation and communication efforts. The Foundation provides legal presentation in cases involving issues of civil liberties and constitutional rights ranging from administrative hearings to trials and appeals.",
          URL: "https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=3247"
        })
        defaultCharities.push({
          name: "Doctors Without Borders, USA",
          mission: "Doctors Without Borders, USA (DWB-USA) was founded in 1990 in New York City to raise funds, create awareness, recruit field staff, and advocate with the United Nations and US government on humanitarian concerns.",
          URL: "https://www.charitynavigator.org/index.cfm?bay=search.summary&orgid=3628"
        })

        // call render html func with default charities 
        console.log(defaultCharities);
        renderCharities(defaultCharities);
}
