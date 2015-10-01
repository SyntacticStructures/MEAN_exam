// PUT ANGULAR CODE HERE
// Lets create our angular module
var question_app = angular.module('question_app', ['ngRoute']);
question_app.config(function ($routeProvider) {
    $routeProvider
        .when('/',{
                templateUrl: '../partials/dashboard.html'
        })
        .when('/dashboard',{
                templateUrl: '../partials/dashboard.html'
        })
        .when('/create',{
        		templateUrl:'../partials/create.html'
        })
        .when('/show_one',{
        		templateUrl:'../partials/show_one.html'
        })
        .when('/answer', {
        		templateUrl:'../partials/answer.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
/*-------------------->>>>>>>>>>>Questions<<<<<<<<<<<<--------------------*/
/*-------------->>>>>>>>>>>quesitonssController<<<<<<<<<<<<--------------*/
question_app.controller('QuestionsController', function(QuestionFactory, $location) {
	var that = this;
	QuestionFactory.getQuestions(function(data) {
			that.questions = data;
				// anything else that you want to happen after you getCustomers needs to be inside of this callback
		});
	that.addAnswer = function (current_question){
		that.new_answer.user = that.current_user;
		that.current_question = current_question;
		QuestionFactory.addAnswer(current_question, that.new_answer, function(){
			QuestionFactory.getQuestions(function(data) {
				console.log('hhhheeeerrrree', data);
				that.questions = data;
				$location.path('/show_one');
			});
		})
	}
	that.addUser = function() {	
		var current_user = prompt("Please enter your name");
		current = {
			name: current_user
		}
    	QuestionFactory.addUser(current);
		console.log('testing');
	}
	that.logout = function() {
		alert('successful logout. we will take you to the dashboard so you can log in again.');
		QuestionFactory.logout(function(){
			$location.path('/dashboard');
		});
	}
	that.answer = function(question){
		that.current_question = question;
		$location.path('/answer');
	}
	that.vote = function(question, answer) {
		console.log('question',question);
		for(i=0; i<question.answers.length; i++){
			if (question.answers[i] == answer){
				if(question.answers[i].votes > -1){
					question.answers[i].votes +=1;
				} else {
					question.answers[i].votes = 1;
				}
			}
		}
		QuestionFactory.vote(question, function(){
			QuestionFactory.getQuestions(function(data){
				that.questions = data;
			})
		})

	}
	that.getUser = function(){
		QuestionFactory.getUser(function(data) {
			console.log(data,'data');
			// this is where the customers are 'bound' to the customers page
			that.current_user = data;
			// anything else that you want to happen after you getCustomers needs to be inside of this callback
		});
	}
	that.addQuestion = function(data){
		QuestionFactory.addQuestion(data, that.new_question, function(){
			QuestionFactory.getQuestions(function(data){
				that.questions = data;
				that.new_question={};
				alert("you've added a question successfully. i love you.");
				$location.path('/dashboard');
			})
		})
	}
	that.getQuestions = function(){
		QuestionFactory.getQuestions(function(data){
				that.questions = data;
		})
	}
	that.show_one = function(question){
		that.current_question = question;
		$location.path('/show_one');
	}
	that.deleteQuestion = function(question){
		QuestionFactory.deleteQuestion(question, function(){
		})
	}
})	 /*-------------->>>>>>>>>>>customerFactory<<<<<<<<<<<<--------------*/
  // create the CustomerFactory
question_app.factory('QuestionFactory', function($http) {
	var factory = {};
	var questions = [];
	var current_question = {};
	var current_user = {};
	// lets edit our angular factory's getCustomers method as follows
	factory.addUser = function(user, callback) {
		$http.post('/login', user).then(function(response){
		})
	}
	factory.addAnswer = function(current_question, new_answer, callback) {
		console.log(new_answer,'new_answer');
		console.log(current_question,'current_question');
		console.log(questions);
		var date = new Date();
		new_answer.created_at = date;
		for(i=0; i < questions.length; i++){
			if(current_question._id == questions[i]._id){
				questions[i].answers.push(new_answer);
			}
		}
		new_answer.question_id = current_question._id;
		$http.post('/add_answer', new_answer).then(function(response){
			callback('a');
		})
	}
	factory.logout = function(callback) {
		$http.post('/logout').then(function(response){
			callback(response);
		})
	}
	factory.deleteQuestion = function(question, callback){
		var question_id = {
				id: question
			}
		$http.post('/delete', question_id).then(function(response){
		});
		questions.splice(questions.indexOf(question), 1);
	}
	factory.showOne = function(question, callback){
		console.log('showing question', question);
		current_question = question;
		callback(current_question);
	}
	factory.getUser = function(callback) {
		console.log('in get user');
		$http.get('/get_user').success(function(output) {
			console.log('output',output);
			current_user = output;
			callback(output);
		})
	}
	factory.vote = function(question, callback) {
		console.log('in vote factory');
		$http.post('/vote', question).then(function(response){
			callback(response);
		})
	}
	factory.getQuestions = function(callback) {
	 	$http.get('/questions').success(function(output) {
	    	questions = output;
	    	callback(questions);
	  	})
	}
  	factory.addQuestion = function(user, info, callback) {
  		console.log('info', info);
  		console.log('user', user);
  		var date = new Date();
  		var data = {
  			content: info.question,
  			answers: [],
  			description: info.description,
  			created_at: date,
  			user: user
  		};
  		console.log('this is wat we will pass',data);
    	questions.push({content: data.content, user:data.user, answers: data.answers, created_at: data.created_at});
    	console.log(questions);
    	$http.post('/add_question', data).then(function(response){
    		callback(response);
    	})
  	}
  	// we must return the factory object so the controller can use it!
   	return factory;
});














