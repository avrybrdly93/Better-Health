var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

//in case you feel the desire to use CSS for the millionth time
app.use(express.static(__dirname + "/app/css"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

//API & HTML ROUTES
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});