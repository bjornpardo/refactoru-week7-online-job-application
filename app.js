
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Applicant = require('./models/applicant.js');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

mongoose.connect('mongodb://localhost/job');

//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	res.render('applicants')
});

// creates and applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it
	
	// console.log(req.body);
	// res.send('Success!');
	var newApplicant = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why
	});

	newApplicant.save(function(err, data) {
		if(err) {
			console.log(err);
			res.send(500, 'There was an error saving');
			return;
		}

		res.send(201, 'Success!');
	})
});

var server = app.listen(3001, function() {
	console.log('Express server listening on port ' + server.address().port);
});