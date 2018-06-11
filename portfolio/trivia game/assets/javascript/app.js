var triviaTime = 32;
var gameStarted = false;
var jeopardy = new Audio('assets/images/jeopardy.mp3');
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var submitClicked = false;


var triviaQ = [


{
  question: "<h2>Which Viking scored the Touchdown in the famous 'Minneapolis Miracle'?</h2>",
  answers: ["Adam Thielen","Stefon Diggs","Case Keenum","Anthony Barr"],
  correctAnswer: 1

},

{
  question: "<h2>Who is the current starting Quarterback of the Vikings?</h2>",
  answers: ["Case Keenum","Teddy Bridgewater","Kirk Cousins","Sam Bradford"],
  correctAnswer: 2

},

{
  question: "<h2>Which Viking is famous for saying, 'Straight Cash Homey'?</h2>",
  answers: ["John Randle","Randy Moss","Cris Carter","Jared Allen"],
  correctAnswer: 1

},

{
  question: "<h2>How many Superbowls have the Vikings participated in?</h2>",
  answers: ["1","2","3","4"],
  correctAnswer: 3

},

{
  question: "<h2> Who is the Vikings all-time leading Rusher?</h2>",
  answers: ["Robert Smith","Chuck Foreman","Adrian Peterson","None of the above"],

  correctAnswer: 2

}



]


function startGame() {
 $("#reset").hide();
  if(!gameStarted){
    triviaId = setInterval(decrement, 1000);
    gameStarted = true;
    $("#triviaTime").show();
    jeopardy.play();
  }
}


function stopGame() {

  clearInterval(triviaId);
  jeopardy.pause();
  jeopardy.currentTime = 0;

 }

 function reset(){
                gameStarted = false;
                triviaTime = 32;
                correctAnswers = 0;
                incorrectAnswers = 0;
                unanswered = 0;
                $("#startGame").show();
                $("#results").empty();
                $("#reset").hide();
                
}




 function decrement() {
                triviaTime--;
               
                $("#triviaTime").html("<h2>" + "  Time  Remaining: " +triviaTime+ "</h2>");
              
                if(triviaTime === 0){
                  stopGame();
                  checkAnswer();
                  displayResults();

                }

                $("body").on("click","#reset",function(){
                  reset();
            });

}



function createQuiz(){
   
//hide the startGame button once Quiz is created.
   $("#startGame").hide();
                

    for(i=0;i<triviaQ.length;i++){
         var html = $('<div>').addClass("question col-xs-12 game").appendTo('body');
         $(html).append(triviaQ[i].question)
         
          

           for(j=0;j<triviaQ[i].answers.length;j++){
              
              var ans =$('<div><input type="radio" id=answer'+i+j+' name=answer'+ i +'><label for=answer'+i+j+'>' + triviaQ[i].answers[j] +'</label></input></div>').addClass("answers col-xs-offset-5 game").appendTo('body')
              

          }
}




$('<button id="submit" name="submit"><h2> Submit  </h2></button>').addClass("btn btn-primary btn-lg col-xs-offset-5").appendTo('body');



}




function checkAnswer(){



  $('.question').each(function(i,obj){
      
        var answerValue = $('label[for="' + $('input[name=answer'+i+']:checked').attr("id") + '"]').text();
        
                               
        var currAns = triviaQ[i].answers[triviaQ[i].correctAnswer];
      

        if(answerValue === currAns)
           correctAnswers++;  
        else if(!answerValue)
            unanswered++;
        else
            incorrectAnswers++;


      });


}



function displayResults(){


  //removes questions and answers class once results are displayed
  $(".game").remove();
 
  //removes submit button once results are displayed
  $("#submit").remove();

  //triviaTime to 0 and stopGame
  triviaTime = 0;
  stopGame();

  //hide triviaTime on displaying results
  $("#triviaTime").hide();

  //empty the results before appending stats.
  $("#results").empty();

  $( "#results").append(
    "<div><section>Results!!</section></div>",
    "<div><section>Correct Answers: " + correctAnswers + "</section></div>",
    "<div><section>Incorrect Answers: " + incorrectAnswers + "</section></div>",
    "<div><section>Unanswered: " + unanswered + "</section></div>");


  //display reset button
  $("#reset").show();


}





$(document).ready(function(){
  //hide reset at start
           $("#reset").hide();
  //on clicking start game, create the quiz and start the game
           $("#startGame").on("click", function(){
                    createQuiz();
                    startGame();


  //on clicking submit check the answer to calculate variables and then call displaystats to show results.                  
           $("body").on("click", "#submit", function(){
                    submitClicked = true;
                    checkAnswer();
                    displayResults();
 // on clicking reset start a new game after resetting all the variables.
            $("body").on("click","#reset",function(){
                  reset();
            });


            });
    });

});