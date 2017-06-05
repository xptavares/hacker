var express = require('express');
var router = express.Router({ mergeParams: true });
var models = require('../models/index')

/* GET people listing. */
router.get('/', function(req, res, next) {
  const personId = req.params.personId
  console.log("************");
  console.log(req.params);
  console.log("************");
  models.Address.findAll({where: { personId: personId }, include: models.Person }).then(addresses => {
    res.json(addresses)
  })
});

/* GET specific address. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  const personId = req.params.personId
  models.Address.findOne({ where: {id: id, personId: personId},include: models.Person }).then(address => {
    res.json(address)
  })
});

/* POST create address. */
router.post('/', function(req, res, next) {
  const personId = req.params.personId
  let body = req.body
  body.personId = personId
  models.Address.create(body).then(address => {
    res.json(address)
  }).catch(err => {
    res.json(address)
  })
});

/* PUT update address. */
router.put('/:id', function(req, res, next) {
  const id = req.params.id
  const personId = req.params.personId
  models.Address.update(req.body, { where: { id: id, personId: personId } }).then(address => {
    res.json(address)
  }).catch(err => {
    res.json(address)
  })
});

/* DELETE delete address. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  const personId = req.params.personId
  models.Address.destroy({ where: { id: id, personId: personId } }).then(address => {
    res.json(address)
  }).catch(err => {
    res.json(address)
  })
});

module.exports = router;
