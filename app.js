const config = require('./config');
const path = require('path');
const logger = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression'); 
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.set('port', config.port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(helmet());
app.use(compression());

app.use(session({
  secret: config.session.secret,
  store: new MongoStore()
}))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'TEST'
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server is running at http://localhost:${app.get('port')}`);
});