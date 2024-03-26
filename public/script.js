const socket = io();
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
});
const video_box = document.getElementById('video-box');
const video = document.createElement('video');
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    const otherPeer = new Peer(undefined, {
        host: '/',
        port: '3001'
    });
    otherPeer.on('open', id => {
        socket.emit('join-room', RoomId, id);
        
    })
    addVideoStream(video, stream);
    socket.on('userConnected', userId => {
        connectToNewUser(userId, stream);
    })
    otherPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video')
        call.on('stream', userVideoStream =>{
            addVideoStream(video, userVideoStream);
        })
    })
})

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.play();
    video_box.append(video);
};

function connectToNewUser(newUserId, stream){
    const call = myPeer.call(newUserId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
}
