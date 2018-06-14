const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = (process.env.PORT || 5000);

app.use('/', express.static(path.join(__dirname, 'build')));

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`);
});
