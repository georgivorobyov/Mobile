(function (global) {
    var app = global.app = global.app || {};
        
    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body);
    }, false);
    
    // The first created Everlive instance can be accessed
    // through the Everlive.$ field so it is not necessary 
    // to hold an explicit reference to it.
    new Everlive('aWVqLsONGkcWQ337');
    
})(window);