var rpio = require('rpio');

var socket = require('socket.io-client')('http://192.168.1.100:7070');

var reportedStatus = false;
var lastMotion = 0;
rpio.open(11, rpio.INPUT);   //GPIO17

socket.on('connect', function(){

	console.log( "Connected" );
	// Report initial status
	socket.emit( "roomUpdate", { _id: "57e2eb7b3ea7a4441099ef11", occupied: false } );

	// Motion Polling
	setInterval( function() {
		var sensor = rpio.read(12);
		var time = new Date().getTime();

		// IF we sense motion and the status was previously false, update status
		if( sensor == true && reportedStatus === false ) {

			socket.emit( "roomUpdate", { _id: "57e2eb7b3ea7a4441099ef11", occupied: true } );
			console.log( "update: occupied" );
			lastMotion = time;
			reportedStatus = true;
		} else if( reportedStatus === true && ( time - lastMotion ) > 60000 ){

			socket.emit( "roomUpdate", { _id: "57e2eb7b3ea7a4441099ef11", occupied: false } );
			console.log( "update: free" );
			reportedStatus = false;
		}

	}, 1000 );
});