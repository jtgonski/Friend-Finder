var friendsData = require("../data/friends"); 

module.exports =  function (app) {
	app.get("/api/friends", function (req, res) {
		res.json(friendsData); 
		console.log("Get Request Successful");
	})

	app.post("/api/friends", function (req, res) {
		console.log("Post Request Initiated!");
		//create object to hold the best match
		var friendMatch = {
			name: "",  
			photo: "", 
			difference: Infinity
		}
		
		//parse data from the user's post
		var userData = req.body; 
		var userScore = userData.scores; 
		console.log(userData);

		//create a variable for the difference for each user; 
		var totalDifference; 

		//loop through each friend in the database to check it for the best possible match
		for (var i = 0; i < friendsData.length; i++) {
			var currentFriend = friendsData[i]; 
			totalDifference = 0; 

			console.log("Current Friend Name: " + currentFriend.name); 
			

			//loop through each score of the friend and subtract from the current user's score 
			for (var j = 0; j < currentFriend.scores.length; j++) {
					//create a variable to store the current user's score
					var currentUserScore = userScore[j];

					//create a variable to store the current firend's score
					var currentFriendScore = currentFriend.scores[j]; 

					//subtract the two scores to get the absolute difference between the user and add the difference to the totalDifference Variable
					totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore)); 

			}

			//create If statement to update the best match if the current friend's total difference is less than friendMatch difference

			if(totalDifference <= friendMatch.difference) {
				friendMatch.name = currentFriend.name; 
				friendMatch.photo = currentFriend.photo; 
				friendMatch.difference = totalDifference; 
			}


		}

		//save the current user's data to the database 
		friendsData.push(userData); 

		//return JSON of the user's best match to send the modal
		res.json(friendMatch); 
	})



}