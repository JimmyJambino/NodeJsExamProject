/*logic for controlling the flow of the game
keeping track of rounds, starting new rounds, keeping track of score and related logic
*/

//gameMode could be an int that represents game chosen by host
function selectGame(socket, gameMode){
    //auth the user tring to start the game and dont allow them to start the game if they dont own it
    switch (gameMode) {
        case 1:
            startFibOrDib()
            break;
        case 2:
            //another game
            break;
    
        default:
            //error
            break;
    }
}

function startFibOrDib(socket) {
    //send all the required questions for the game to the host
    socket.on("game:start", () => {
        
    })
}