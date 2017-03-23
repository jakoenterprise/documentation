require('dotenv').config({ silent: true });

var express = require('express');
var resolve = require('path').resolve;
var basicAuth = require('express-basic-auth');
var port = process.env.PORT || 3000;
var app = express();

app.use(basicAuth({
  challenge: true,
  realm: 'JAKO Documentation',
  authorizer: function (username, password) {
    var key = 'BASIC_AUTH_' + username;
    var envUser = process.env['BASIC_AUTH_' + username];

    if (!(key in process.env)
        || process.env[key] !== password
    ) {
      console.log('login attempt by ' + key + ' failed');
      return false;
    }

    return true;
  }
}));

app.use(express.static('build'));

app.get('/', function (req, res) {
  res.sendFile(resolve(__dirname + '/build/index.html'));
});

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(port);
