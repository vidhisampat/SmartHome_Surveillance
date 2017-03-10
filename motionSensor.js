var rpio = require('rpio');

var socket = require('socket.io-client')('http://192.168.0.12:7000');

var reportedStatus = false;
var lastMotion = 0;
rpio.open(11, rpio.INPUT);   //GPIO17

socket.on('connect', function(){

	console.log( "Connected" );
	var sensor = rpio.read(11);

	// Report initial status
	socket.emit( "motionOccur", { "lasttMotion": new Date().getTime()  , "motion": sensor } );

	// Motion Polling
	setInterval( function() {
		var sensor = rpio.read(11);
		var time = new Date().getTime();

		// IF we sense motion and the status was previously false, update status
		if( sensor == true && reportedStatus === false ) {

			socket.emit( "motionOccur", { "lasttMotion": time  , "motion": true } );
			console.log( "motion: occur" );
			lastMotion = time;
			reportedStatus = true;
		} else if( reportedStatus === true && ( time - lastMotion ) > 60000 ){

			socket.emit( "motionStop", { "lasttMotion": time  , "motion": false } );
			console.log( "motion: stop" );
			reportedStatus = false;
		}

	}, 1000 );
});