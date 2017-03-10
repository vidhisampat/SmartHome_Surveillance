angular.module('piEye', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']).controller('baseController',function($scope,Socketio){
    
    var vm = this;

    //Select default 
    vm.selShootMode = 'image';
    vm.started = false;

    vm.clickButton = function(){
        if(vm.selShootMode == 'image'){
            vm.started = false;
            //Take a pic

            //Send it to screen, google photos
        } else {
            if(vm.started == true)
                vm.started = false;
            else {
                vm.started = true;
                //Switch case: video, liveStream, timelapse
            }
        }
    };

    //On motion, take a pic, send an email
    Socketio.on( "captureAndSend", function( data ) {
        console.log(data);
    });


});
