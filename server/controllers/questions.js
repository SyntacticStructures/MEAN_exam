// this is our customers.js file located at /server/controllers/customers.js
// First add the following two lines at the top of the customers controller so that we can access our model through var Customer
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
// note the immediate function and the object that is returned
module.exports = (function() {
	return {
  		show: function(req, res) {
            console.log('in questions_show method');
     		Question.find({}, function(err, results) {
       		if(err) {
        		console.log(err);
       		} else {
         		res.json(results);
       			}
   			})
  		},
     	create: function(req, res) {
            console.log('in questions_create method');
			var question = new Question(req.body);
            console.log(question);
     		question.save();
            res.json(question);
     	},
     	delete: function(req, res) {
            console.log('in questions_delete method');
            Question.remove({_id:req.body.id}, function(err){
    		});
     	},
        update: function(req, res) {
            console.log('in questions_update method');
            Question.update({_id: req.body.id}, {answers: req.body.answers}, function(err){
            });
        },
        put: function(req, res){
            var answer = new Answer({content: req.body.content, user: req.body.user, votes: 0, description: req.body.description, created_at: req.body.created_at})
            console.log(answer,'answer');
            Question.update({_id: req.body.question_id}, {$push: {answers: answer}}, function(){
                res.json();
            });
        }
 }
})();
// also note that this is an IMMEDIATE FUNCTION!
// note that this is just a code snippet of the show method from the object returned in the controller (this includes the exports module.exports