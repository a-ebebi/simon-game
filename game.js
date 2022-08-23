// array to hold possible colors
var buttonColours = ["red", "blue", "green", "yellow"];

// array to hold full game pattern
var gamePattern = [];

// store user's click pattern
var userClickedPattern = [];

// track whether or not game has started
var started = false;

// track what level user is on
var level = 0;


// start game when any key is pressed
$(document).keypress(function() {
  if(!started){
    // update level text file
    $("#level-title").text("Level " + level);
    // start
    nextSequence();
    started = true;
  }
});

// detect when any button is clicked to start game and trigger handler function
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  // add color to user pattern
  userClickedPattern.push(userChosenColour);

  // test that user pattern is being saved
  // console.log(userClickedPattern);

  // visual and sound effects for btn pressing
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // check user's last answer
  checkAnswer(userClickedPattern.length-1);
});

// check user answer
function checkAnswer(currentLevel){

  // if last color in user sequence and game sequence match
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    // correct
    console.log("success");

    // if user has finished their sequence
    if (userClickedPattern.length === gamePattern.length){

      // wait then call nextSequence
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  // else user was wrong
  } else {
    console.log("wrong");

    // use effects to indicate game over
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(()=> {$("body").removeClass("game-over");}, 200);
    
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // start over
    startOver();
  }
}

// create new pattern
function nextSequence(){

  // reset userClickedPattern to empty array for next level
  userClickedPattern = [];

  // increment and update level is time nextSequence is called
  level++;
  $("#level-title").text("Level " + level);

  // get random number between 0 - 3
  var randomNumber = Math.random() * 4;

  // round number down so it's guaranteed to be an integer
  randomNumber = Math.floor(randomNumber);

  // get random color using random number
  var randomChosenColour = buttonColours[randomNumber];

  // push chosen color to gamePattern array
  gamePattern.push(randomChosenColour);

  // let user know what next color in sequence is 
  // flash the next color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// play sound when btn is clicked
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// change btn style when it's pressed
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {$("#" + currentColor).removeClass("pressed");}, 100);
}

// restart game when user gets pattern wrong
function startOver(){

  // reset
  level = 0;
  gamePattern = [];
  started = false;
}