window.onload = function() {
	// global data
	var xCoord;
	var yCoord;
	var isOn = false;
	var radius = 20;
	
	// Canvas
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
		
	// Fill Window Width and Height
	myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	
	// Set Background Color
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
	
	// Client
	var socket = io('http://myo.imop.lol:3939/myoconsumer');
	//var socket = io('http://10.19.219.95:3939/myoconsumer');

	socket.on('connect', function (data) 
	{
		console.log(data);
		socket.emit('frame', { my: 'data' });
	});

	socket.on('frame', function (data) 
	{
		for (var key in data) {
		   if (data.hasOwnProperty(key)) {
				console.log(data);
				xCoord = data[key].x;
				yCoord = data[key].y;
				isOn = data[key].on;

				if (isOn)
				{
					ctx.beginPath();
					ctx.fillStyle = "#ff00ff";
					ctx.arc(xCoord, yCoord, radius, 0, 2 * Math.PI);
					console.log(xCoord);
					ctx.fill();
				}
				else if (!isOn)
				{
					ctx.closePath();
				}
		   }
		}

		
	});
};