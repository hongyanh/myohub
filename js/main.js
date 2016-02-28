var hub = new Myo.Hub();
// var socket = io('http://10.19.219.95:3939/myoclient');
var socket = io('http://10.19.219.95:3939/myoclient');

var draw = false;
var x = 0.5, y = 0.5;
var xSpeed = 0.05;

function map(value, in_min, in_max, out_min, out_max) {
  return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

hub.on('ready', () => {
    // console.log('ready');
});
hub.on('connect', () => {
    // console.log('connected');
    $('#myo-connect').text('On');
});
hub.on('frame', (frame) => {

  if (frame.pose.type === 0) {
    draw = !draw;
  }
    //   console.log('x: ' + frame.accel.x + '; y: '+ frame.accel.y + '; z: ' + frame.accel.z);
    // }

    // console.log(frame);

    // if (frame.gyro.y >= 0 && frame.gyro.z <= 0) {
    //   //moving to the right
    //   // if (x < 1) {
    //   //   x += xSpeed;
    //   // }
    //   x = 1 - map(frame.accel.z,-1, 0, 0, 1).toFixed(2);
      
    // }

    // if (frame.gyro.y < 0 && frame.gyro.z > 0) {
    //   // moving to the left
    //   x = map(frame.accel.z,-1, 0, 0, 1).toFixed(2);
    // }

    // console.log('x: ' + frame.gyro.x+ '; y: ' + frame.gyro.y + '; z: ' + frame.gyro.z);



    y = map(frame.accel.x,-1, 1, 0, 1).toFixed(2);

    x = map(frame.accel.y,-1, 1, 0, 1).toFixed(2);

    z = map(frame.accel.z,-1, 1, 0, 1).toFixed(2);
    
    // var z = map(frame.accel.z, 0, 1, 0, 1).toFixed(2);
    // console.log('x: ' + x + '; y: '+ y);

    // Get the most recent frame and report some basic information
    // console.log('Frame id: ' + frame.id + ', timestamp: ' + frame.timestamp);
    // console.log('x: ' + frame.accel.x);
    // raise your arm is -1 and put down your arm is 1
    // console.log('y: ' + frame.accel.y);
    // circular motion right 0.5, and left -0.3
    // console.log('z: ' + frame.accel.z);
    // bend your arm is -0.3 and straght is 1.0

    socket.emit('frame', {id: 0, x: x, y: y, z: z, on: draw});
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

socket.on('frame', (data) => {
  console.log(data);
});
