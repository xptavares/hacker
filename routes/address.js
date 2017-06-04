var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* GET people listing. */
router.get('/', function(req, res, next) {
  models.Address.findAll({include: models.Person }).then(addresses => {
    res.json(addresses)
  })
});

/* GET specific people. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  models.Address.findById(id, {include: models.Person }).then(address => {
    res.json(address)
  })
});

module.exports = router;
