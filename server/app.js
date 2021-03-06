import "dotenv/config"
import express from "express"
import http from "http"
import session from "express-session"
import accountRouter from "./routers/accountRouter.js"
import gameRouter from "./routers/gameRouter.js"
import accountsGamesRouter from "./routers/accountsGamesRouter.js"
import questionRouter from "./routers/questionRouter.js"
import paymentRouter from "./routers/paymentRouter.js"
import merchRouter from "./routers/merchRouter.js"

const app = express()
app.use(express.json())

import path from "path"
app.use(express.static(path.resolve("../client/public/")))

const sessionMiddleware = session({
    name: "session",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
		httpOnly: true,
		secure: false,
        sameSite: true
	}
})

app.use(express.json())
app.use(sessionMiddleware)
app.use("/api", accountRouter)
app.use("/api", gameRouter)
app.use("/api", accountsGamesRouter)
app.use("/api", paymentRouter)
app.use("/api", questionRouter)
app.use("/api", merchRouter)

const server = http.createServer(app)

import {Server as socketServer} from "socket.io"
const io = new socketServer(server, {
    cors: {
        origin: "http://localhost:8080"
    }
}) // the namespace

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))

import {combineConnectionSockets} from "./sockets/connectionSocket.js"
import {combineGameSockets} from './sockets/gameSockets.js'
io.on("connection", (socket) => {
    
    combineConnectionSockets(socket)
    combineGameSockets(socket)
    
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(PORT)
})