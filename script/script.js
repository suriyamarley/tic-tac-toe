// elements
// player select card elements
const selectBoxEl = document.querySelector(".player-select"),
  select_X_btn = selectBoxEl.querySelector(".playerX"),
  select_O_btn = selectBoxEl.querySelector(".playerO");

// play board elements
const playBoardEl = document.querySelector(".play-board"),
  allBoxEl = document.querySelectorAll("section span"),
  playerEl = document.querySelector(".players");

// result card elements
const resultBoxEl = document.querySelector(".result-box"),
  wonTextEl = document.querySelector(".won-text"),
  playAgainBtn = document.querySelector(".btn");

// global variables
let playerSign = "X"; // initially we consider player will be x
let runBot = true; //we used this variable to stop the bot once match won by someone or drawn

// functions
// user click function
function clickedBox(element) {
  // if players element contains .players
  if (playerEl.classList.contains("player")) {
    element.innerHTML = `<i class="fa-solid fa-o"></i>`; // X icon
    playerEl.classList.add("active");
    // if user ID is X , bot ID will be O
    playerSign = "O";
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<i class="fa-solid fa-xmark"></i>`; //O icon
    playerEl.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  selectWinner(); //calling selectWinner function
  element.style.pointerEvents = "none";
  //add pointerEvents none to playboard so user can't immediately click on any other box until bot select
  playBoardEl.style.pointerEvents = "none";

  // passing delay time to bot click function
  setTimeout(() => {
    botClick(runBot);
    // random select delay time
  }, 800);
}

// bot click function
function botClick() {
  if (runBot) {
    playerSign = "O";
    let array = [];
    for (let i = 0; i < allBoxEl.length; i++) {
      if (allBoxEl[i].childElementCount === 0) {
        array.push(i);
      }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    allBoxEl[randomBox];
    if (array.length > 0) {
      if (playerEl.classList.contains("player")) {
        // if player
        allBoxEl[randomBox].innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        playerEl.classList.remove("active");
        playerSign = "X"; //if user is O ,then bot ID will be X
        allBoxEl[randomBox].setAttribute("id", playerSign);
      } else {
        allBoxEl[randomBox].innerHTML = `<i class="fa-solid fa-o"></i>`;
        playerEl.classList.remove("active");
        allBoxEl[randomBox].setAttribute("id", playerSign);
      }
      selectWinner(); //calling selectWinner function
    }
    // we cant select any box if bot fill any box
    allBoxEl[randomBox].style.pointerEvents = "none";
    //add pointerEvents auto in playboard so user can again click on box
    playBoardEl.style.pointerEvents = "auto";
    playerSign = "X";
  }
}

// getting box id`s
function getId(className) {
  //our classname in HTML box1...box2
  return document.querySelector(`.box${className}`).id;
}

// Checking id if matches or not
function checkIdSign(val1, val2, val3, sign) {
  //checking all id value is equal to sign (X or O) or not if yes then return true
  if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
    return true;
  }
}

// select winner
function selectWinner() {
  //if the one of following winning combination match then select the winner
  if (
    checkIdSign(1, 2, 3, playerSign) ||
    checkIdSign(4, 5, 6, playerSign) ||
    checkIdSign(7, 8, 9, playerSign) ||
    checkIdSign(1, 4, 7, playerSign) ||
    checkIdSign(2, 5, 8, playerSign) ||
    checkIdSign(3, 6, 9, playerSign) ||
    checkIdSign(1, 5, 9, playerSign) ||
    checkIdSign(3, 5, 7, playerSign)
  ) {
    runBot = false; //passing the false value to runBot so bot won't run again
    botClick(runBot); //calling bot function
    setTimeout(() => {
      //after match won by someone then hide the playboard and show the result box after 700ms
      resultBoxEl.classList.add("show");
      playBoardEl.classList.remove("show");
    }, 700);
    //displaying winning text with passing playerSign (X or O)
    wonTextEl.innerHTML = `Player <span>${playerSign}</span> Won The Game!`;
  } else {
    //if all boxes/element have id value and still no one win then draw the match
    if (
      getId(1) !== "" &&
      getId(2) !== "" &&
      getId(3) !== "" &&
      getId(4) !== "" &&
      getId(5) !== "" &&
      getId(6) !== "" &&
      getId(7) !== "" &&
      getId(8) !== "" &&
      getId(9) !== ""
    ) {
      //passing the false boolen value to runBot so bot won't run again
      runBot = false;
      botClick(runBot); //calling bot function
      setTimeout(() => {
        //after match drawn then hide the playboard and show the result box after 700ms
        resultBoxEl.classList.add("show");
        playBoardEl.classList.remove("show");
      }, 700);
      wonTextEl.textContent = "Match Draw!"; //displaying draw match text
    }
  }
}

// event listneres
// once window loaded
window.addEventListener("load", () => {
  for (let i = 0; i < allBoxEl.length; i++) {
    allBoxEl[i].setAttribute("onclick", "clickedBox(this)");
  }

  // selecting player x or o
  select_X_btn.addEventListener("click", () => {
    selectBoxEl.classList.add("hide");
    playBoardEl.classList.add("show");
  });
  select_O_btn.addEventListener("click", () => {
    selectBoxEl.classList.add("hide");
    playBoardEl.classList.add("show");
    playerEl.setAttribute("class", "players active player");
  });
});

// play again btn
playAgainBtn.addEventListener("click", () => {
  //reload the current page on replay button click
  window.location.reload();
});
