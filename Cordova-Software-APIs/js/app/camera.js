var app = app || {};

(function(a) {
    var cameraApi = {    
        capturePhoto: function() {
            navigator.camera.getPicture(function() {
                navigator.notification.alert(JSON.stringify(arguments));
            }, function() {
                navigator.notification.alert(JSON.stringify(arguments));
            }, {
                quality: 80,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });
        },
    };
    
    a.cameraApi = cameraApi;
}(app));