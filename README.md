# factly
Sid Bansal, Rohan Hajela, Andy Zhao, Naren Yenuganti

Factly discourages the spread of misinformation, validating sources through various tools.

The vast majority of people get their information from online sources nowadays (social media, news articles, etc.) However, there is bound to be factually incorrect information floating around that may sound right to people, and inevitably rumors will start to spread of whether such information is actually true. We wanted to build something that would actually be useful to people and make correct information more accessible. We built a Google Chrome extension that could be plugged in anywhere to check validity of facts on the screen or just the reputation of the website as a whole. Our biggest challenge was doing the frontend, as none of really had too much JavaScript experience.

Built With: JavaScript, HTML, and CSS were all used. APIs we used include the NewsAPI to retrieve relevant articles, Google Cloud Language API for our chatbot, Postman Novel Covid API for up-to-date coronavirus information, and Google Firestore for storing information of each domain. We used a boilerplate Google Chrome Extension with a Node.Js backend that was compiled into a browser extension through the Browserify API .

