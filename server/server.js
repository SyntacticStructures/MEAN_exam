// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
var bodyParser = require('body-parser');
// instantiate the app
var session = require('express-session');
var app = express();
app.use(session({secret:'taylor'}));
// This goes in our server.js file so that we actually use the mongoose config file!
require('./config/mongoose.js');
// set up a static file server that points to the "client" directory
// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
app.use(bodyParser.json());
require('./config/routes.js')(app);
app.use(express.static(path.join(__dirname, '../client')));
app.listen(8000, function() {
	console.log('Mini Store on: 8000');
});