   // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var server = require("http").Server(app);
    var io = require("socket.io")(server);

    io.on("connection", function (socket) {

        socket.on('motionOccur', function(data) {            
            io.emit('captureAndSend', {"lastMotion": data.lastMotion, "motion" : data.motion});
        });

        socket.on('motionStop', function() {
            
        });

    });

    // configuration =================
    app.use( "/static", express.static( "public" ) );

    app.get('/', function(req, res) {
        res.sendfile('./public/templates/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    // listen (start app with node app.js) ======================================
    server.listen(7000, function () {
        console.log('Example app listening on port 7000!')
    });


    
