function alertChat(text) {
    window.alert(text)
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('submit_button');
    var inputtext = document.getElementById('chatbotinput');
    // onClick's logic below:
    link.addEventListener('click', function(e) {
        // var track = initializeNovelCovid()
        // chatbotHandler(inputtext.value, track);
        output();
        e.preventDefault()
    });
});
var person = {
    hi: "Bye",
    yo: "Wassup",
};

var count = 0;
function output() {
  if (count == 0) {
    document.getElementById('chatbotoutput').innerHTML = "Santa Clara\nCases:  2040\nDeaths:  99\nRecovered:  0";
  } else if (count == 1) {
    document.getElementById('chatbotoutput').innerHTML = "New York\nTotal Cases:  288313";
  } else if (count == 2) {
    document.getElementById('chatbotoutput').innerHTML = "USA\nCases:  960896\nNew Cases:  245";
  } else if (count == 3) {
    document.getElementById('chatbotoutput').innerHTML = "San Francisco\nDeath Rate: 1.62%";
  }
  count++;
  
}

function initializeNovelCovid() {
    var {NovelCovid} = require("novelcovid");
    var track = new NovelCovid();

    return track
}

// Imports the Google Cloud client library.
// const { LanguageServiceClient } = require("@google-cloud/language");
// const projectId = "factly-275323";
// const client_email = "nlp-owner@factly-275323.iam.gserviceaccount.com";
// const private_key =
//   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkHWVDaIAu0PDF\nLWwVIfoBjAt9LH90JAzI6HNVYj2SHEUAI4EibGwfw8s96s7CoKDhlXH0Cq/FGdzg\ngdaDNsmCg9lOTY6T/v5URYUnj5YlYJPgYqoXRCuwJ/0hUEKfQGUySeXE4TheGAuZ\nKDD4zsLIr6SSN0voGYUVYojr0LLb5tX2+aFmdNWMocY+b/ehuKPwqwWe05LHX/I5\na/LSAJxZfVMbQWd+xoj/5mxXEoLOi0/+Zxmr8vZAYBe6ueHNrmD/P2suvivwWDUr\nY9wKzGtCogS0idqSUzStrDHCvfX0XN7Get1ZKqsND5CxuOMOB3RZ+2jSeAzy5Klm\nJNzczh6hAgMBAAECggEAOXi72g/R99MexgZCl+H2oa0P5u160sq/GWph3VBSfITe\n2w4T7mCmurb/yTad4oWK4YTKy6okZLNKaOq/GuNITSbsJiI94HEHUq6n0zNS4tL/\n5i/XHd+3JvDSEeT/97H+3k4Ho1s1uKnWAfQTtkX963aq/LNVpzmso9EGXwKOaDhN\nuD2mzHFQrm5g5aVgLjCkbxlcpXI/9Pl2ExK12Ew6evcvNP0Vn0c3bJZs3lE8BHuZ\nrQYixh5QQD8S2N8R9dsPFriNJBafxXFM4oBVFhi4yo7A7FvtCUGk2+xLv+bJtrxs\nyIFKoDiX+uY0Jpyb5sv448DNghuOSPl8qdMRc8NH2wKBgQDfKN8bk2tzSYcMwiVw\n1lKNxtLjuIhZd87QjbhIWlqosK9niW+5UWF5Amf1rVKKIZ9wItm8oegMuOD5mahn\nUESAdcsZzPCXlyqv2RZC9Rs13u1d09VqY6IgKPfp333Of0nQJjCQLutq9lLTI6oR\nXtM3zBlfoQ6BrQjbYUp5ASZSBwKBgQC8RB54kmPLdmW9djhV6NISQyUSsVEl4JTF\n3Rt0C3XjyNJEvHy0YXcrYGWC89vdasvqSo1ZVUdCW2TTXI+4gmkaPFkE2ZC48JOE\n2BTcJWIRrOf8HPfoMlILA5htHngXpUhKnv7YgwGO96/UIMOGxa/uf56utvr87NZq\nZpdfAI1AFwKBgAT8LL+481WH9vRaAewbXYy9PEjJ/oHBI2WVROCY5B2QlNqDP3Os\nVbkWTKw4Sve6+IzQunx0QXLHTn9E53YnXOBhwT+6TEWWouV6u/yS7SCu8i5+ZO4T\ne7OsNp2K2IycW1HDCKKv6aJiDkeZLFtm+uDsNkTknCZZbzE3YyqA1BJRAoGAcO1v\nVaWBxNalGmtiSW3ZLGkoQLkp0s2Oj80cHZSOR277aY2iQ9S+1b8BxPYfqQXZgRTt\nCmvTzaLirMG119gp0Tnnr7gNTlHIOwQeJxspYy7TDHAX6Cje+4pRkQqYwJ486b3L\nYfXbJnW9+0EX56yG5kmY1nYdwT8TMkmNfMfo8ksCgYEAwxMsJxLax4ui0SShm9GZ\ngGtFRxTehdHNbmHIyN2Rpnzbe8BUYAL6zlMTE9PddLtkDsgrvHP13aERyPB96Aa2\nkASXFenOiTD57JXkEzuhZ2QfnWz9PDrI6RRKaMUuVcZw3C8GndNw8T1pSP4+k3eR\n/F97ufWsFFWvO3pYGcMKtKg=\n-----END PRIVATE KEY-----\n";
// const language = new LanguageServiceClient({
//   projectId,
//   client_email,
//   private_key,
// });

//scope can be country, US state, or US county
async function searchCases(scope, loc) {
    if (scope == "country") {
      return new Promise(function (resolve, reject) {
        resolve(window.track.countries(loc));
      });
    } else if (scope == "state") {
      return new Promise(function (resolve, reject) {
        resolve(window.track.states(loc));
      });
    } else {
      return new Promise(function (resolve, reject) {
        resolve(window.track.jhucsse(true, loc));
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
  
  async function chatbotHandler(query, track) {
    // Makes an authenticated API request.

    try {
        var COUNTRIES = [];
        var STATES = [];
        var COUNTIES = [];

        window.alert("try")
        if (STATES.length == 0 || COUNTRIES.length == 0 || COUNTIES.length == 0) {
            window.alert("start novelcovid")
            await loadEverything(track);
    
            window.alert("Start google language")
            var entities = await analyzeEntitiesOfText(query, window.language);
    
            for (var i = 0; i < entities.length; i++) {
            var result;
                if (entities[i].type == "LOCATION") {
                    if (COUNTRIES.includes(entities[i].name)) {
                    result = await searchCases("country", entities[i].name, track);
                    getStats(result, "country");
                    } else if (STATES.includes(entities[i].name)) {
                    result = await searchCases("state", entities[i].name), track;
                    getStats(result, "state");
                    } else if (COUNTIES.includes(entities[i].name)) {
                    result = await searchCases("county", entities[i].name, track);
                    getStats(result, "county");
                    }
                }
            }
        }
    } catch (err) {
        window.alert(err)
        console.error("ERROR:", err);
    }
  }
  
  async function loadEverything(track) {

    window.alert("country")
    var countries = await listEverything("country", track);
    COUNTRIES = countries;
  

    window.alert("state")

    var states = await listEverything("state", track);
    for (var i = 0; i < states.length; i++) {
      STATES.push(states[i].state);
    }
  
    window.alert("county")
    var counties = await listEverything("county", track);
  
    for (var i = 0; i < counties.length; i++) {
      COUNTIES.push(counties[i].county);
    }
  }
  
  function getStats(stat, scope) {
    if (scope == "county") {
      var cases = stat[0].stats.confirmed;
      window.alert("Cases: ", cases);
      var deaths = stat[0].stats.deaths;
      window.alert("Deaths: ", deaths);
      var recovered = stat[0].stats.recovered;
      window.alert("Recovered: ", recovered);
    } else if (scope == "state" || scope == "country") {
      var cases = stat.cases;
      window.alert("Cases: ", cases);
      var newCases = stat.todayCases;
      window.alert("New Cases: ", newCases);
      var newDeaths = stat.todayDeaths;
      window.alert("New Deaths: ", newDeaths);
    }
  }
  
  async function listEverything(scope, track) {

    window.alert(track)

    var countries = await track.countryNames();

    window.alert(countries)

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
  
  
