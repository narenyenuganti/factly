
reverseGateway = async function(query){
    reverseSearch(query.selectionText)
  };

chrome.contextMenus.create({
    title: "Lookup Source",
    contexts:["selection"],
    onclick: reverseGateway
  });

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6a022b8162534fdaa0da0d6902608349');

const maxNumArticles = 3;

const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    projectId: 'seismic-kingdom-275320',
    // keyFilename: './e37dfd7e6e3b.json',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4YGs+pX14lDly\nKIUAdEpoBedPk9Mrj3jJSJeHjvKCL3cwtd5Tfzev63ZseXqfaoRKhSYToVfk43TU\ngzN91igQWGPUgmEa07mtCLIBNxuw36VpL2lIHKO92FcL+lnEjBz51pYjPTs/XAHU\naf3/lXOuld3DtllpXueXxoFaJt527J5NJdGdLcjGEMtuB6RzK2hIhpAiE5Ke3MZv\nbjU8TFTcSqdPzutbwmVbLZEehaGJp6DkI8AKGubFX24oUYDSmc6kRvNTUA5sTHqi\nsLZAPAw02RssYDNvlVY/rZfCJW0SsTX82RTNy4QQX1qsuDyRfo6LjkwR2/zOeUKg\nBbygzqRXAgMBAAECggEABZk36HER/EVT8Tl1wGvHjp0PRwVQFjSHEGWZ5E3c40MZ\ntWrwU0y7niXiNK0Doi+T0Md2PoZZquOVOpa5S4rjMIvejCdhV3UyYCSxcwP/XUGN\nPkJoSf5EopEdI4n4i9VNU/DGIk/LqsLac168jbQ2DQkT8Mtqr55oHd2zM8+WVboQ\nZabPYSZ0bJ3pX+0V3twFgSKM5158MxDd13fm8ZYDhSj4fVHJChqvqULq8E5O9x+U\n7MprQNqZ5xQ8r9P4W0Ws0XStVl8I9ayLX/GbCMrIv4OU7//JU8cro5VWOHwLTkwR\nvghGHCFGROdo1Icy4yO5/udKQAxsXDe7qtCu536SsQKBgQDlnQbKE2v9ORSiZpMP\nvdFSh5AkxuRPjiTMsrgHsy46UU4IuIx77MId7WFSUKAhSAjZcpEEh2vKWSuimaM0\nrApE/dqIk1z4yWO3xZtASVqnYoDJ+1CL2WaX4k1Ie0czz6A4cBGCTIgalHYQunZ3\nG2Y9nxdGgnzXXRkoeX7rxj5xmwKBgQDNkJO0cJBza8B4jS9loc/gFuOh6UkLznV6\nmDW9KtPc5oSDBh1XAW6vYR3HhfQAtyE3kpcZxVcFkLgSC6M13Trg+2SYq1GYPyVY\niqBFB17AYJT6ij8U/UpZJ3pSIUUqS6MfwYVubtFh//DIy+riO96Js/Qr+xaJ9ZvO\nse5H9Fvx9QKBgQCMTAIV/wAA3ZvKDzrUZ3s7HjHpBs4B/ixmFt1zdvxMDdnMYlcU\ncXm6p4zLqw/sxgMCOop5ZfVq0kljNNUQHf64YRPiV4h7SzJu24MdKLUHiZx/zdtN\nWCzjqRbnrsu20KppUbChGPogo43wcr5n0IoMJOUn5Bs7zFrO7E2s6pjE+QKBgQCH\nCnxN5Eiw2k9lonJJlMRH1SGTIvrOm8HHWKis7a6ihnj0zhaGKrW41tbGVTRXJ/bV\nWCKVVnN1f328tRJx9zSPyfZq6NjAaHMzOFZTIqVXQdt8v0bzlfW6ndmYjKywPWIb\nIXlzc69vbsCSWIukNWpbEfHM1rUWylehsHf1owyn5QKBgECuHyq3BHMJ6huQOFoZ\nuuOzAEbhjzeUsFlbc+SCrkxSkoK7pZeyNz/gRGmt5Lsu/qWqXZS+pLNP09Tc2j87\n4o6yYnNMW4Ank4Y9rvMuH++F/nUohRj9wAYjAO9G0KTbnWWMPKqNSI7v4qKhiKDD\nTa+O0eOmd8h9po3JEistwKN2\n-----END PRIVATE KEY-----\n",
    client_email: "andy-zhao@seismic-kingdom-275320.iam.gserviceaccount.com"
});

let docRef = db.collection('domains').doc('https://time.com/5826108/unemployment-us-economy-coronavirus/');
  
let setdomain = docRef.set({
  upvotes: 1,
  downvotes: 0 
});


// SOURCE: https://www.newsguardtech.com/coronavirus-misinformation-tracking-center/?fbclid=IwAR2FYJddK-F3zQEGFmdcLmdEnbrOn3C_f00nu8PdUBVPLi6xQcxL1IceSvQ
var BLACKLIST = "BigLeaguePolitics.com, Brighteon.com, BuffaloChronicle.com, Collective-Evolution.com, DCClothesline.com, DCDirtyLaundry.com, DiamondandSilk.com, DoctorDavidFriedman.com, DrSergeGregoire.com, En-Volve.com, GNews.org, GreenMedInfo.com, HealingOracle.ch, HealthImpactNews.com, HealthNutNews.com, Herbs-Info.com, HolisticHealth.one, HomeNaturalCures.com, HumansAreFree.com, InfoWars.com, Intellihub.com, JimBakkerShow.com, JimHumble.co, Medicine-Today.net, Mercola.com, NaturalHealth365.com, NowTheEndBegins.com, NTDnews.com, OrganicConsumers.org, PrankMania.com, Prntly.com, RealFarmacy.com, RedState.com, RedStateWatcher.com, Reddit.com, RushLimbaugh.com, SonsOfLibertyMedia.com, SOTT.net, StopMandatoryVaccination.com, TechStartups.com, TheBL.com, TheDonald.win, TheEpochTimes.com, TheGatewayPundit.com, TheMindUnleashed.com, TheTruthAboutCancer.com, TierneyRealNewsNetwork.com, Vaxxter.com, WakingTimes.com, WND.com, WorldHealth.net, WorldNewsDailyReport.com, ZeroHedge.com, 4chan.org, 8ch.net, NaturalNews.com, Banned.news, Biased.news, Bioterrorism.news, CaliforniaCollapse.news, CDC.news, Censorship.news, Conspiracy.news, Cures.news, Depopulation.news, Disinfo.news, Eugenics.news, Extinction.news, FactCheck.news, Faked.news, Freedom.news, Health.news, Herbs.news, Honest.news, Infections.news, Journalism.news, MediaFactWatch.com, MedicalExtremism.com, Medicine.news, NaturalCures.news, NaturalNewsRadio.com, Naturopathy.news, NewsFakes.com, NewsTarget.com, NYTWatch.com, OpenBorders.news, Outbreak.news, Pandemic.news, Panic.news, PlantMedicine.news, PopulationControl.news, Propaganda.news, RealInvestigations.news, Remedies.news, Risk.news, ScienceClowns.com, ScienceFraud.news, Science.news, Scientific.news, Sheeple.news, SHTF.news, Superbugs.news, TechGiants.news, Technocrats.news, Twisted.news, Tyranny.news, Uprising.news, VaccineDamage.news, VaccineInjuryNews.com, Vaccines.news, WaPoop.news, WashingtonPosted.news, Now8News.com, Breaking13News.com";
BLACKLIST = BLACKLIST.toLowerCase();

function searchArticle(query, sortType, blacklisted = "", maxArticles = maxNumArticles) {
    // To query /v2/everything
    // You must include at least one q, source, or domain
    
    return new Promise(function(resolve, reject) {

        newsapi.v2.everything({
            q: query,
            language: 'en',
            sortBy: sortType,
            excludeDomains: blacklisted,
            apiKey: '6a022b8162534fdaa0da0d6902608349'
        }).then(response => {
                var allArticles = response.articles
            
                var i;

                var returnedArticles = []

                for (i = 0; i < allArticles.length; i++) {
                
                    if (i >= maxNumArticles) {
                        break;
                    }

                    var curArticle = {
                        title: allArticles[i].title,
                        author: allArticles[i].author,
                        url: allArticles[i].url,
                        description: allArticles[i].description,
                        date: allArticles[i].publishedAt
                    }

                    returnedArticles.push(curArticle)
                }                
                resolve(returnedArticles)  
            }      
        )
      }
    )
}

async function reverseSearch(query) {
    // query = "Corona Virus San Jose"
    window.alert(query)
    var articles = await searchArticle(query, "relevancy", maxArticles = 1)
    
    //format url author and title for user to read
    //if url is inside blacklist alert user
    
    var curUrl = articles[0].url;

    // const regex = 'https:\/\/www.(.*\.com)'; 
    // const domain = curUrl.match(regex)[1];

    // if (BLACKLIST.includes(domain)) {
    //     console.log("ALERT")
    // }

    window.alert(curUrl)
    chrome.tabs.create({url: curUrl});
    return articles;
}

function chatbotSearch(query) {

    var articles = searchArticle(query, "relevancy", blacklisted = BLACKLIST)

    //

    return articles
}

function openURL(url, trustworthy){
  if (!trustworthy) {
    alert("CAUTION: The selected phrase is linked to a website that is known to produce misinformation.")
  }
  chrome.tabs.create({url});
};


// async function main() {
//     var articles = await reverseSearch("coronavirus rate in San Jose California")
//     console.log(articles)
// }

// main()
    