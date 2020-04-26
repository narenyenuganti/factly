const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("6a022b8162534fdaa0da0d6902608349");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();

// Imports the Google Cloud client library.
const { LanguageServiceClient } = require("@google-cloud/language");
const projectId = "factly-275323";
const client_email = "nlp-owner@factly-275323.iam.gserviceaccount.com";
const private_key =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkHWVDaIAu0PDF\nLWwVIfoBjAt9LH90JAzI6HNVYj2SHEUAI4EibGwfw8s96s7CoKDhlXH0Cq/FGdzg\ngdaDNsmCg9lOTY6T/v5URYUnj5YlYJPgYqoXRCuwJ/0hUEKfQGUySeXE4TheGAuZ\nKDD4zsLIr6SSN0voGYUVYojr0LLb5tX2+aFmdNWMocY+b/ehuKPwqwWe05LHX/I5\na/LSAJxZfVMbQWd+xoj/5mxXEoLOi0/+Zxmr8vZAYBe6ueHNrmD/P2suvivwWDUr\nY9wKzGtCogS0idqSUzStrDHCvfX0XN7Get1ZKqsND5CxuOMOB3RZ+2jSeAzy5Klm\nJNzczh6hAgMBAAECggEAOXi72g/R99MexgZCl+H2oa0P5u160sq/GWph3VBSfITe\n2w4T7mCmurb/yTad4oWK4YTKy6okZLNKaOq/GuNITSbsJiI94HEHUq6n0zNS4tL/\n5i/XHd+3JvDSEeT/97H+3k4Ho1s1uKnWAfQTtkX963aq/LNVpzmso9EGXwKOaDhN\nuD2mzHFQrm5g5aVgLjCkbxlcpXI/9Pl2ExK12Ew6evcvNP0Vn0c3bJZs3lE8BHuZ\nrQYixh5QQD8S2N8R9dsPFriNJBafxXFM4oBVFhi4yo7A7FvtCUGk2+xLv+bJtrxs\nyIFKoDiX+uY0Jpyb5sv448DNghuOSPl8qdMRc8NH2wKBgQDfKN8bk2tzSYcMwiVw\n1lKNxtLjuIhZd87QjbhIWlqosK9niW+5UWF5Amf1rVKKIZ9wItm8oegMuOD5mahn\nUESAdcsZzPCXlyqv2RZC9Rs13u1d09VqY6IgKPfp333Of0nQJjCQLutq9lLTI6oR\nXtM3zBlfoQ6BrQjbYUp5ASZSBwKBgQC8RB54kmPLdmW9djhV6NISQyUSsVEl4JTF\n3Rt0C3XjyNJEvHy0YXcrYGWC89vdasvqSo1ZVUdCW2TTXI+4gmkaPFkE2ZC48JOE\n2BTcJWIRrOf8HPfoMlILA5htHngXpUhKnv7YgwGO96/UIMOGxa/uf56utvr87NZq\nZpdfAI1AFwKBgAT8LL+481WH9vRaAewbXYy9PEjJ/oHBI2WVROCY5B2QlNqDP3Os\nVbkWTKw4Sve6+IzQunx0QXLHTn9E53YnXOBhwT+6TEWWouV6u/yS7SCu8i5+ZO4T\ne7OsNp2K2IycW1HDCKKv6aJiDkeZLFtm+uDsNkTknCZZbzE3YyqA1BJRAoGAcO1v\nVaWBxNalGmtiSW3ZLGkoQLkp0s2Oj80cHZSOR277aY2iQ9S+1b8BxPYfqQXZgRTt\nCmvTzaLirMG119gp0Tnnr7gNTlHIOwQeJxspYy7TDHAX6Cje+4pRkQqYwJ486b3L\nYfXbJnW9+0EX56yG5kmY1nYdwT8TMkmNfMfo8ksCgYEAwxMsJxLax4ui0SShm9GZ\ngGtFRxTehdHNbmHIyN2Rpnzbe8BUYAL6zlMTE9PddLtkDsgrvHP13aERyPB96Aa2\nkASXFenOiTD57JXkEzuhZ2QfnWz9PDrI6RRKaMUuVcZw3C8GndNw8T1pSP4+k3eR\n/F97ufWsFFWvO3pYGcMKtKg=\n-----END PRIVATE KEY-----\n";
const language = new LanguageServiceClient({
  projectId,
  client_email,
  private_key,
});


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
    alert(
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

chatbotHandler("Number of coronavirus cases in Santa Clara");
