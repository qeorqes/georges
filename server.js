const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).send('no email provided');

  fs.appendFile('mailinglist.txt', email + '\n', (err) => {
    if (err) return res.status(500).send('error writing file');
    res.status(200).send('email saved');
  });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
