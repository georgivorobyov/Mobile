(function (global) {
    var app = global.app = global.app || {};
    
    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body);
    }, false);
})(window);