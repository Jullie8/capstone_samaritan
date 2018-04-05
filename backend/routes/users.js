var express = require('express');
var router = express.Router();
let db = require('../db/queries');

///users/:user_id/charities

// Add charity 

router.post('/:user_id/charities', db.addCharityLike);

router.post('/:user_id/', db.addNewUser);

module.exports = router;
