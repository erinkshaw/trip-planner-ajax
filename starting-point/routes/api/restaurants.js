var router = require('express').Router();
var Restaurant = require('../../models').Restaurant;

router.get('/', (req, res, next) => {
  Restaurant.findAll()
    .then(function(restaurants) {
      res.send(restaurants)
    });
});

module.exports = router;
