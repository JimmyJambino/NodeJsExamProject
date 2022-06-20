import db from "../createConnection.js"

//all question from associated with a game
export async function readQuestions(){
    const allQuestions = await db.fibOrDib.find({}).toArray()

    // deletes the id property from question obj
    allQuestions.forEach(questionObj => delete questionObj._id)

    return allQuestions
}

//fetch all the questions required for a game, chooses random questions
//this could ineffecient if scaled but doesnt matter here
export async function readRandomQuestions(numberOfQuestions){
        const allQuestions = await readQuestions()
        const randomIndexesForQuestions = []
    
        //throws an error with the max amount of questions you can request if requesting more questions than in db
        if(numberOfQuestions > allQuestions.length){
            throw new RangeError("Not enough questions", {cause: {
                maxQuestions: allQuestions.length   
            }})
        }
    
        //gets a random number that is a valid index and puts it into array
        while(randomIndexesForQuestions.length <  numberOfQuestions) {
            const randomNumber = Math.floor(Math.random() * allQuestions.length)
    
            if(!randomIndexesForQuestions.includes(randomNumber)){
                randomIndexesForQuestions.push(randomNumber)
            }
        }
    
        // gets the questions from random indexes and puts them into an array
        const randomQuestions = randomIndexesForQuestions.map(index => allQuestions[index])
        
        return randomQuestions
}
