var router = require('express').Router();
var Hotel = require('../../models').Hotel;

router.get('/', (req, res, next) => {
  Hotel.findAll()
    .then(function(hotels) {
      res.send(hotels)
    });
});

module.exports = router;
