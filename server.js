const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 3600000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess))

// app.use(session({
//   sess,
//  cookie:{
//   maxAge:60000
//  }
// }));

// Middleware to handle session timeout
// app.use((req, res, next) => {
//   if (req.session) {
//     // Reset the maxAge on every request to extend session timeout
//     req.session.cookie.expires = new Date(Date.now() + 60000); // 1 minute
//     req.session.cookie.maxAge = 60000; // 1 minute
//   }
//   next();
// });
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
