const buttonsColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var randomChosenColor = "";
var level = 0;

$(".btn").click((event) => {
  var userChosenColor = $(event.target).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$("body").keypress(() => {
  if (level === 0) {
    nextSequence();
  }
  start = true;
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function nextSequence() {
  $("h1").html(`<h1>Level ${level}</h1>`);

  var randomNumber = Math.floor(Math.random() * 4);

  randomChosenColor = buttonsColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function checkAnswer(currentLevel) {
  if (randomChosenColor === userClickedPattern[currentLevel]) {
    console.log("Success!!");
    level++;
    nextSequence();
  } else {
    playSound("wrong");
    $(".btn").hide();
    $("body").addClass("game-over");
    $("h1").html("<h1>Game Over!!!!!!!</h1>");
    $("h1").css("color", "#011f3f");
    $("h2")
      .html(
        `<div><h2>You have successfully covered ${level} levels</h2><h3>Please Press any key to restart!!!</h3></div>`
      )
      .css("color", "#011f3f");
    level = 0;
    $("body").keypress(() => {
      $(".btn").show();
      $("body").removeClass("game-over");
      $("h2").html("");
      if (level === 0) {
        setTimeout(() => {
          nextSequence();
        }, 50000000);
      }
    });
  }
}
