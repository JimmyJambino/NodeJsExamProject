import db, {client} from "./createConnection.js"

const questions = [
    {
        question: "What is the name of Gagamels cat?",
        options: ["Gilgamesh", "Godzilla", "Michael"],
        answer: "Azrael"
    
    },
    {
        question: "Which haircolor does Tintin have?",
        options: ["White", "Black", "Blonde"],
        answer: "Ginger red"
    },
    {
        question: "When receiving the letter of entry to Hogwarts how old is one?",
        options: ["8", "10", "14"],
        answer: 11
    },
    {
        question: "What are the names of the three Totally Spies?",
        options: ["Max, Charlie and Sara", "Darcy, Trinity and Lucy", "Chelsea, Felicity and Alice"],
        answer: "Sam, Clover and Alex"
    },
    {
        question: "What is the name of the stones in Thanos\' gauntlet?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "Infinity Stones"
    },
    {
        question: "What is the name of the Island in which Jurassic Park takes place?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "Isla Nublar"
    },
    {
        question: "How do Harry and Ron get to Hogwarts in their second year?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "By Ron\'s father\'s flying car"
    },
    {
        question: "Who invented the word \"vomit\"?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the name of the Language spoken in The Sims?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "Simlish"
    },
    {
        question: "What is the most watched youtube video?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "Baby Shark"
    },
    {
        question: "What is the title of Titanic\'s theme song?",
        options: ["placeholder1", "placeholder2", "placeholder3"],
        answer: "My Heart will go on"
    },
    {
        question: "How many pokemons are there in the first generation?",
        options: ["150", "201", "200"],
        answer: "151"
    },
    
]

await db.fibOrDib.insertMany(questions)

//closes the connection
client.close()