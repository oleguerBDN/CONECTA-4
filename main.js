/* For each letter, create a div under the div .container*/
const size = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const teclasId = [
  "start",
  "col0",
  "col1",
  "col2",
  "col3",
  "col4",
  "col5",
  "col6",
  "cpu",
  "users",
];
const teclas = [];
let start = false;
let playerTurn = 0; // YELLOW: 1 RED: 2
let mode = "cpu";

let winYellow4 = "1111";
let winRed4 = "2222";
let winYellow3 = "111";
let winRed3 = "222";
let winYellow2 = "11";
let winRed2 = "22";
let winYellow1 = "1";
let winRed1 = "2";

createBoardDivs();

/* Afegeix element DOM al array */
teclasId.forEach(function (tecla) {
  teclas.push(document.getElementById(tecla));
});

let assignEvents = (tecla) => {
  tecla.onmouseover = teclaMouseOver;
  tecla.onmouseout = teclaMouseOut;
  tecla.onclick = teclaMouseClick;
};

let teclaMouseOver = (e) => {
  switch (e.target.id) {
    case "col0":
    case "col1":
    case "col2":
    case "col3":
    case "col4":
    case "col5":
    case "col6":
      document.getElementById(e.target.id).style.backgroundColor =
        "rgb(29, 62, 248)";
      break;

    default:
      break;
  }
};

let teclaMouseOut = (e) => {
  switch (e.target.id) {
    case "col0":
    case "col1":
    case "col2":
    case "col3":
    case "col4":
    case "col5":
    case "col6":
      document.getElementById(e.target.id).style.backgroundColor = "";
      break;

    default:
      break;
  }
};

let teclaMouseClick = (e) => {
  switch (e.target.id) {
    case "start":
      if (!start) {
        resetAll();
      } else {
        gameFinished();
      }
      break;
    case "col0":
    case "col1":
    case "col2":
    case "col3":
    case "col4":
    case "col5":
    case "col6":
      if (start) {
        addCard(e.target.id);
        checkWinner();
      }
      break;
    case "cpu":
      if (!start) {
        cpuMode();
      }
      break;
    case "users":
      if (!start) {
        usersMode();
      }
      break;
    default:
      break;
  }
};

/* Mode CPU activated */
function cpuMode() {
  document.getElementById("cpu").style.border = "darkblue solid 2px";
  document.getElementById("cpu").style.backgroundColor = "rgb(4, 138, 248)";
  document.getElementById("users").style.border = "";
  document.getElementById("users").style.backgroundColor = "rgb(210, 235, 255)";
  mode = "cpu";
}

/* Mode two users activated */
function usersMode() {
  document.getElementById("users").style.border = "darkblue solid 2px";
  document.getElementById("users").style.backgroundColor = "rgb(4, 138, 248)";
  document.getElementById("cpu").style.border = "";
  document.getElementById("cpu").style.backgroundColor = "rgb(210, 235, 255)";
  mode = "users";
}

/* Four different funcionts to check winner, by cols, rows and diagonal */
function checkWinner() {
  let winner = 0;
  winner = checkCols(winYellow4, winRed4);
  if (winner === 0) {
    winner = checkRows(winYellow4, winRed4);
  }
  if (winner === 0) {
    winner = checkDiagonal1(winYellow4, winRed4);
  }
  if (winner === 0) {
    winner = checkDiagonal2(winYellow4, winRed4);
  }

  if (winner !== 0) {
    defineWinner(winner);
  }
}

/* Check diagonal bottom-top left-right */
function checkDiagonal2(winYellow, winRed) {
  let str1 = "";
  let str2 = "";
  let longitud = 5;
  let k,
    x,
    y = 0;
  let winner = 0;
  for (let i = 5; i >= 3; i--) {
    str1 = "";
    str2 = "";
    k = i;
    x = 6 - i;
    y = 5;
    for (let j = 0; j <= longitud; j++) {
      str1 = str1 + size[j][k];
      str2 = str2 + size[x][y];
      k--;
      x++;
      y--;
    }
    longitud--;
    if (str1.includes(winYellow)) {
      winner = 1;
    }
    if (str1.includes(winRed)) {
      winner = 2;
    }
    if (str2.includes(winYellow)) {
      winner = 1;
    }
    if (str2.includes(winRed)) {
      winner = 2;
    }
    if (winner !== 0) {
      return winner;
    }
  }
  return 0;
}

/* Check diagonal top-bottom left-right */
function checkDiagonal1(winYellow, winRed) {
  let str1 = "";
  let str2 = "";
  let longitud = 5;
  let k = 0;
  let x = 0;
  let winner = 0;
  for (let i = 0; i <= 2; i++) {
    str1 = "";
    str2 = "";
    k = i;
    x = i + 1;
    for (let j = 0; j <= longitud; j++) {
      str1 = str1 + size[j][k];
      str2 = str2 + size[x][j];
      k++;
      x++;
    }
    longitud--;
    if (str1.includes(winYellow)) {
      winner = 1;
    }
    if (str1.includes(winRed)) {
      winner = 2;
    }
    if (str2.includes(winYellow)) {
      winner = 1;
    }
    if (str2.includes(winRed)) {
      winner = 2;
    }
    if (winner !== 0) {
      return winner;
    }
  }
  return 0;
}

/* Check winner on rows */
function checkRows(winYellow, winRed) {
  let winner = 0;
  let str = "";
  for (let i = 0; i < size[i].length; i++) {
    str = "";
    for (let k = 0; k < size.length; k++) {
      str = str + size[k][i];
    }
    if (str.includes(winYellow)) {
      winner = 1;
    }
    if (str.includes(winRed)) {
      winner = 2;
    }
    if (winner !== 0) {
      return winner;
    }
  }
  return 0;
}

/* Check winner on columns */
function checkCols(winYellow, winRed) {
  let winner = 0;
  let str = "";
  for (let i = 0; i < size.length; i++) {
    str = "";
    for (let k = 0; k < size[i].length; k++) {
      str = str + size[i][k];
    }
    if (str.includes(winYellow)) {
      winner = 1;
    }
    if (str.includes(winRed)) {
      winner = 2;
    }
    if (winner !== 0) {
      return winner;
    }
  }
  return 0;
}

/* Define the winner and modify the html required */
function defineWinner(w) {
  if (w === 1) {
    document.getElementById("pturn").innerHTML = "<b>YELLOW PLAYER WINS!<b>";
    document.getElementById("pturn").style.textShadow = "3px 3px 2px black";
    document.getElementById("pturn").style.color = "yellow";
    document.getElementById("container").style.borderTop = "yellow 10px solid";
    document.getElementById("container").style.borderBottom =
      "yellow 10px solid";
  } else {
    document.getElementById("pturn").innerHTML = "<b>RED PLAYER WINS!</b>";
    document.getElementById("pturn").style.textShadow = "3px 3px 2px black";
    document.getElementById("pturn").style.color = "red";
    document.getElementById("container").style.borderTop = "red 10px solid";
    document.getElementById("container").style.borderBottom = "red 10px solid";
  }

  start = false;
  document.getElementById("start").style.backgroundColor = "rgb(15, 230, 15)";
  document.getElementById("start").innerHTML = "- - RESTART GAME - -";
  document.getElementById("pturn").style.backgroundColor = "";

  document.getElementById("pturn").style.backgroundImage = "url(party.jpg)";
  playerTurn = 0;
}

/* Add card, css color and change the playerTurn, if column is already full it does nothing */
function addCard(idColumn) {
  let iCol = idColumn.substring(3);
  for (let i = size[iCol].length - 1; i >= 0; i--) {
    if (size[iCol][i] === 0) {
      size[iCol][i] = playerTurn;
      if (playerTurn === 1) {
        document.getElementById("pos" + iCol + i).style.backgroundColor =
          "yellow";
      } else {
        document.getElementById("pos" + iCol + i).style.backgroundColor = "red";
      }

      mode !== "cpu" ? changePlayerTurn() : cpuTurn();
      break;
    }
  }
}

/* IA STARTS HERE: */
function cpuTurn() {
  //CPU is always red so check for 2
  let tirada = 0;
  /* Check if the cpu have a chance to win (4) or either the user can win */
  for (i = 0; i < size.length; i++) {
    for (k = 5; k >= 0; k--) {
      if (size[i][k] === 0) {
        size[i][k] = 2;
        tirada = checkTiradaCpu4();
        if (tirada !== 0) {
          break;
        }

        size[i][k] = 1;
        tirada = checkTiradaCpu4();
        if (tirada !== 0) {
          size[i][k] = 2;
          break;
        }

        size[i][k] = 0;
        break;
      }
    }
    if (tirada !== 0) {
      break;
    }
  }

  /* If above option was not on the board, check for 3 in a row */
  if (tirada === 0) {
    for (i = 0; i < size.length; i++) {
      for (k = 5; k >= 0; k--) {
        if (size[i][k] === 0) {
          size[i][k] = 2;
          tirada = checkTiradaCpu3();
          if (tirada !== 0) {
            break;
          }

          size[i][k] = 1;
          tirada = checkTiradaCpu3();
          if (tirada !== 0) {
            size[i][k] = 2;
            break;
          }

          size[i][k] = 0;
          break;
        }
      }
      if (tirada !== 0) {
        break;
      }
    }
  }

  /* If three in a row is not possible, check for 2 in a row */
  if (tirada === 0) {
    for (i = 0; i < size.length; i++) {
      for (k = 5; k >= 0; k--) {
        if (size[i][k] === 0) {
          size[i][k] = 2;
          tirada = checkTiradaCpu2();
          if (tirada !== 0) {
            break;
          }

          size[i][k] = 1;
          tirada = checkTiradaCpu2();
          if (tirada !== 0) {
            size[i][k] = 2;
            break;
          }

          size[i][k] = 0;
          break;
        }
      }
      if (tirada !== 0) {
        break;
      }
    }
  }

  /* If there is no option of 4, 3, or 2 in a row, just pick one */
  if (tirada === 0) {
    for (i = 0; i < size.length; i++) {
      for (k = 5; k >= 0; k--) {
        if (size[i][k] === 0) {
          alert("pepe");
          size[i][k] = 2;
          tirada = checkTiradaCpu1();
          if (tirada !== 0) {
            break;
          }
          alert("pepe");

          size[i][k] = 1;
          tirada = checkTiradaCpu1();
          if (tirada !== 0) {
            size[i][k] = 2;
            break;
          }

          alert("pepe");

          size[i][k] = 0;
          break;
        }
      }
      if (tirada !== 0) {
        break;
      }
    }
  }

  document.getElementById("pos" + i + k).style.backgroundColor = "red";
}

/* Check winner options */
function checkTiradaCpu4() {
  let winner = checkCols(winYellow4, winRed4);
  if (winner === 0) {
    winner = checkRows(winYellow4, winRed4);
  }
  if (winner === 0) {
    winner = checkDiagonal1(winYellow4, winRed4);
  }
  if (winner === 0) {
    winner = checkDiagonal2(winYellow4, winRed4);
  }
  return winner;
}

/* Check three in a row options */
function checkTiradaCpu3() {
  let winner = checkCols(winYellow3, winRed3);
  if (winner === 0) {
    winner = checkRows(winYellow3, winRed3);
  }
  if (winner === 0) {
    winner = checkDiagonal1(winYellow3, winRed3);
  }
  if (winner === 0) {
    winner = checkDiagonal2(winYellow3, winRed3);
  }
  return winner;
}

/* Check 2 in a row options */
function checkTiradaCpu2() {
  let winner = checkCols(winYellow2, winRed2);
  if (winner === 0) {
    winner = checkRows(winYellow2, winRed2);
  }
  if (winner === 0) {
    winner = checkDiagonal1(winYellow2, winRed2);
  }
  if (winner === 0) {
    winner = checkDiagonal2(winYellow2, winRed2);
  }
  return winner;
}

/* Check 1 in a row options */
function checkTiradaCpu1() {
  let winner = checkCols(winYellow1, winRed1);
  if (winner === 0) {
    winner = checkRows(winYellow1, winRed1);
  }
  if (winner === 0) {
    winner = checkDiagonal1(winYellow1, winRed1);
  }
  if (winner === 0) {
    winner = checkDiagonal2(winYellow1, winRed1);
  }
  return winner;
}

/* change from the current Player turn to the other one and also modifies de div color*/
function changePlayerTurn() {
  if (playerTurn === 1) {
    playerTurn = 2;
    document.getElementById("pturn").style.backgroundColor = "red";
    document.getElementById("pturn").innerHTML = "RED TURN";
  } else {
    playerTurn = 1;
    document.getElementById("pturn").style.backgroundColor = "yellow";
    document.getElementById("pturn").innerHTML = "YELLOW TURN";
  }
}

/* Reset all thins from scratch so user can start again */
function resetAll() {
  resetMainBoard();
  document.getElementById("pturn").style.textShadow = "";
  document.getElementById("pturn").style.color = "";
  document.getElementById("pturn").style.backgroundImage = "";
  document.getElementById("start").style.backgroundColor = "red";
  document.getElementById("start").innerHTML = "- - END GAME - -";
  document.getElementById("pturn").style.backgroundColor = "yellow";
  if (mode === "cpu") {
    document.getElementById("pturn").innerHTML = "YOU ARE YELLOW";
  } else {
    document.getElementById("pturn").innerHTML = "YELLOW TURN";
  }
  document.getElementById("container").style.borderTop = "";
  document.getElementById("container").style.borderBottom = "";
  start = true;
  playerTurn = 1;
}

/* This function is called once game is finisihed or user press END GAME button */
function gameFinished() {
  start = false;
  document.getElementById("start").style.backgroundColor = "rgb(15, 230, 15)";
  document.getElementById("start").innerHTML = "- - START GAME - -";
  document.getElementById("pturn").style.backgroundColor = "";
  document.getElementById("pturn").innerHTML = "PLAYER TURN";
  playerTurn = 0;
}

/* Generates de main board game */
function createBoardDivs() {
  for (let i = 0; i < size.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.id = "col" + i;
    newDiv.className = "col";
    document.getElementById("container").appendChild(newDiv);
    for (let k = 0; k < size[i].length; k++) {
      let newChildDiv = document.createElement("div");
      newChildDiv.id = "pos" + i + k;
      newChildDiv.className = "pos" + i + k;
      document.getElementById("col" + i).appendChild(newChildDiv);
    }
  }
}

/* Reset main board */
function resetMainBoard() {
  for (let i = 0; i < size.length; i++) {
    for (let k = 0; k < size[i].length; k++) {
      size[i][k] = 0;
      document.getElementById("pos" + i + k).style.backgroundColor = "";
    }
  }
}

/* checking for user interaction */
teclas.forEach(assignEvents); /* mouse events on designed buttons */
