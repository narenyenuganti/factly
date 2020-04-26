
// var chatBotInput = document.getElementById('chatInput')

// var x = document.getElementsByName('chatbotinput').value;
// document.getElementsByName('')

// var nameValue = document.getElementById("uniqueID").value;


/* <form>
  <input type="text" id="searchTerm" />
  <input type="submit" value="Submit" id="submitButton" />
</form> */

// document.getElementById('theform').onsubmit = function() { 
//     console.log(document.getElementById('searchTerm').value);
//     return false;
// };


// chatBotInput.onsubmit = function(){
//     window.alert(chatBotInput.value)
// }

// var chatBotInput = document.getElementsByName('chatbotinput')
// var chatButton = document.getElementById('submit_button')

// chatButton.addEventListener("click", alertChat)

function alertChat(text) {
    window.alert(text)
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_button');
    var inputtext = document.getElementById('chatbotinput');
    // onClick's logic below:
    link.addEventListener('click', function() {
        alertChat(inputtext.value)
    });
});




//scope can be country, US state, or US county
async function searchCases(scope, loc) {
    if (scope == "country") {
      return new Promise(function (resolve, reject) {
        resolve(track.countries(loc));
      });
    } else if (scope == "state") {
      return new Promise(function (resolve, reject) {
        resolve(track.states(loc));
      });
    } else {
      return new Promise(function (resolve, reject) {
        resolve(track.jhucsse(true, loc));
      });
    }
  }
  
  async function analyzeEntitiesOfText(text, language) {
    const client = language;
  
    // Prepares a document, representing the provided text
    const document = {
      content: text,
      type: "PLAIN_TEXT",
    };
  
    // Detects entities in the document
    const [result] = await client.analyzeEntities({ document });
  
    const entities = result.entities;
  
    return entities;
  }
  
  async function chatbotHandler(query) {
    // Makes an authenticated API request.
    try {
      if (STATES.length == 0 || COUNTRIES.length == 0 || COUNTIES.length == 0) {
        await loadEverything();
  
        var entities = await analyzeEntitiesOfText(query, language);
  
        for (var i = 0; i < entities.length; i++) {
          var result;
          if (entities[i].type == "LOCATION") {
            console.log(entities[i].name);
            if (COUNTRIES.includes(entities[i].name)) {
              result = await searchCases("country", entities[i].name);
              getStats(result, "country");
            } else if (STATES.includes(entities[i].name)) {
              result = await searchCases("state", entities[i].name);
              getStats(result, "state");
            } else if (COUNTIES.includes(entities[i].name)) {
              result = await searchCases("county", entities[i].name);
              getStats(result, "county");
            }
          }
        }
      }
    } catch (err) {
      console.error("ERROR:", err);
    }
  }
  
  async function loadEverything() {
    var countries = await listEverything("country");
    COUNTRIES = countries;
  
    var states = await listEverything("state");
    for (var i = 0; i < states.length; i++) {
      STATES.push(states[i].state);
    }
  
    var counties = await listEverything("county");
  
    for (var i = 0; i < counties.length; i++) {
      COUNTIES.push(counties[i].county);
    }
  }
  
  function getStats(stat, scope) {
    if (scope == "county") {
      var cases = stat[0].stats.confirmed;
      console.log("Cases: ", cases);
      var deaths = stat[0].stats.deaths;
      console.log("Deaths: ", deaths);
      var recovered = stat[0].stats.recovered;
      console.log("Recovered: ", recovered);
    } else if (scope == "state" || scope == "country") {
      var cases = stat.cases;
      console.log("Cases: ", cases);
      var newCases = stat.todayCases;
      console.log("New Cases: ", newCases);
      var newDeaths = stat.todayDeaths;
      console.log("New Deaths: ", newDeaths);
    }
  }
  
  async function listEverything(scope) {
    if (scope == "country") {
      return new Promise(function (resolve, reject) {
        resolve(track.countryNames());
      });
    } else if (scope == "state") {
      return new Promise(function (resolve, reject) {
        resolve(track.states());
      });
    } else {
      return new Promise(function (resolve, reject) {
        resolve(track.jhucsse(true));
      });
    }
  }
  
//   chatbotHandler("Number of coronavirus cases in Santa Clara");
  
