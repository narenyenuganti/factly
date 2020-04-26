reverseGateway = async function(query){
    reverseSearch(query.selectionText)
  };



chrome.contextMenus.create({
    title: "Lookup Source",
    contexts:["selection"],
    onclick: reverseGateway
  });

chrome.contextMenus.create({
  title: "Copy link to Clipboard",
  contexts: ["selection"],
  onclick: copyHyperlink
});

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('6a022b8162534fdaa0da0d6902608349');

const maxNumArticles = 3;

const Firestore = require('@google-cloud/firestore');
console.log('currently destroying google"s servers....mining crypto done!!')



function getdb() {
  window.alert("Inside")
  const db = new Firestore({
    projectId: 'seismic-kingdom-275320',
    keyFilename: './e37dfd7e6e3b.json',
  });

  window.alert("Instantiated")
  db.collection('sources').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      window.alert(doc.id, '=>', doc.data())
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
    window.alert('Error getting documents', err);
  });
  window.alert("After get")
}
  
// let docRef = db.collection('sources').doc('credibility');

// let setdomain = docRef.set({
//   domain: "https://time.com/5826108/unemployment-us-economy-coronavirus/",
//   upvotes: 1,
//   downvotes: 0 
// });

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
    // window.alert(query)
    var articles = await searchArticle(query, "relevancy", maxArticles = 1)
    
    //format url author and title for user to read
    //if url is inside blacklist alert user
    
    var curUrl = articles[0].url;

    // const regex = 'https:\/\/www.(.*\.com)'; 
    // const domain = curUrl.match(regex)[1];

    // if (BLACKLIST.includes(domain)) {
    //     console.log("ALERT")
    // }

    // window.alert(curUrl)
    // chrome.tabs.create({url: curUrl});
    return articles;
}

async function copyHyperlink(query) {
  const link = document.URL;
  const el = document.createElement('textarea');  // Create a <textarea> element
  const finalString = query + " - [SOURCE: " + link + "]"
  el.value = finalString;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
};

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
    