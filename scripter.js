let xl = 0;

var Gameboard = (function() {
    let arr = ["", "", "", "", "", "", "", "", ""]
    let playernames = []
    let trace = 0;
    let small = document.getElementsByClassName("small")[0]
    let big = document.getElementsByClassName("big")[0]
    let popup = document.getElementsByClassName("popup")[0]
    let words = document.getElementsByClassName("words")[1]
    let won = document.getElementsByClassName("won")[0]
    let reseter = document.getElementsByClassName("reset")[0]
    let box = document.getElementsByClassName('box')[0]
    let player1 = document.getElementsByClassName("popup-open1")[0]
    let player2 = document.getElementsByClassName("popup2")[0]
    let inpit = document.getElementsByClassName("inpit")[0]
    let inpiter = document.getElementsByClassName("inpit")[1]
    let reet = 0;
    let fly = true;
    return {
        siv2: function(){
            if(inpit.value != undefined) {
                playernames[0] = inpit.value;
                player1.classList.remove("popup-open1")
                player1.classList.add("popup2")
                for(let i = 0; i < arr.length; i++) {
                    box = document.getElementsByClassName('box')[i]
                    box.setAttribute("onclick", `Gameboard.choose(${i})`);
                }
                reseter.setAttribute("onclick", "Gameboard.reset()")
            }
        },
        bestMove: function(){
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < 9; i++) {
                if(arr[i] == '') {
                    arr[i] = 'X';
                    let score = Gameboard.minimax(arr, 0, false);
                    arr[i] = '';
                    if(score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            Gameboard.addX(move);
        },          
        minimax: function(board, depth, maximize) {
            let result = Gameboard.win2();
            if (result != null) {
                return result;
            }
            if(maximize) {
                let bestScore = -Infinity;
                for(let i = 0; i < 9; i++) {
                    if(board[i] == "") {
                        board[i] = 'X';
                        let score = Gameboard.minimax(board, depth + 1, false);
                        board[i] = "";
                        bestScore = Math.max(score, bestScore)
                    }
                }
                return bestScore;
            } 
            else{
                let bestScore = Infinity;
                for(let i = 0; i < 9; i++) {
                    if(board[i] == '') {
                        board[i] = 'O';
                        let score = Gameboard.minimax(board, depth + 1, true);
                        board[i] = '';
                        bestScore = Math.min(score, bestScore)
                    }
                } 
                return bestScore;
            }
        },
        win2: function(){
            if((arr[0] == "O" && arr[1] == "O" && arr[2]== "O")||(arr[3] == "O" && arr[4] == "O" && arr[5] == "O")||(arr[6] == "O" && arr[7] == "O" && arr[8] == "O")) {
                return -1;
            }
            else if((arr[0] == "X" && arr[1] == "X" && arr[2] == "X")||(arr[3] == "X" && arr[4] == "X" && arr[5] == "X")||(arr[6] == "X" && arr[7] == "X" && arr[8] == "X")) {
                return 1;
            }
            else if((arr[0] == "O" && arr[3] == "O" && arr[6]== "O")||(arr[1] == "O" && arr[4] == "O" && arr[7] == "O")||(arr[2] == "O" && arr[5] == "O" && arr[8] == "O")) {
                return -1;
            }
            else if((arr[0] == "X" && arr[3] == "X" && arr[6]== "X")||(arr[1] == "X" && arr[4] == "X" && arr[7] == "X")||(arr[2] == "X" && arr[5] == "X" && arr[8] == "X")) {
                return 1;
            }
            else if((arr[2] == "O" && arr[4] == "O" && arr[6] == "O")||(arr[0] == "O" && arr[4] == "O" && arr[8] == "O")) {
                return -1;
            }
            else if((arr[2] == "X" && arr[4] == "X" && arr[6] == "X")||(arr[0] == "X" && arr[4] == "X" && arr[8] == "X")) {
                return 1;
            }
            else{
                return Gameboard.checker2()
            }

        },
        win: function(){
            if((arr[0] == "O" && arr[1] == "O" && arr[2]== "O")||(arr[3] == "O" && arr[4] == "O" && arr[5] == "O")||(arr[6] == "O" && arr[7] == "O" && arr[8] == "O")) {
                xl++;
                Gameboard.statement()
            }
            else if((arr[0] == "X" && arr[1] == "X" && arr[2] == "X")||(arr[3] == "X" && arr[4] == "X" && arr[5] == "X")||(arr[6] == "X" && arr[7] == "X" && arr[8] == "X")) {
                xl--;
                Gameboard.statement()
            }
            else if((arr[0] == "O" && arr[3] == "O" && arr[6]== "O")||(arr[1] == "O" && arr[4] == "O" && arr[7] == "O")||(arr[2] == "O" && arr[5] == "O" && arr[8] == "O")) {
                xl++;
                Gameboard.statement()
            }
            else if((arr[0] == "X" && arr[3] == "X" && arr[6]== "X")||(arr[1] == "X" && arr[4] == "X" && arr[7] == "X")||(arr[2] == "X" && arr[5] == "X" && arr[8] == "X")) {
                xl--;
                Gameboard.statement()
            }
            else if((arr[2] == "O" && arr[4] == "O" && arr[6] == "O")||(arr[0] == "O" && arr[4] == "O" && arr[8] == "O")) {
                xl++;
                Gameboard.statement()
            }
            else if((arr[2] == "X" && arr[4] == "X" && arr[6] == "X")||(arr[0] == "X" && arr[4] == "X" && arr[8] == "X")) {
                xl--;
                Gameboard.statement()
            }
            else{
                Gameboard.checker()
            }

        },
        checker: function(){
            if(arr[0] != "" && arr[1] != "" && arr[2] != "" && arr[3] != "" && arr[4] != "" && arr[5] != "" && arr[6] != "" && arr[7] != "" && arr[8] != "" ) {
                popup.classList.remove("popup")
                popup.classList.add("popup-open")
                words.innerHTML = "It's a Tie!"
                won.innerHTML = "";
            }
        },
        checker2: function(){
            if(arr[0] != "" && arr[1] != "" && arr[2] != "" && arr[3] != "" && arr[4] != "" && arr[5] != "" && arr[6] != "" && arr[7] != "" && arr[8] != "" ) {
                return 0;
            }
        },
        statement: function(r){
            reet++;
            if(xl>0){
                words.innerHTML = "Congratulations, " + playernames[0] + "!";
            }
            else if(xl<0){
                words.innerHTML = "Congratulations, " + "AI" + "!";
            }
            popup.classList.remove("popup")
            popup.classList.add("popup-open")
            xl = 0;
            for(let i = 0; i < arr.length; i++) {
                let box = document.getElementsByClassName('box')[i]
                box.setAttribute("onclick", "");
            }
            reseter.setAttribute("onclick", "")
            big.innerHTML = "Game";
            small.innerHTML = "Over!";            
        },
        insert: function() {
            for(let i = 0; i < arr.length; i++) {
                box = document.getElementsByClassName('box')[i]
                box.innerHTML = arr[i];
            }
            Gameboard.win()        
        },
        reset: function(){
            fly = false;
            arr = ["", "", "", "", "", "", "", "", ""]
            for(let i = 0; i < arr.length; i++) {
                box = document.getElementsByClassName('box')[i]
                box.setAttribute("onclick", `Gameboard.choose(${i})`);
            }
            reseter.setAttribute("onclick", "Gameboard.reset()")
            big.innerHTML = "O";
            small.innerHTML = "Goes First";
            Gameboard.insert()
            trace = 0;
        },
        reset2: function(){
            fly = false;
            popup.classList.remove("popup-open")
            popup.classList.add("popup")
            arr = ["", "", "", "", "", "", "", "", ""]
            for(let i = 0; i < arr.length; i++) {
                box = document.getElementsByClassName('box')[i]
                box.setAttribute("onclick", `Gameboard.choose(${i})`);
            }
            reseter.setAttribute("onclick", "Gameboard.reset()")
            big.innerHTML = "O";
            small.innerHTML = "Goes First";
            Gameboard.insert()
            trace = 0;
            reet = 0;
        },
        addX: function(ran){
            if(arr[ran] != "O" && arr[ran] != "X") {
                arr.splice(ran, 1,"X")
                Gameboard.insert()
            }
        },
        addO: function(t){
            fly = true;
            if(arr[t] != "O" && arr[t] != "X") {
                arr.splice(t, 1,"O")
                Gameboard.insert()
            }         
        },
        addAI: function() {
            let ran = Math.floor(Math.random()*8) + 1;
            if(arr[ran] != "O" && arr[ran] != "X") {
                big.innerHTML = playernames[0]+"'s";
                small.innerHTML = "Turn";
                Gameboard.addX(ran);
            }
            else{
                Gameboard.addAI()
            } 
        },
    
        choose: async function(t){
            if(arr[t] != "O" && arr[t] != "X") {
                big.innerHTML = "Computer's";
                small.innerHTML = "Turn";
                Gameboard.addO(t);
                Gameboard.win()
                await new Promise(resolve => setTimeout(resolve, 1000));

                if(false == (arr[0] != "" && arr[1] != "" && arr[2] != "" && arr[3] != "" && arr[4] != "" && arr[5] != "" && arr[6] != "" && arr[7] != "" && arr[8] != "" )) {
                    for(let i = 0; i < arr.length; i++) {
                        let box = document.getElementsByClassName('box')[i]
                        box.setAttribute("onclick", "");
                    }
                    if(xl <= 0 && reet <= 0 && fly == true) {
                        Gameboard.bestMove()
                    }
                    for(let i = 0; i < arr.length; i++) {
                        let box = document.getElementsByClassName('box')[i]
                        box.setAttribute("onclick", `Gameboard.choose(${i})`);
                    }
                }
            }
        }
    }
}
)();