const express = require('express');
const router = express.Router();
const weatherInfo = require('../mock/weatherData');

router.get('/', (_, res) => {
  res.send(weatherInfo);
});

module.exports = router;