var fs = require("fs");
var path = require("path");
var foundFriend;
var friends;
var difference;
var differenceArray = [];

fs.readFile(path.join(__dirname, '/../data/friends.js'), "utf-8", function(err, data){
    if (err) throw err
    friends = JSON.parse(data);
})

module.exports = function(app){
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });
  
app.post("/api/friends", function(req, res) { 
    difference = 0;
    differenceArray = [];
    findFriend(req.body.scores);
    friends.push(req.body);
    fs.writeFile(path.join(__dirname, '/../data/friends.js'), JSON.stringify(friends), "utf-8", function(err){
        if (err) throw err;
        console.log('The file has been saved!');
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