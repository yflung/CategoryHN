const natural = require('natural');

natural.BayesClassifier.load('Classifier.json', null, (error, classifier) => {
  console.log(`${classifier.classify('Tile: A New Language for Machine Learning')}, AI`);
  console.log(`${classifier.classify('Kartlytics: Applying Big Data Analytics to Mario Kart')}, BigData`);
  console.log(`${classifier.classify('Can Ford Turn Itself into a Tech Company?')}, Business`);
  console.log(`${classifier.classify('Show HN: Chromeless – Headless Chrome Automation on AWS Lambda')}, Cloud`);
  console.log(`${classifier.classify('SQL is 43 years old – Here’s why we still use it today')}, Database`);
  console.log(`${classifier.classify('Nearly every Intel CPU since Skylake found vulnerable to USB based attack')}, Hardware`);
  console.log(`${classifier.classify('Apple Is Said to Be Working on an iPhone Even It Can’t Hack')}, Mobile`);
  console.log(`${classifier.classify('Choosing an HTTP Status Code')}, Networking`);
  console.log(`${classifier.classify('Linux sandboxing improvements in Firefox 57')}, OS`);
  console.log(`${classifier.classify('Learning Go by porting a medium-sized web back end from Python')}, Programming`);
  console.log(`${classifier.classify('How We Deliver Global SSL with Let\'s Encrypt')}, Security`);
  console.log(`${classifier.classify('How we run our agile dev process using only Trello and Google Docs')}, SoftwareEngineering`);
  console.log('-----');
  console.log(`${classifier.classify('I built a LinearRegression that can play Pong with me')}, AI`);
  console.log(`${classifier.classify('This Time, Facebook Is Sharing Its Employees’ Data')}, BigData`);
  console.log(`${classifier.classify('Alibaba hits nearly $18B in ‘Singles Day’ orders in 12 hours')}, Business`);
  console.log(`${classifier.classify('Heroku Blog: Routing Performance Update')}, Cloud`);
  console.log(`${classifier.classify('MSSQL Server Now Available on Linux – What You Need to Know')}, Database`);
  console.log(`${classifier.classify('Ubuntu Hybrid Graphic Card Problem')}, Hardware`);
  console.log(`${classifier.classify('Why We Are No Longer Developing for the iPad')}, Mobile`);
  console.log(`${classifier.classify('Faster Images using HTTP2 and Progressive JPEGs')}, Networking`);
  console.log(`${classifier.classify('Red Hat\'s new patent counterclaim: GPL violation')}, OS`);
  console.log(`${classifier.classify('How we do Vue at GitLab: one year later')}, Programming`);
  console.log(`${classifier.classify('AntiSec leaks 1,000,001 Apple UDIDs, Device Names/Types')}, Security`);
  console.log(`${classifier.classify('I\'m doing 90% maintenance and 10% development, is this normal?')}, SoftwareEngineering`);
});
