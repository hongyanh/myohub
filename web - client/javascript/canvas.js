window.onload = function() {
	// global data
	var xCoord;
	var yCoord;
	var isOn = false;
	var option = {
		transports: ['websocket'],
		'force new connection': true
	};

	// Client
	//var socket = io('http://10.19.223.74:8080');
	var socket = io('http://myo.imop.lol:3939/myoconsumer');
	//var socket = io('http://10.19.219.95:3939/myoconsumer', option);


	socket.on('connect', function (data) 
	{
		console.log(data);
		socket.emit('frame', { my: 'data' });
	});

	socket.on('frame', function (data) 
	{
		console.log(data);
		xCoord = data.x * 100;
		yCoord = data.y * 100;
		isOn = data.on;
	});
	



	// Canvas javascript from http://codepen.io/mikethedj4/pen/cnCAL
	// - and modified
	var myCanvas = document.getElementById("myCanvas");
	var ctx = myCanvas.getContext("2d");
    
    // Fill Window Width and Height
    myCanvas.width = window.innerWidth;
	myCanvas.height = window.innerHeight;
	
	// Set Background Color
    ctx.fillStyle="#000";
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
	
    // Mouse Event Handlers
	if(myCanvas){

	
		var isDown = false;
		var canvasX, canvasY;
		ctx.lineWidth = 5;
		
	
		$(myCanvas)
		.mousedown(function(e){
			isDown = true;
			ctx.beginPath();
			canvasX = e.pageX - myCanvas.offsetLeft;
			canvasY = e.pageY - myCanvas.offsetTop;
			ctx.moveTo(canvasX, canvasY);
		})
		.mousemove(function(e){
			if(isDown !== false) {
				canvasX = e.pageX - myCanvas.offsetLeft;
				canvasY = e.pageY - myCanvas.offsetTop;
				ctx.lineTo(canvasX, canvasY);
				ctx.strokeStyle = "#fff";
				ctx.stroke();
			}
		})
		.mouseup(function(e){
			isDown = false;
			ctx.closePath();
		});
	}
	
	// Touch Events Handlers
	draw = {
		started: false,
		start: function(evt) {

			ctx.beginPath();
			ctx.moveTo(
				evt.touches[0].pageX,
				evt.touches[0].pageY
			);

			this.started = true;

		},
		move: function(evt) {

			if (this.started) {
				ctx.lineTo(
					evt.touches[0].pageX,
					evt.touches[0].pageY
				);

				ctx.strokeStyle = "#fff";
				ctx.lineWidth = 5;
				ctx.stroke();
			}

		},
		end: function(evt) {
			this.started = false;
		}
	};
	
	// Touch Events
	myCanvas.addEventListener('touchstart', draw.start, false);
	myCanvas.addEventListener('touchend', draw.end, false);
	myCanvas.addEventListener('touchmove', draw.move, false);
	
	// Disable Page Move
	document.body.addEventListener('touchmove',function(evt){
		evt.preventDefault();
	},false);
};