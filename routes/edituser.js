var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], localDataCenter: 'datacenter1'});
client.connect(function(err, result) {
  console.log('Cassandra connected: Edit User');
});

var getByUsername = "SELECT * FROM shoutapp.users WHERE username = ?";

router.get('/:username', function(req, res){
  client.execute(getByUsername, [req.params.username], function(err, result){
    if(err)
      res.status(404).send({msg: err});
    else {
      res.render('edituser', {
        username: result.rows[0].username,
        password: result.rows[0].password,
        email: result.rows[0].email,
        name: result.rows[0].name,
        age: result.rows[0].age
      });
    }
  });
});

var upsertUser = "UPDATE shoutapp.users SET age = ?, email = ?, name = ?, password = ? WHERE username = ?";

router.post('/', function(req, res) {
  client.execute(upsertUser, [
    +req.body.age,
    req.body.email,
    req.body.name,
    req.body.password,
    req.body.username,
  ], { prepare: true },
  function(err, result) {
    if(err)
      res.status(404).send({msg: err});
    else {
      console.log('User Edited');
      res.redirect('/users');
    }
  });
});

module.exports = router;