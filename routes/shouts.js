var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});
client.connect(function(err, result){
  console.log('Cassandra connected: Shouts');
});

var getAllShouts = "SELECT * FROM shoutapp.shouts";

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.execute(getAllShouts, [], function(err, result) {
    if(err)
      res.status(404).send({msg: err});
    else
      res.render('shouts', { shouts: result.rows });
  });
});

var getUserShouts = "SELECT * FROM shoutapp.usershouts WHERE username = ?";

router.get('/:username', function(req, res) {
  client.execute(getUserShouts, [req.params.username], function(err, result) {
    if(err)
      res.status(404).send({msg: err});
    else
      res.render('shouts', { shouts: result.rows });
  });
});

module.exports = router;
