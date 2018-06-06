//create all variables needed 
var crystalValues;
var wins =0;
var losses =0;
var targetValue =0;
var userTotal =0;
var buzzer= new Audio ('assets/images/buzzer.wav');
buzzer.play();
var gong = new Audio ('assets/images/gong.mp3');
gong.play();

//create 4 random numbers between 1- 12
function generateCrystalValues(){
	
	crystalValues = []; 

	for(var i=0; i< 4;){//i<4 creates 4 numbers 

		var randomNumber = Math.ceil(Math.random() * 12);//random number ceiling of 12

		//console.log("crystal value = "+randomNumber);

		if(crystalValues.indexOf(randomNumber) > -1){
			continue;
		}
		else {
			crystalValues[crystalValues.length] =randomNumber;
			i++;
		}
		
	} 

}


//Generate number for target
function targetNumber(){
	var randomNum =0;
	
	while( randomNum < 19  ){
		randomNum = Math.ceil(Math.random() * 120);
		
		if(randomNum > 19 && randomNum < 120){
			break;
		}
	}
	console.log("Target # = "+ randomNum);
	return randomNum;
}



//Following block of code stats after page load is complete
$(document).ready(function() {
	//when the page load generate random numbers
	targetValue = targetNumber();
	generateCrystalValues();

	
	console.log("Crystal values -->"+crystalValues);

	// Assign values to the Crystal Buttons
	$("#crystal1").attr("crystalvalue",crystalValues[0]);
	$("#crystal2").attr("crystalvalue",crystalValues[1]);
	$("#crystal3").attr("crystalvalue",crystalValues[2]);
	$("#crystal4").attr("crystalvalue",crystalValues[3]);

	//Assign Targe value for Display
	$("#targetNo").text(targetValue);


	//When user clicks on any crystal 
	$("img").on("click",function(){
		//user selected Crystal value
		var selectedValue = parseInt($(this).attr("crystalvalue"));

		console.log( "Selected Crystal Val -->"+selectedValue);

		userTotal = userTotal + selectedValue;

		if(targetValue === userTotal){
			//update User current total 
			$("#currentscore").text(userTotal);
			gong.play();
			wins++;
			console.log("You win");
			//Update the Wins
			$("#wins").text(wins);

			gameReset();

		}else if(userTotal > targetValue){
			//update User current total 
			$("#currentscore").text(userTotal);
			buzzer.play();
			losses++;
			console.log("you lose the game");

			//Update the loss
			$("#losses").text(losses);
			
			gameReset();
		}
		else{

			//update User current total 
			$("#currentscore").text(userTotal);
	
		}

	}); //End of  click event


	//Game Reset
	function gameReset() {
		userTotal =0;
		targetValue=0;

		$("#currentscore").text("0");

		//Generate Random Number
		targetValue = targetNumber();
		generateCrystalValues();

		console.log("Crystal values in Reset -->"+generateCrystalValues);
		//Assign Target value for Display
		$("#targetNo").text(targetValue);

		// Assign values to the Crystal Buttons
		$("#crystal1").attr("crystalvalue",crystalValues[0]);
		$("#crystal2").attr("crystalvalue",crystalValues[1]);
		$("#crystal3").attr("crystalvalue",crystalValues[2]);
		$("#crystal4").attr("crystalvalue",crystalValues[3]);
	}

}); // end $(document).ready(function() 