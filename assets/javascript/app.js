$(document).ready(function () {

//QUESTION VARS
var options = [
	{
		question: "Who was the former officer of the United States Air Force? She would later develop the powers of strength and flight after exposure to an alien Kree device, the Psyche-Magnetron.", 
		choice: ["She-Hulk", "Black Widow", "Captain Marvel", "Spider Gwen"],
		answer: 2,
		photo: "assets/images/captainmarvel.gif"
	 },
	 {
		question: "Which of these places in New York where Spider-Man lives.", 
		choice: ["Brooklyn", "Queens", "Bronx", "Kings"],
		answer: 1,
		photo: "assets/images/spiderman.gif"
	}, 
	{
		question: "Who is well known for his serious personality as his powerful optic blasts?", 
		choice: ["Iron Man", "Human Torch", "Thor", "Cyclops" ],
		answer: 3,
		photo: "assets/images/cyclops.gif"
   }, 
   {
	   question: "Which of these Asgardians is the son of Odin and heir of Asgard?", 
	   choice: ["Loki", "Thor", "Sif", "Heimdall" ],
	   answer: 1,
	   photo: "assets/images/thor.gif"
   }, 
   {
	   question: "Who got his vision taken by a chemical spill when he was a young?", 
	   choice: ["Daredevil", "Cyclops", "Professor X", "Storm" ],
	   answer: 0,
	   photo: "assets/images/daredevil.gif"
   }, 
   {
	   question: "Who has the power to control objects with telekinesis and read people’s minds with telepathy?", 
	   choice: ["Elektra", "Gamora", "Jean Grey", "Jessica Jones" ],
	   answer: 2,
	   photo: "assets/images/jeangrey.gif"
   }, 
   {
	   question: "Who is the genius, billionaire, playboy, philanthropist, super hero?", 
	   choice: ["Hulk", "Falcon", "Iron Man", "Black Panther" ],
	   answer: 2,
	   photo: "assets/images/ironman.gif"
   }, 
   {
	   question: "Who is the king of Wakanda?", 
	   choice: ["Black Panther", "Wolverine", "Deadpool", "Nick Fury" ],
	   answer: 0,
	   photo: "assets/images/blackpanther.gif"
   },
   {
	   question: "Who is the half human, half vampire hybrid possessing all of their strengths but none of their weaknesses?", 
	   choice: ["Wolverine", "Ghost Rider", "Deadpool", "Blade" ],
	   answer: 3,
	   photo: "assets/images/blade.gif"
   },
   {
	   question: "Who has flaming skull and similarly scorching motorcycle?", 
	   choice: ["Loki", "Ghost Rider", "Deadpool", "The Punisher" ],
	   answer: 1,
	   photo: "assets/images/ghostrider.gif"
   },
    

];
    


//COUNTER and EMPTY VARS
var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];


//AUDIO FUNCTION
//Background Music Button
$("#start").on("click", function() {
    marvel.play()
});


$("#reset").hide();

//START BUTTON
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
    })

//TIMER START
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//TIMER COUNTDOWN
function decrement() {
	$("#timeleft").html("<h3>TIME REMAINING: " + timer + "</h3>");
	timer --;

	//If reaches 0, stop timer
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>TIME IS UP! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//TIMER STOP
function stop() {
	running = false;
	clearInterval(intervalId);
}

//Pick Random Question
function displayQuestion() {
	//Generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];
	//Iterate through answer array and display
	$("#questionblock").html("<h2>" + pick.question + "</h2>");
	for(var i = 0; i < pick.choice.length; i++) {
	var userChoice = $("<div>");
	userChoice.addClass("answerchoice");
	userChoice.html(pick.choice[i]);
	//Assign array position to it so can check answer
	userChoice.attr("data-guessvalue", i);
	$("#answerblock").append(userChoice);

}



//CLICK FUNCTION TO SELECT ANSWER AND OUTCOMES
$(".answerchoice").on("click", function () {
	//Grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//Correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>CORRECT!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>WRONG! The correct answer is: "  +  pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//Run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>GAME OVER! Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})
