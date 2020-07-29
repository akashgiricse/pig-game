/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer;
init();
// textContent is used setter
// document.querySelector("#current-" + activePlayer).textContent = dice;

// we can also change the html with innerHTML
// document.querySelector("#current-" + activePlayer).innerHTML =
//   "<em>" + dice + "</em>";

// textContent is used as getter
// var x = document.querySelector("#current-" + activePlayer).textContent;
// console.log(x);

// function btn() {
//   // do something
// }

// btn();

// document.querySelector(".btn-roll").addEventListener("click", btn);

/**
 * roll dice button handler
 */
document.querySelector(".btn-roll").addEventListener("click", function () {
  console.log("button was clicked");
  // 1. Get a random number
  var dice = Math.floor(Math.random() * 6) + 1;
  // 2. Display the result
  var diceDom = document.querySelector(".dice");
  diceDom.style.display = "block";

  // change src attribute in the dom
  diceDom.src = "dice-" + dice + ".png";

  // 3. Update the round score IF the rolled number was NOT a 1
  // here == does type coersion and === doesn't
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // Change the active player
    nextPlayer();
  }
});

/**
 * hold
 */
document.querySelector(".btn-hold").addEventListener("click", function () {
  // Add current score to global score
  score[activePlayer] += roundScore;
  // Change the UI
  document.querySelector("#score-" + activePlayer).textContent =
    score[activePlayer];

  // check if player won the game
  if (score[activePlayer] >= 30) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-panel")
      .classList.remove("active");
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  // change the style of the component as well
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  // better way is to toggler the class name, i.e. if exists, remove otherwise delete
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

/**
 * On reset request, reset the game
 */
document.querySelector(".btn-new").addEventListener("click", init);

/**
 * Initialize the game
 */
function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  // We can also modify css with querySelector
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
