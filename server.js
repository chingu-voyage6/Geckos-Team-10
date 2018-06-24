const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = (process.env.PORT || 5000)

const auth = require('./routes/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, 'build')))
app.use('/api', auth);

app.listen(port, () => {
  console.log(`Express listening on port ${port}!`)
})
