const express = require('express');
const cors = require('cors');
const http = require('http');
const {Server} = require('socket.io');
const app = express();
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin: " http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {

   console.log("A user connected...");

   socket.on('disconnect', () => {
    console.log('User disconnected');
});

socket.on("message", (data) => {
    console.log(data.message);

    socket.broadcast.emit("message", {message : data.message});
})

})

app.get('/', (req, res) => {
    res.send("Superchat API")
})

server.listen(process.env.port, () => {
    console.log("The app is running at the port 8000");
})




