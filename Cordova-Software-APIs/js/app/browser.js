var app = app || {};

(function(a) {
    var browserApi = {    
        openIcenium: function() {
            window.open("http://icenium.com", "_blank");
        },
    };
    
    a.browserApi = browserApi;
}(app));