  // This is our routes.js file located in /config/routes.js
  // This is where we will define all of our routing rules!
  // We will have to require this in the server.js file (and pass it app!)
  // First at the top of your routes.js file you'll have to require the controller
var questions = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/questions.js');
// var orders = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/orders.js');
// var products = require('/Users/Computer/Documents/Coding/full_mean/black_belt/server/controllers/products.js');
module.exports = function(app) {
    /*---------->>>>>CUSTOMERS<<<<<----------*/
    app.post('/login', function(req, res){
        console.log('I am in routes and logging in');
        req.session.user = req.body.name;
        res.json(req.session.user);
    })
    app.post('/logout', function(req, res){
        console.log('I am in routes and logging out');
        req.session.destroy();
    })
    app.get('/get_user', function(req,res){
        console.log('user',req.session.user);
        res.json(req.session.user);
    })
	app.get('/questions', function(req, res){
        console.log('i am in routes, on my way to get questions');
		questions.show(req, res);
	})
    app.post('/add_question', function(req, res){
        console.log('i am in routes, on my way to add a question');
        questions.create(req, res, function(){
        });
    })
    app.post('/add_answer', function(req, res){
        console.log('i am in routes, on my way to add an answer');
        questions.put(req, res, function(){
            res.json(req.body);
        })
    })
    app.post('/vote', function(req, res){
        console.log('i am in routes, on my way to add a vote');
        questions.update(req, res, function(){
        });
    })
    // // note how we are delegating to the controller and passing along req and res
    app.post('/delete', function(req, res){
        console.log('i am in routes, on my way to delete a question');
        questions.delete(req, res, function(){ 
            res.json(req.body);
        });
    })
};