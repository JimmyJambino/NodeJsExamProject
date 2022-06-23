import "dotenv/config"
import express from "express"
import http, { Server } from "http"
import session from "express-session"
import accountRouter from "./routers/accountRouter.js"
import gameRouter from "./routers/gameRouter.js"
import customerGamesRouter from "./routers/accountsGamesRouter.js"
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
		secure: false
	}
})

app.use(express.json())
app.use(sessionMiddleware)
app.use("/api", accountRouter)
app.use("/api", gameRouter)
app.use("/api", customerGamesRouter)
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

//admin pannel to see the current rooms and clients connected
import { instrument } from "@socket.io/admin-ui"
instrument(io,{
    auth: false
})

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))

import connection from './sockets/connection.js'
import {combineFunctions} from "./sockets/joinRoom.js"
import {combineFibOrDib} from './sockets/fibOrDibSockets.js'
io.on("connection", (socket) => {
    
    combineFunctions(socket)
    combineFibOrDib(socket)
    
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(PORT)
})