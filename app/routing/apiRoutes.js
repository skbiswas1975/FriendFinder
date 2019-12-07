// LOAD DATA
var friendsData = require('../data/friends.js');
var path = require('path');

// ROUTING
module.exports = function(app) {
	app.get('/api/friends', function(req, res) {
		res.json(friendsData);
	});

	app.post('/api/friends', function(req, res){
		var bestDifferent = 25;
		var matchscore = 0;

		for (var i = friendsData.length - 1; i >= 0; i--){
			console.log("Comparing with " + friendsData[i].name);

			var totalDifference = 0;

			for (var j = 0; j < 10; j++){
				totalDifference = totalDifference + Math.abs(friendsData[i].scores[j] - req.body.scores[j]);
			}
			if (totalDifference < bestDifferent){
				bestDifferent = totalDifference
				matchscore = i;
			}
      	console.log("Total difference: " + friendsData[i].name + " is " + totalDifference);
		}

    console.log("-----------------------------");
    console.log("best person is " + friendsData[matchscore].name + " and best score is " + bestDifferent);
    console.log("-----------------------------");

    // push in the user input into the friendArray
    friendsData.push(req.body);

    // respond back with the best match
    res.json({name: friendsData[matchscore].name, photo: friendsData[matchscore].photo});
    // res.json(true);
	});
}