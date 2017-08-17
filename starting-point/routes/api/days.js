var router = require('express').Router();
var Day = require('../../models').Day;


router.get('/', (req, res, next) => {
  Day.findAll()
    .then(function(days) {
      res.send(days)
    });
});

router.post('/', (req, res, next) => {
  Day.create(
    req.body
  )
  .then(function(response) {
    console.log(response)
  })
})

router.put('/', (req, res, next) => {
  Day.update(
    req.body
  )
  .then(function(response) {
    res.send(response)
  })
})

module.exports = router;
