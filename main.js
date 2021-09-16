/* For each letter, create a div under the div .container*/
const board = [ [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0] ];

const teclasId = ['start','col0','col1','col2','col3','col4','col5','col6'];
const teclas = [];
let start = false; 
let playerTurn = 0; // YELLOW: 1 RED: 2

let winYellow = '1111'; 
let winRed = '2222';

createBoardDivs();

/* Afegeix element DOM al array */
teclasId.forEach(function(tecla){
    teclas.push(document.getElementById(tecla));
  })


let assignEvents = (tecla) =>{
    tecla.onmouseover = teclaMouseOver;
    tecla.onmouseout = teclaMouseOut;
    tecla.onclick = teclaMouseClick;
  }

let teclaMouseOver = (e) => {
    switch (e.target.id) {
        case "col0": case "col1": case "col2": case "col3": case "col4": case "col5": case "col6":
                document.getElementById(e.target.id).style.backgroundColor = "rgb(29, 62, 248)";
        break;

        default:
        break;
    }
}

let teclaMouseOut = (e) => {
    switch (e.target.id) {
        case "col0": case "col1": case "col2": case "col3": case "col4": case "col5": case "col6":
                document.getElementById(e.target.id).style.backgroundColor = "";
        break;

        default:
        break;
    }
}

let teclaMouseClick = (e) => {
    switch (e.target.id) {
        case "start":
            if (!start) { 
                resetAll();
            } else { 
                gameFinished();
            }
        break;
        case "col0": case "col1": case "col2": case "col3": case "col4": case "col5": case "col6":
            if (start){
                addCard(e.target.id);
                checkWinner(); 
            }
        break;

        default:
        break;
    }
}

/* Four different funcionts to check winner, by cols, rows and diagonal */
function checkWinner(){
    let winner = 0; 
    winner = checkCols();
    if (winner === 0){ winner = checkRows(); };
    if (winner === 0){ winner = checkDiagonal1(); };
    if (winner === 0){ winner = checkDiagonal2(); };

    if (winner!== 0) { defineWinner(winner); };
}

/* Check diagonal bottom-top left-right */
function checkDiagonal2(){
    let str1 = "";
    let str2 = "";
    let longitud = 5; 
    let k,x,y = 0; 
    let winner = 0; 
    for (let i = 5; i >= 3; i--){
        str1 = ""; str2 = ""; 
        k=i; x=6-i; y=5; 
        for (let j = 0; j <=longitud; j++){
            str1 = str1 + board[j][k];
            str2 = str2 + board[x][y];
            k--; x++; y--; 
        }
        longitud--;
        if (str1.includes(winYellow)) { winner = 1 };
        if (str1.includes(winRed)) { winner = 2 };
        if (str2.includes(winYellow)) { winner = 1 };
        if (str2.includes(winRed)) { winner = 2 };
        if (winner !== 0) { return winner; }
        
    }
    return 0; 

}

/* Check diagonal top-bottom left-right */
function checkDiagonal1(){
    let str1 = "";
    let str2 = "";
    let longitud = 5; 
    let k = 0; 
    let x = 0; 
    let winner = 0; 
    for (let i = 0; i <= 2; i++){
        str1 = ""; str2 = ""; 
        k= i; 
        x = i + 1; 
        for (let j = 0; j <=longitud; j++){
            str1 = str1 + board[j][k];
            str2 = str2 + board[x][j];
            k++; x++; 
        }
        longitud--;
        if (str1.includes(winYellow)) { winner = 1 };
        if (str1.includes(winRed)) { winner = 2 };
        if (str2.includes(winYellow)) { winner = 1 };
        if (str2.includes(winRed)) { winner = 2 };
        if (winner !== 0) { return winner; }
        
    }
    return 0; 

}

/* Check winner on rows */ 
function checkRows(){
    let winner = 0; 
    let str = ""; 
    for(let i = 0; i<board[i].length; i++){
        str = ""; 
        for (let k = 0; k<board.length; k++) {
            str = str + board[k][i];
        }
        if (str.includes(winYellow)) { winner = 1 };
        if (str.includes(winRed)) { winner = 2 };
        if (winner !== 0) { return winner; }
    }
    return 0; 
}

/* Check winner on columns */ 
function checkCols(){
    let winner = 0; 
    let str = ""; 
    for(let i = 0; i<board.length; i++){
        str = ""; 
        for (let k = 0; k<board[i].length; k++) {
            str = str + board[i][k];
        }
        if (str.includes(winYellow)) { winner = 1 };
        if (str.includes(winRed)) { winner = 2 };
        if (winner !== 0) { return winner; }
    }
    return 0; 
}

/* Define the winner and modify the html required */
function defineWinner(w){
    if (w === 1){
        document.getElementById("pturn").innerHTML = "YELLOW PLAYER WINS!";
    } else {
        document.getElementById("pturn").innerHTML = "RED PLAYER WINS!";
    }

    start = false;
    document.getElementById("start").style.backgroundColor = "rgb(15, 230, 15)";
    document.getElementById("start").innerHTML = "- - RESTART GAME - -";
    document.getElementById("pturn").style.backgroundColor = "";
    playerTurn = 0; 

}

/* Add card, css color and change the playerTurn, if column is already full it does nothing */ 
function addCard(idColumn){
    let iCol = idColumn.substring(3);
    for (let i = board[iCol].length-1; i>=0; i--){
        if (board[iCol][i] === 0) {
            board[iCol][i] = playerTurn;  
            if (playerTurn === 1){
                document.getElementById('pos'+iCol+i).style.backgroundColor = 'yellow';
            } else {
                document.getElementById('pos'+iCol+i).style.backgroundColor = 'red';
            } 
            changePlayerTurn();      
            break; 
        }
    }

}

/* change from the current Player turn to the other one and also modifies de div color*/ 
function changePlayerTurn(){
    if(playerTurn === 1){
        playerTurn = 2; 
        document.getElementById("pturn").style.backgroundColor = "red";
        document.getElementById("pturn").innerHTML = "RED TURN";
    } else{
        playerTurn = 1; 
        document.getElementById("pturn").style.backgroundColor = "yellow";
        document.getElementById("pturn").innerHTML = "YELLOW TURN";
    }
}

/* Reset all thins from scratch so user can start again */
function resetAll(){
    resetMainBoard();
    document.getElementById("start").style.backgroundColor = "red";
    document.getElementById("start").innerHTML = "- - END GAME - -";
    document.getElementById("pturn").style.backgroundColor = "yellow";
    document.getElementById("pturn").innerHTML = "YELLOW TURN";
    start = true; 
    playerTurn = 1; 
}

/* This function is called once game is finisihed or user press END GAME button */ 
function gameFinished(){
    start = false;
    document.getElementById("start").style.backgroundColor = "rgb(15, 230, 15)";
    document.getElementById("start").innerHTML = "- - START GAME - -";
    document.getElementById("pturn").style.backgroundColor = "";
    document.getElementById("pturn").innerHTML = "PLAYER TURN";
    playerTurn = 0; 
}

/* Generates de main board game */ 
function createBoardDivs(){
    for(let i = 0; i<board.length; i++){
        let newDiv = document.createElement('div');
        newDiv.id = 'col'+ i; 
        newDiv.className = 'col';
        document.getElementById('container').appendChild(newDiv);
        for(let k = 0; k<board[i].length; k++){
            let newChildDiv = document.createElement('div');
            newChildDiv.id = 'pos' + i + k; 
            newChildDiv.className = 'pos' + i + k;
            document.getElementById('col'+i).appendChild(newChildDiv);
        }
    }
}

/* Reset main board */ 
function resetMainBoard(){
    for(let i = 0; i<board.length; i++){
        for(let k = 0; k<board[i].length; k++){
            board[i][k] = 0; 
            document.getElementById('pos'+i+k).style.backgroundColor = '';
        }
    }
}



/* checking for user interaction */
teclas.forEach(assignEvents); /* mouse events on designed buttons */