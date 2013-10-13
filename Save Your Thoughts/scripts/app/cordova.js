(function (global) {
    var cordova,
    app = global.app = global.app || {};

    cordova = {
        getGeolocationPosition: function () {
            var promise = new RSVP.Promise(function(resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            return promise;
        },
        
        capturePicure: function (options) {
            var promise = new RSVP.Promise(function(resolve, reject) {
                navigator.camera.getPicture(resolve, reject, options);
            });

            return promise;
        },
        
        captureAudio: function () {
            var promise = new RSVP.Promise(function(resolve, reject) {
                navigator.device.capture.captureAudio(resolve, reject);
            });

            return promise;
        }
    };

    app.cordova = cordova;
})(window);