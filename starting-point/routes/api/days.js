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

  var attraction = req.body
  Day.findOne({where: {number: req.body.number}})
    .then( function(updatedDay) {
      switch (attraction.type) {
        case 'hotel':
          updatedDay.setHotel(attraction.attractionId);
          break;
        case 'restaurant':
          updatedDay.addRestaurant(attraction.attractionId);
          break;
        case 'activity':
          updatedDay.addActivity(attraction.attractionId);      break;
        default: console.error('bad type:', attraction);
      }
    })
      .save()
      .then( function(updatedDay) {
        res.send(updatedDay);
      } )
      .catch(console.error)
})





module.exports = router;
