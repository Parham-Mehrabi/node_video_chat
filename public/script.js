const socket = io();
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});
const video_box = document.getElementById('video-box');
const video = document.createElement('video');
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    video.srcObject = stream,
    video.play();
    video_box.append(video)
})
myPeer.on('open', id => {
    socket.emit('join-room', RoomId, id);

})
socket.on('userConnected', userId => {
    console.log(userId + ' connected to room ' + RoomId);
})