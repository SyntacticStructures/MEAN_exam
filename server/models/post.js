// This is the customer.js file located at /server/models/customer.js
// We want to create a file that has the schema for our customers and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');
// create our customerSchema
var QuestionSchema = new mongoose.Schema({
  content: String,
  created_at: String,
  user: String,
  description: String,
  answers: Array
});
var AnswerSchema = new mongoose.Schema({
	content: String,
	description:String,
	created_at: String,
	user: String,
	votes: Number
})
// use the schema to create the model
// Note that creating a model CREATES the collection in the database (makes the collection plural)
mongoose.model('Answer',AnswerSchema);
mongoose.model('Question', QuestionSchema);
// notice that we aren't exporting anything -- this is because this file will be run when we require it using our config file and then since the model is defined we'll be able to access it from our controller