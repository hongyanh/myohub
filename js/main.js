var hub = new Myo.Hub();
var socket = io('http://10.19.219.95:3939/myoclient');

hub.on('ready', () => {
    console.log('ready');
});
hub.on('connect', () => {
    console.log('connected');
    $('#myo-connect').text('On');
});
hub.on('frame', (frame) => {
    // Get the most recent frame and report some basic information
    // console.log('Frame id: ' + frame.id + ', timestamp: ' + frame.timestamp);
    // console.log(frame);
    // frameObj = frame;

    socket.emit('frame', frame);

});
hub.on('disconnect', () => {
    console.log('disconnect');
    $('#myo-connect').text('Off');
});


socket.on('connect', (data) => {
  $('#socket-connect').text('On');
});

socket.on('disconnect', (data) => {
  $('#socket-connect').text('Off');
});
