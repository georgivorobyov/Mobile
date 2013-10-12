var app = app || {};

document.addEventListener("deviceready", ready, false);

function ready() {
    var mediaContent = new Media("http://audio.ibeat.org/content/p1rj1s/p1rj1s_-_rockGuitar.mp3", null,null,null);
    
    var mediaApi = {    
        start: function() {
            mediaContent.play();
        },
        stop: function () {
            mediaContent.stop();
        }
    };
    
    app.mediaApi = mediaApi;
}