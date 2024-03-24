const socket = io();
socket.emit('join-room', RoomId, 1);
socket.on('userConnected', userId => {
    console.log(userId + ' connected to room ' + RoomId);
})