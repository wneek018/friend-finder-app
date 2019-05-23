var friendsData = require("../data/friends");

// routing
module.exports = function(app) {

    // api GET request - displays all friends in JSON format
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    // api POST request - used to handle incoming survey results. Also handles compatibility logic
    app.post("/api/friends", function(req, res) {
        console.log(req.body.scores);

        var user = req.body;
        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var bestFriendIndex = 0;
        var minimumDifference = 40;

        for (var i = 0; i < friendsData.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j <friendsData[i].scores.length; j++) {
                var difference = Math.abs(user.scores[j] - friendsData[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        friendsData.push(user);

        res.json(friendsData[bestFriendIndex]);
    });
};