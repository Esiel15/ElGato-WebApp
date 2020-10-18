var p1v = document.getElementById("p1v");
var p2v = document.getElementById("p2v");
var pTurn = document.getElementById("playerTurn");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gridWidth = canvas.width/3;
var gridHeight = canvas.height/3;
var rectWidth, rectHeight;
var px, py;



var p1Name = ""; //Nombre del jugador 1
var p1Wins = 0; // player 1's won games
var p2Name = ""; //Nombre del jugador 2
var p2Wins = 0; // player 2's won games
var playerTurn; //Turno del jugador del juego actual
var contPieces; //Total de piezas en el tablero del juego actual

//Crear Tablero. SOLO SE HACE ÇUNA VEZ CUANDO SE CARGA LA PÁGINA
var board = new Array(3);
for (var i = 0 ; i < 3 ; i++){
    board[i] = new Array(3);
}
iniciarJuego();

function drawPiece(event){
    var pos = getPosition(event);
    //console.log("X: " + pos.x);
    //console.log("Y: " + pos.y);

    px = Math.trunc(pos.x/rectWidth);
    //console.log("PX: " + px);
    py = Math. trunc(pos.y/rectHeight);
    //console.log("PY: " + py);

    if (board[px][py] === 0){
        disablePieceOption(true);
        switch(playerTurn){
            case 1:
                if (document.getElementById("p1X").checked === true){
                    dibujaEquis();
                }else{
                    dibujaCirculo();
                }
                board[px][py] = 1;
                contPieces++;

                if (validacionGanador()){
                    alert(p1Name + " Jugador 1 es el ganador")
                    p1v.innerHTML = ++p1Wins;
                    reiniciarGato();
                }

                playerTurn = 2;
                break;
            case 2:
                console.log("ENTRA AQUI")
                if (document.getElementById("p2X").checked === true){
                    dibujaEquis();
                }else{
                    dibujaCirculo();
                }
                board[px][py] = 2;
                contPieces++;

                if (validacionGanador()){
                    alert(p2Name + " Jugador 2 es el ganador")
                    p2v.innerHTML = ++p2Wins;
                    reiniciarGato();
                }
                playerTurn = 1;
                break;
        }
        for (var i = 0 ; i < 3 ; i++)
            console.log(board[i]);

        setPlayerTurn();
    }else{
        alert("Esta casilla ya está ocupada, selecciona otra");
    }
    
    if (contPieces == 9){
        alert("NO HUBO GANADOR")
        reiniciarGato();
    } 
}




function validacionGanador(){
    if (contPieces >= 5){
        console.log("Validar ganador");
        if ((board[0][0] === board[1][0] && board[1][0] === board[2][0] && board[2][0] != 0) ||
            (board[0][1] === board[1][1] && board[1][1] === board[2][1] && board[2][1] != 0) ||
            (board[0][2] === board[1][2] && board[1][2] === board[2][2] && board[2][2] != 0) ||

            (board[0][0] === board[0][1] && board[0][1] === board[0][2] && board[0][2] != 0) ||
            (board[1][0] === board[1][1] && board[1][1] === board[1][2] && board[1][2] != 0) ||
            (board[2][0] === board[2][1] && board[2][1] === board[2][2] && board[2][2] != 0) ||

            (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] != 0) ||
            (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] != 0)){
                console.log("GANO!");
                return true;
        }
    }
    return false;
}

function iniciarJuego(){
    contPieces = 0;
    restartBoard();
    disablePieceOption(false);
    playerTurn = Math.floor(Math.random() * 2) + 1;
    //console.log("Turno = " + playerTurn);
    setPlayerTurn();  
}


function setPlayerTurn(){
    switch (playerTurn){
        case 1:
            if (p1Name === "")
                pTurn.innerHTML = "Jugador 1";
            else
                pTurn.innerHTML = p1Name;
            break;
        case 2:
            if (p2Name === "")
                pTurn.innerHTML = "Jugador 2"
            else
                pTurn.innerHTML = p2Name
            break;
    }
}

/* BOTONES */
function reiniciarGato(){
    console.log("Reiniciar juego");
    limpiarGato();
    iniciarJuego();
    dibujarGato();
    
}

function restartBoard(){
    for (var i = 0 ; i < 3 ; i++)
        for (var j = 0 ; j < 3 ; j++)
            board[i][j] = 0;
}

function reiniciarPuntuaciones(){
    console.log("Reiniciar puntuaciones");
    p1Wins = 0;
    p2Wins = 0;
    p1v.innerHTML = p1Wins;
    p2v.innerHTML = p2Wins;
}

function changeName(num){
    switch(num){
        case 1:
            p1Name = document.getElementById("p1NameInput").value;
            setPlayerTurn();
            break;
        case 2:
            p2Name = document.getElementById("p2NameInput").value;
            setPlayerTurn();
            break;
    }
}


/* COORDENADAS */
/* Las coordenadas son respecto a la pantalla */
function getPosition(event){
    let rect = canvas.getBoundingClientRect();

    //console.log("rect width = " + rect.width);
    rectWidth = rect.width/3;
    //console.log("rect height = " + rect.height)
    rectHeight = rect.height/3;
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    return {x, y};
}


/* CANVAS */
function dibujaEquis(){
    console.log("Dibuja Equis")
    ctx.beginPath();
        /*\ */
        ctx.moveTo(px*gridWidth + gridWidth*.15, py*gridHeight + gridHeight*.15);
        ctx.lineTo((px+1)*gridWidth - gridWidth*.15, (py+1)*gridHeight - gridHeight*.15);
        /*/ */
        ctx.moveTo((px+1)*gridWidth - gridWidth*.15, py*gridHeight + gridHeight*.15);
        ctx.lineTo(px*gridWidth + gridWidth*.15, (py+1)*gridHeight - gridHeight*.15);
        
    ctx.strokeStyle = '#db3a12'
    ctx.stroke();
    ctx.strokeStyle = '#000'

}

function dibujaCirculo(){
    console.log("Dibuja Circulo")
    ctx.beginPath();
        ctx.arc((px*gridWidth)+(gridWidth*.5), (py*gridHeight)+(gridHeight*.5), gridHeight*.4, 0, 2*Math.PI);
    ctx.strokeStyle = '#4287f5'
    ctx.stroke();
    ctx.strokeStyle = '#000'
}

function dibujarGato() {
    console.log("Dibuja Gato")
    var i;
    for (i = 1 ; i < 3 ; i++){
        ctx.beginPath();
            // Lineas paralelas
            ctx.moveTo(i*gridWidth, 0);
            ctx.lineTo(i*gridWidth, canvas.height)
            //Lineas Horizontales
            ctx.moveTo(0, i*gridHeight);
            ctx.lineTo(canvas.width, i*gridHeight)
        ctx.stroke();
    }
}

function limpiarGato(){
    console.log("Limpiar gato")
    ctx.clearRect(0,0, canvas.width, canvas.height);
}


function disablePieceOption(b){
    document.getElementById("p1X").disabled = b;
    document.getElementById("p1O").disabled = b;
    document.getElementById("p2X").disabled = b;
    document.getElementById("p2O").disabled = b;

}

function changePiece(opc){
    switch (opc){
        case 1:
            console.log("1");
            //Player 1 - X
            //Player 2 - O
            document.getElementById("p2O").checked = true;
            break;
        case 2:
            console.log("2");
            //Player 1 - O
            //Player 2 - X
            document.getElementById("p2X").checked = true;
            break;
        case 3:
            console.log("3");
            //Player 2 - X
            //Player 1 - O
            document.getElementById("p1O").checked = true;
            break;
        case 4:
            console.log("4");
            //Player 2 - O
            //Player 1 - X
            document.getElementById("p1X").checked = true;
            break;
    }

}



