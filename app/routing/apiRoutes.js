var friendData = require("../data/friends.js");


module.exports = function (app) {
    // display json for everything in the friends array
    app.get("/api/friends", function (req,res) {
        res.json(friendData);
    });
    // take in userInfo and perform logic to find match
    app.post("/api/friends", function (req, res) {
        // place req body into a variable
        var surveyAns = req.body;
        // console.log(surveyAns);
        var scoreDiff = [];
        // finde each friends score in the array
        friendData.forEach(friendScore => {
            // console.log(friendScore.scores)
            // total score difference to be save here
            var scoreSum = 0;
            // loop over each score (10 scores total)
            for (var i = 0; i < 10; i++) {
                // find the difference between the user score and friends in data
                scoreSum += Math.abs(surveyAns.scores[i] - friendScore.scores[i]);
            }
            // push scores to the scoreDiff array
            scoreDiff.push(scoreSum);
        });

        // console.log(scoreDiff);

        // find the lowest score
        var findMin = Math.min.apply(null, scoreDiff);
        // take the lowest score in the array and its index number to find the matching friend
        for ( var j = 0; j < scoreDiff.length; j++){
            if (scoreDiff[j] === findMin){
                // matching friend object
                var bestScore = {
                    name: friendData[j].name,
                    photo: friendData[j].photo
                };
                // send new matching friend
                res.send(bestScore);
            }
        }

        friendData.push(surveyAns);
        console.log(friendData);
    });

}