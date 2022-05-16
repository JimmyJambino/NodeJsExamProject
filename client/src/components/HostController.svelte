<script>
    export let rounds
    export let maxPlayers
    let currentRounds
    let players = []
    questions = async() => await fetch() // readRandomQuestions endpoint

    function updateScore() {

    }

	socket.on("playerJoined", ({data}) => {
        if(players.length < maxPlayers) {
            players.push({
            name: data.name,
            score: 0,
            currentAnswer: ""
            })
        }
        socket.to("room").emit("playerJoined", {data: players.length < maxPlayers}) // Whether the room is full or not.
	})

    socket.on("submit", ({data}) => { // Listening for player inputs

    })
</script>



