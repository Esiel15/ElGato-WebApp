var p1v = document.getElementById("p1v");
var p2v = document.getElementById("p2v");
var pTurn = document.getElementById("playerTurn");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var n = 6;
var m = 4;
var gridWidth = canvas.width/n;
var gridHeight = canvas.height/n;
var rectWidth, rectHeight;
var px, py;

var p1Name = ""; //Nombre del jugador 1
var p1Wins = 0; 
var p2Name = ""; //Nombre del jugador 2
var p2Wins = 0; 
var playerTurn; //Turno del jugador del juego actual
var contPieces; //Total de piezas en el tablero del juego actual

//Crear Tablero. SOLO SE HACE UNA VEZ CUANDO SE CARGA LA PÁGINA
var board = new Array(n);
for (var i = 0 ; i < n ; i++){
    board[i] = new Array(n);
}
iniciarJuego();

function drawPiece(event){
    var pos = getPosition(event);
    //console.log("X: " + pos.x);
    //console.log("Y: " + pos.y);

    px = Math.trunc(pos.x/rectWidth);
    console.log("PX: " + px);
    //py = Math. trunc(pos.y/rectHeight);
    //console.log("PY: " + py);
    py = 0;
    while (board[px][py] === 0 && py < n)
        py++;
    py--;

    if (board[px][py] === 0){
        disablePieceOption(true);
        switch(playerTurn){
            case 1:
                if (document.getElementById("p1X").checked === true){
                    dibujaEquis();
                }else{
                    dibujaCirculo();
                }
                board[px][py] = playerTurn;
                contPieces++;

                if (validacionGanador()){
                    p1v.innerHTML = ++p1Wins;
                    setTimeout(() => {
                        alert((p1Name === "" ? "Jugador 1" : p1Name) + " GANO!")
                        reiniciarGato();
                    }, 100);
                    
                }

                playerTurn = 2;
                break;
            case 2:
                if (document.getElementById("p2X").checked === true){
                    dibujaEquis();
                }else{
                    dibujaCirculo();
                }
                board[px][py] = playerTurn;
                contPieces++;

                if (validacionGanador()){
                    p2v.innerHTML = ++p2Wins;
                    setTimeout(() => {
                        alert((p2Name === "" ? "Jugador 2" : p2Name) + " GANO!")
                        reiniciarGato();
                    }, 100);
                }
                playerTurn = 1;
                break;
        }
        /*for (var i = 0 ; i < n ; i++)
            console.log(board[i]);*/

        setPlayerTurn();
    }else{
        alert("Esta casilla ya está llena, selecciona otra");
    }
    
    if (contPieces === n * n){
        alert("NO HUBO GANADOR")
        reiniciarGato();
    } 
}




function validacionGanador(){
    /*
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
    */
    cont = 0;
    i = px - (m-1);
   if (i < 0) i = 0;
    j = px + (m-1);
   if (j >= n) j = n-1;
    k = i;

   //HORIZONTAL
   while (k <= j){
       if (board[k][py] == playerTurn){
           cont++;
       }else{
           cont = 0;
       }
       if (cont === m) {
           return true;
       }
       k++;
   }


   //VERTICAL
   cont = 0;
   if (py + (m-1) < n){
       k = py;
       while(k <= (py + (m-1))){
           if (board[px][k] === playerTurn){
               cont++;
           }else{
               cont = 0;
           }
           if (cont === m)
               return true;
           
           k++;
       }
   }

   //CRUZADA : De derecha abajo a izquierda arriba
   let x, x2, y, y2;
   cont = 0;
    x = px - (m-1);
   if (x < 0) x = 0;
    y = py - (m-1);
   if (y < 0) y = 0;

    x2 = px + (m-1);
   if (x2 >= n) x2 = n - 1;
    y2 = py + (m-1);
   if (y2 >= n) y2 = n - 1;

   i = x2;
   j = y2;

   while (i >= x && j >= y){
       if (board[i][j] === playerTurn){
           cont++;
       }else{
           cont = 0;
       }
       if (cont===m){
           return true;
       } 
       i--;
       j--;
   }

   //CRUZADA : De izquierda abajo a derecha arriba
   cont = 0;
    x = px - (m - 1);
   if (x < 0) x = 0;
    y = py + (m - 1);
   if (y < 0) y = (n - 1);

    x2 = px + (m - 1);
   if (x2 >= n) x2 = n - 1;
    y2 = py - (m - 1);
   if (y2 >= n) y2 = 0;

   i = x;
   j = y;

   while (i <= x2 && j >= y2){
       if (board[i][j] === playerTurn){
           cont++;
       }else{
           cont = 0;
       }
       if (cont===m){
           return true;
       } 
       i++;
       j--;
   }





   


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
    for (var i = 0 ; i < n ; i++)
        for (var j = 0 ; j < n ; j++)
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
     rect = canvas.getBoundingClientRect();

    //console.log("rect width = " + rect.width);
    rectWidth = rect.width/n;
    //console.log("rect height = " + rect.height)
    rectHeight = rect.height/n;
     x = event.clientX - rect.left;
     y = event.clientY - rect.top;

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
    for (i = 1 ; i < n ; i++){
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