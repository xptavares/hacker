var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* GET people listing. */
router.get('/', function(req, res, next) {
  models.Person.findAll({include: models.Address }).then(person => {
    res.json(person)
  })
});

/* GET specific people. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  models.Person.findById(id, {include: models.Address }).then(people => {
    res.json(people)
  })
});

/* POST create people. */
router.post('/', function(req, res, next) {
  models.Person.create(req.body).then(people => {
    res.json(people)
  }).catch(err => {
    res.json(people)
  })
});

/* PUT update people. */
router.put('/:id', function(req, res, next) {
  const id = req.params.id
  models.Person.update(req.body, { where: { id: id } }).then(people => {
    res.json(people)
  }).catch(err => {
    res.json(people)
  })
});

/* DELETE delete people. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  models.Person.destroy({ where: { id: id } }).then(people => {
    res.json(people)
  }).catch(err => {
    res.json(people)
  })
});

module.exports = router;
