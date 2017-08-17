var router = require('express').Router();
var Day = require('../../models').Day;


router.get('/', (req, res, next) => {
  Day.findAll()
    .then(function(days) {
      console.log(days);
    });
});

module.exports = router;
