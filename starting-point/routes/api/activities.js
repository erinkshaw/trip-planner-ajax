var router = require('express').Router();
var Activity = require('../../models').Activity;

router.get('/', (req, res, next) => {
  Activity.findAll()
    .then(function(activities) {
      res.send(activities)
    });
});

module.exports = router;
