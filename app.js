const config = require('./config');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const session = require('./middleware/session');
const nunjucks = require('nunjucks');

const app = express();

app.set('port', config.port);

app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('dist'));

app.use(session());

nunjucks.configure(path.join(__dirname, 'src/views'), {
  autoescape: true,
  express: app
});

app.get('/', (req, res) => {
  res.render('index.njk', {
    message: 'Super message'
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server is running at http://localhost:${app.get('port')}`);
});
