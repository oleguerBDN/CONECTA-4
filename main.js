/* For each letter, create a div under the div .container*/
const board = [ [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0],
                [0,0,0,0,0,0] ];


createBoardDivs();

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