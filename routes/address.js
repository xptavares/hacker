var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* GET people listing. */
router.get('/', function(req, res, next) {
  models.Address.findAll({include: models.Person }).then(addresses => {
    res.json(addresses)
  })
});

/* GET specific address. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  models.Address.findById(id, {include: models.Person }).then(address => {
    res.json(address)
  })
});

/* POST create address. */
router.post('/', function(req, res, next) {
  models.Address.create(req.body).then(address => {
    res.json(address)
  }).catch(err => {
    res.json(address)
  })
});

/* PUT update address. */
router.put('/:id', function(req, res, next) {
  const id = req.params.id
  models.Address.update(req.body, { where: { id: id } }).then(address => {
    res.json(address)
  }).catch(err => {
    res.json(address)
  })
});

/* DELETE delete address. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  models.Address.destroy({ where: { id: id } }).then(address => {
    res.json(address)
  }).catch(err => {
    res.json(address)
  })
});

module.exports = router;
