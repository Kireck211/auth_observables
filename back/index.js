const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios').default;

const app = express();

const db = require('./database');
const weatherRoute = require('./routes/weather');
const loginRoute = require('./routes/login')
const verify = require('./auth/google')

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use((req, res, next) => {
  if (req.header('Authorization')) {
    req.token = req.header('Authorization').replace('Bearer ', '');
    return next();
  }
  res.status(401).send('401 unauthorized');
});

app.use(async (req, res, next) => {
  try {
    const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.token}`);
    const user = db.users.find(user => user.email === response.data.email);
    if (!!user) { // (!!user === Boolean(user)) = true
      return next();
    }
    if (req.originalUrl.includes('/api/login')) {
      db.users.push(response.data);
      console.log(db.users);
      return next();
    }
    res.status(401).send('401 unauthorized');
  } catch (err) {
    res.send(err);
  }
});

app.use('/api/weather', weatherRoute);
app.use('/api/login', loginRoute);

app.listen(3000, () => console.log('Listening on port 3000!'));

