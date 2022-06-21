//for the current question save the answer from all users (if submitted) 

//array of objects of form: userIdentifier, answer.
const userAnswers = []
export function combineGameRoundSockets(socket) {
    gameRound(socket, roundTimerSeconds)
}

function answerSubmit(socket){
    socket.on("game:answerSubmit", (data) => {
        //TODO: run check for malformed data?
        userAnswers.push(data)
    })
}

function noUserAnswerSubmit(socket){
    socket.on("game:noAnswerSubmit", () => {
        //give them a random answer but only halfpoints?
    })

}

export function gameRound(socket, roundTimerSeconds){
    //recieve answers
    answerSubmit(socket)
    //round timer
    setTimeout(() => {
        //if a user didnt answer do stuff here
        noUserAnswer(socket)

        //Stop round
        //clear answers
        userAnswers = []
    },1000*roundTimerSeconds)
}