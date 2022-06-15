/*
import db from "../createConnection.js"

class Question {
    constructor(question, answer) { 
        this.question = question
        this.answer = answer
    }
}

const questions = [
    new Question("Did Mads use to have hair?", "Yes."),
    new Question(
        "Usually when programmers learn a new language, their first print statement is 'Hello, World!', but in our group it is '___ mads sucks balls'. What is 'mads sucks balls' prefaced with?",
        "lol")
]
//games.forEach(elem => {console.log(elem.name)})

// Works
async function createDummyQuestions() { // To fill out the database for testing, later to actually fill out the database with pre-made games.
    questions.forEach(question => {
        db.run(`INSERT INTO questions (question, answer) VALUES (?, ?)`, 
        [question.question, question.answer])
    })
}

export function createQuestion(question) {
    db.run(`INSERT INTO questions (question, answer) VALUES (?, ?)`, [question.question, question.answer])
}

// Works
export async function readAllQuestions() {
    const result = await db.all("SELECT * FROM questions")
    console.log(result)
    return result
}

// Doesn't work in the current context. Questions don't belong to a specific quiz / trivia at the moment.
export async function readQuestions(gameId) {
    const result = await db.all("SELECT * FROM questions WHERE gameId = ?", gameId)
    return result
}

export async function readRandomQuestions(gameId, number) {
    let questionSet = Set()
    const allQuestions = await db.all(`SELECT * FROM questions WHERE gameId = ?`, gameId)
    
    while(questionSet.length < number) {
        const randomNumber = Math.floor(Math.random() * allQuestions.length);
        questionSet.add(allQuestions[randomNumber])
    }

    return questionSet
}

// Works
// We might not even need this? And remember to delete relations as well in the many-to-many tables.
function deleteQuestion(questionId) {
    db.run("DELETE FROM questions where id = ?", questionId)
}

// Works
function updateQuestion(question) {
    db.run("UPDATE questions SET question = ?, answer = ? WHERE id = ?", [question.question, question.answer, question.id])
}


*/
