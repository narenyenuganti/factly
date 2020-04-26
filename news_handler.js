const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6a022b8162534fdaa0da0d6902608349");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

// Imports the Google Cloud client library.
const { LanguageServiceClient } = require("@google-cloud/language");
const projectId = "factly-275323";
// const key_file = "factly-275323-4ac6af08b025.json";
const client_email = "nlp2-620@factly-275323.iam.gserviceaccount.com";
const private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC29FoUY3KgCMR5\na3qbERVgDajmkqLqxS/HoadLt8BO33tcycMHSaG3JIt3c+l/7KLqmGHBZsvoqwHA\nsMjACbaYcRkYZenJ1CU/8vaxt6BXq1quEOQplr5Rsa6xfvBDdkBgqxLho5boycBm\n60XoGKCW8NgsIFIPhz1HPjcejS5dWn/Lmd29wEjYlxNIQpwu3M5vJ9mFJcEUsJ80\nBDZphk98RpKOhcreZwG1HJJ0418tZSCGkX6KguBiiHxAzgTsZcWq1e8GJcAGuH7+\nhq3vkPktSF5jwgScBhG78ZIqkX1uovPDJgAbXywQBuCYYUzBTNpOFSeo0aolHOhC\nraXOdtPhAgMBAAECggEAK1SE7xY8hBV/fuhLIeWyY8zoZy9sgWDRN50cE61B0QxR\n2cB5PcUdFVSE6XYc46zGSvxrDpSLj5/MqvfTm9PRGJqUoHgmniPt7I7dCWsdgRX2\nxIoAl675hTypTKVtPvUHOz3ZG3KUn66EsHthU55djlIdSJohBUd45mIgSM6UIAyT\n+YiX0aGK+WPMaPsEj47JF/MYpAv8NLddZraxAeA6Wjj8N2kAeJwfBlKNu54qkJXX\nrorDBKZGj0Z8gryegEtsahcD8PmpGgHsA+JfDlI0fDu6+mvReHXQdaNd/Fw0Xnir\njMYjQTmzR5xc6EIAt8tyiimDwlAYzSoFNNpxkPESyQKBgQDbL7WQ0WZG8oW6TuMV\ngnuI/M1cB4oP9XHT/13IK0OvErAzCMTh3OuVEKXFxh4DJQxfiIl3WWB26xxW6o3o\no1bwu8P0hv0wlNcVZB/yNyzFWq2UsQr8BvFa8vw03wHY+uqG/4oZWfsuJiBZhUYq\ngjSvarOvyOaVwivIxT9s8ZZnPQKBgQDVrsq9BjDH4oJL8JmU5cVRHJ5RNDPv2c66\neu9AwPLrUT78EeSi8uioLxrj1h4EFiDalV/WUM4LqQiL8BB5W7Rtxs+1RlIuBlHD\noGHJSoJSgmcT+zCOvfq/J/ZijYGYOCmiWgICuNTSdQKuatOrPiSwSsSNgigR3fF4\ntDwzDQKJdQKBgAnXv6CMNrqS43x1VG8/18pUB+jNEd8bl4v8mLqHbteq0CzKhQTb\nhdzAzaDu/6QGguK7X+jzI4jTkAc7Kzo6M4pF9EvD0BThajM0ttaKscD/DHJz7Nla\nenYqGTdKmGulAOklCo+O4d+1qJg8iuUXycPi18TaEbjB6nNuoCWFR8rFAoGBAI6x\nLomTvLd+NuxnOugHmABWUBKB/bzJghddSK/BKXaixqClgjyeYWcOLbK/pUOtUzsk\nTN9dDnsS4bYxFY81AgPco4+16eL6LVepniNBMk3O7u6U6xQnIW7NTOb6//OabZMQ\n8A7JRrVTlfrLM5ZC5VUkWKT2qbNktn+YPCsLIQqRAoGAY9I1oQri40phj3AAFCpo\nXWfMxDDo7rTQHXSnAXYarVLyrYBho6bm6XMuoomAaphiUKLm4k3T19Ywaw8mzVhn\nnJtEqvUHVbLDZI6zg9iUr4k6xNBJ6keXttiD60wwyrGaYF86sEAizW6ZkQNw6aGx\niV0U9QsdyiZJ5Yv9Spx+5vk=\n-----END PRIVATE KEY-----\n";
const language = require('@google-cloud/language');
// const language = new LanguageServiceClient({
//   projectId,
//   // key_file,
//   client_email,
//   private_key,
// });

var COUNTRIES = [];
var STATES = [];
var COUNTIES = [];
const maxNumArticles = 3;
// SOURCE: https://www.newsguardtech.com/coronavirus-misinformation-tracking-center/?fbclid=IwAR2FYJddK-F3zQEGFmdcLmdEnbrOn3C_f00nu8PdUBVPLi6xQcxL1IceSvQ
var BLACKLIST =
  "4chan.org, 8ch.net, Americanjournalreview.com, Americasfreedomfighters.com, Americaslastlineofdefense.org, Americatalks.com, Banned.news, BannedInformation.com, Biased.news, BigLeaguePolitics.com, Bioterrorism.news, BlingNews.com, Breaking13News.com, Brighteon.com, BuffaloChronicle.com, CDC.news, CaliforniaCollapse.news, Cbinfo24.com, Censorship.news, Channel23News.com, Collective-Evolution.com, Conservativeangle.com, Conspiracy.news, Cures.news, DCClothesline.com, DCDirtyLaundry.com, Daily-vine.com, Depopulation.news, DiamondandSilk.com, DoctorDavidFriedman.com, DrSergeGregoire.com, En-Volve.com, Eugenics.news, Extinction.news, FactCheck.news, Faked.news, Fbnewscycle.com, Fellowshipoftheminds.com, Freedom.news, GNews.org, Gellerreport.com, GreenMedInfo.com, Health.news, HealthImpactNews.com, HealthNutNews.com, Herbs-Info.com, Herbs.news, HolisticHealth.one, HomeNaturalCures.com, Honest.news, HumansAreFree.com, Infections.news, InfoWars.com, Intellihub.com, JimBakkerShow.com, JimHumble.co, Journalism.news, KAGfeed.com, Londonwebnews.com, MMinfo24.com, MediaFactWatch.com, MedicalExtremism.com, Medicine-Today.net, Medicine.news, Mercola.com, NTDnews.com, NYTWatch.com, NYeveningnews.com, NaturalCures.news, NaturalHealth365.com, NaturalNews.com, NaturalNewsRadio.com, Naturopathy.news, Neonnettle.com, NewsFakes.com, NewsTarget.com, Newspunch.com, Now8News.com, NowTheEndBegins.com, OpenBorders.news, OrganicConsumers.org, Outbreak.news, Pandemic.news, Panic.news, Patriotswalk.us, PlantMedicine.news, Policetask.com, Politicsfocus.com, PopulationControl.news, PrankMania.com, Prntly.com, Propaganda.news, Puppetstringnews.com, RWNofficial.com, RealFarmacy.com, RealInvestigations.news, Realnewsrightnow.com, RedState.com, RedStateWatcher.com, Reddit.com, Remedies.news, Rightwingtribune.com, Risk.news, RushLimbaugh.com, SHTF.news, SOTT.net, Science.news, ScienceClowns.com, ScienceFraud.news, Scientific.news, Sheeple.news, SonsOfLibertyMedia.com, SpecialNewsUSA.com, Stgeorgegazette.com, StopMandatoryVaccination.com, Stuppid.com, Superbugs.news, TechGiants.news, TechStartups.com, Technocrats.news, The-postillon.com, TheBL.com, TheDonald.win, TheEpochTimes.com, TheGatewayPundit.com, TheMindUnleashed.com, TheTruthAboutCancer.com, Theamericanews.co, Theconservativetreehouse.com, Thelibertyraise.com, Therightists.com, TierneyRealNewsNetwork.com, Topalertnews.com, Truthfeednews.com, Twisted.news, Tyranny.news, Universaleinfo.com, Uprising.news, Ussanews.com, VaccineDamage.news, VaccineInjuryNews.com, Vaccines.news, Vaxxter.com, Viralcords.com, WND.com, WaPoop.news, WakingTimes.com, WashingtonPosted.news, Webviners.com, WorldHealth.net, WorldNewsDailyReport.com, Yournewswire.com, ZeroHedge.com, empirenews.net, politicops.com, politicot.com";
BLACKLIST = BLACKLIST.toLowerCase();

function searchArticle(
  query,
  sortType,
  blacklisted = "",
  maxArticles = maxNumArticles //FIXME: ADD THIS TO API REQ
  
) {
  return new Promise(function (resolve, reject) {
    newsapi.v2
      .everything({
        q: query,
        language: "en",
        sortBy: sortType,
        excludeDomains: blacklisted,
        apiKey: "6a022b8162534fdaa0da0d6902608349",
      })
      .then((response) => {
        var allArticles = response.articles;
        var i;
        var returnedArticles = [];
        for (i = 0; i < allArticles.length; i++) {
          if (i >= maxNumArticles) {
            break;
          }
          var curArticle = {
            title: allArticles[i].title,
            author: allArticles[i].author,
            url: allArticles[i].url,
            description: allArticles[i].description,
            date: allArticles[i].publishedAt,
          };
          returnedArticles.push(curArticle);
        }
        resolve(returnedArticles);
      });
  });
}

async function reverseSearch(query) {
  var articles = await searchArticle(query, "relevancy", (maxArticles = 1));
  var curUrl = articles[0].url;

  if (curUrl.split("/")[2].includes("www")) {
    var domain = curUrl.split("/")[2].substring(4);
  } else {
    var domain = curUrl.split("/")[2];
  }

  openURL(curUrl, !BLACKLIST.includes(domain));

  return articles;
}

function chatbotSearch(query) {
  var articles = searchArticle(query, "relevancy", (blacklisted = BLACKLIST));
  return articles;
}

function openURL(url, trustworthy) {
  if (!trustworthy) {
    windows.alert(
      "CAUTION: The selected phrase is linked to a website that is known to produce misinformation."
    );
  }
  //FIXME: open the URL
}

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
  const client = new language.LanguageServiceClient();

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

chatbotHandler("How many people have corona in San Francisco");
