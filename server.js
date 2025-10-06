// set up ======================================================================
var express = require('express');
var app = express(); 						
var mongoose = require('mongoose'); 				
var port = process.env.PORT || 8080; 				
var database = require('./config/database'); 		
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration ===============================================================

// Use environment variable MONGO_URL if defined, else fallback to database.localUrl
var mongoUrl = process.env.MONGO_URL || database.localUrl;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB at " + mongoUrl))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.static('./public')); 		
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({'extended': 'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 
app.use(methodOverride('X-HTTP-Method-Override')); 

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
