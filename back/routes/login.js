const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  res.send({status: 200, message: 'Logged correctly'});
});

module.exports = router;