const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const natural = require('natural');

let app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/v1/category', (req, res) => {
  if (!Array.isArray(req.body)) {
    res.status(400).json('Invalid input');
  }

  for (const title of req.body) {
    if (typeof title !== 'string') {
      res.status(400).json('Invalid input');
    }
  }

  let category = [];

  natural.BayesClassifier.load('Classifier.json', null, (error, classifier) => {
    for (const title of req.body) {
      category.push(classifier.classify(title));
    }

    res.json(category);
  });
});

app.listen(3001, () => console.log('ClassifierAPI listening on port 3001.'));
