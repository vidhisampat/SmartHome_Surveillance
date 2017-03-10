angular.module( "piEye" ).service( "Socketio", function(){
    return io.connect('http://localhost:7000');

});