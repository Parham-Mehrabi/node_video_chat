const express = require('express');
const http = require('http');
const {v4:uuid_v4} = require('uuid');
const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);
const port = process.env.NODE_PORT || 3000;
const io = socketIo(server);
 


app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.redirect(`/${uuid_v4()}`)
})
app.get('/:id', (req, res) => {
    const id = req.params.id
    const data = {
        roomId: id
    }
    res.render('room', data)
})

io.on("connection", socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('userConnected', userId)
    })
})




server.listen(port, () => console.log('Listening to port ' + port));

