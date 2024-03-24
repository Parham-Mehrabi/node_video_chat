const socket = io();
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});
myPeer.on('open', id => {
    socket.emit('join-room', RoomId, id);

})
socket.on('userConnected', userId => {
    console.log(userId + ' connected to room ' + RoomId);
})