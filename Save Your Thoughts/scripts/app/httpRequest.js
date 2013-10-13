(function (global) {
    var getJSON = function(url) {
        var promise = new RSVP.Promise(function(resolve, reject) {
            jQuery.getJSON(url, resolve);
        });

        return promise;
    };
    
    global.httpRequest = {
        getJSON: getJSON
    };
})(window);