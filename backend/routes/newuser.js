var express = require('express');
var router = express.Router();

///users/:user_id/charities

// Add charity 
router.post('/:user_id/charities', function(req, res, next) {

  db.any(`INSERT INTO user_history (user_id, create_time, charityName, URL) VALUES ( ${req.body.user_id}, now(), ${req.body.charityName}, ${req.body.URL})`)
  .then(data => {
    res.json(data);
  })
  .catch(err => console.log(err));
});

module.exports = router;
