
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0-vewpz.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  //console.log(collection);
  client.close();
});


// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// ============================================================

require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

// Routes
// =============================================================

// Basic route that sends the user f
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});