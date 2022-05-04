import "dotenv/config" // short hand for the import + config()
import express from "express"
import http from "http"
import session from "express-session"
import accountRouter from "./routers/accountRouter.js"

const app = express()
app.use(express.urlencoded({ extended: true})) // how deep is the url encoding, extended in this case. Parsing forms and not json.

import path from "path"
app.use(express.static(path.resolve("../client/public/")))

const sessionMiddleware = session({ 
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
})

app.use(sessionMiddleware)
app.use(accountRouter)

const server = http.createServer(app)

// import {io} from "./sockets/connection.js"
import {Server} from "socket.io"
const io = new Server(server) // the namespace

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))

//export default io
// import connectTest from "./sockets/connection.js"
// connectTest(io)
import connection from './sockets/connection.js'
io.on("connection", (socket) => {
    connection(socket)
    // socket.on("test", (data) => {
    //     console.log(data)
    // })
})



const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(PORT)
})