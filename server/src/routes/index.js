const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
  res.status(200).send();
});

router.get('/loaderio-c3bdd87010253726a299357313cd1f87', (req, res) => {
  res.send('loaderio-c3bdd87010253726a299357313cd1f87');
});

module.exports = router;
