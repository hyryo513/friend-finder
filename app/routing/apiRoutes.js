require("dotenv").config();
var foundFriend;
var friends;
var difference;
var differenceArray = [];
var keys = require("../../keys");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://" + keys.mongodb.key + "@ds163255.mlab.com:63255/heroku_s8wpltzk";
const client = new MongoClient(uri, { useNewUrlParser: true });
var dbCollections;
client.connect(function(err){
    if (err) throw err;
    dbCollections = client.db("heroku_s8wpltzk").collection("friends");
});

module.exports = function(app){
app.get("/api/friends", function(req, res) {
    dbCollections.find({}, {projection: { _id: 0, name: 1, photo: 1, scores: 1}}).toArray(function(err, docs) {
        if (err) throw err;
        friends = docs;
    });
    return res.json(friends);
  });
  
app.post("/api/friends", function(req, res) { 
    difference = 0;
    differenceArray = [];
    findFriend(req.body.scores);
    friends.push(req.body);
    dbCollections.insertOne({name: req.body.name, photo: req.body.photo, scores: req.body.scores}, function(err, docs) {
        if (err) throw err;
    });
    return res.json(foundFriend);
  });
}

function findFriend(newFriendScores){
    friends.forEach(function(element){
        compareScore(element, newFriendScores);
    });
    var friendIndex = differenceArray.indexOf(Math.min(...differenceArray));
    foundFriend = friends[friendIndex];
};

function compareScore(element, newFriendScores){
    for (var i = 0; i<element.scores.length; i++){
        difference = parseInt(element.scores[i]) - parseInt(newFriendScores[i]);
        if (difference < 0){
            difference = difference * -1;
        };
        difference += difference;
    };
    differenceArray.push(difference);
};