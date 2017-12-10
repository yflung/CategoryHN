const natural = require('natural');

const category = {
  AI: /\b(ai|artificial intelligence|deep learning|machine learning|neural network|reinforcement learning)\b/i,
  BigData: /\b(big data|data mining|data scientist|statistics)\b/i,
  Business: /\b(business|company|fund|hiring|invest|ipo|marketing|startup)\b/i,
  Cloud: /\b(cloud|aws|azure|google cloud platform|serverless)\b/i,
  Database: /\b(database|cassandra|mongodb|mysql|nosql|postgresql|redis|sql)\b/i,
  Hardware: /\b(hardware|cpu|gpu|hard disk|memory|ram)\b/i,
  Mobile: /\b(mobile|android|apps|ios|iphone|tablet)\b/i,
  Networking: /\b(networking|http|ip|packet|protocol|socket|tcp|udp|wireless)\b/i,
  OS: /\b(os|operating system|mac|linux|unix|virtual machine|windows)\b/i,
  Programming: /\b(programming|algorithm|c|code|c#|data structure|design pattern|functional|go|java|javascript|js|object oriented|php|python|r|swift)\b/i,
  Security: /\b(security|ddos|decrypt|encrypt|firewall|hack|trojan|virus)\b/i,
  SoftwareEngineering: /\b(software engineering|agile|devops|project management|scrum|sdlc|tdd)\b/i,
};

const trainingData = require('./Training Data 1.json');

let classifier = new natural.BayesClassifier();
// natural.BayesClassifier.load('Classifier.json', null, function(error, classifier) {

for (let title of trainingData) {
  title = title.replace('Show HN: ', '');
  title = title.replace('Ask HN: ', '');

  let includeCategory = '';
  let includeCount = 0;

  Object.keys(category).forEach((key) => {
    if (category[key].test(title)) {
      includeCount++;
      includeCategory = key;
    }
  });

  if (includeCount === 1) {
    classifier.addDocument(title, includeCategory);
    console.log(`[${includeCategory}] ${title}`);
  }
}

classifier.train();

classifier.save('Classifier.json', (error, classifier) => {
  console.log('Classifier.json is saved.');
});
// });
