import "dotenv/config"
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

import {Server} from "socket.io"
const io = new Server(server) // the namespace

//admin pannel to see the current rooms and clients connected
import { instrument } from "@socket.io/admin-ui"
instrument(io,{
    auth: false
})

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))

import connection from './sockets/connection.js'
io.on("connection", (socket) => {
    connection(socket)
})



const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(PORT)
})