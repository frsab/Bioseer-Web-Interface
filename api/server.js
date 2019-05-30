const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');

const root = './';
const port = process.env.PORT || '3000';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, 'dist/Bioseer-Web-Interface')));
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile('../dist/Bioseer-Web-Interface/index.html', {root});
});

app.listen(port, () => console.log(`API running on localhost:${port}`));
