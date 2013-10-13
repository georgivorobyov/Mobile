(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        thoughts: [],
        currentThought: {},
        show: function () {
            var that = this.model;
            var interval = setInterval(function () {
                // wait until application is loaded...
                if (app.application) {
                    that._show();
                    clearInterval(interval);
                }
            }, 100);
        },
        _show: function () {
            app.application.showLoading();
            Everlive.$.data('Thoughts')
            .get()
            .then(function(data){
                app.application.hideLoading();
                //viewModel.set("thoughts", []);
                var i = 0;
                
                function loadNext () {
                    var thought = data.result[i];
                    var coordinations = thought.Coordinations;
                    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='
                        + coordinations.latitude 
                        + ','
                        + coordinations.longitude + '&sensor=false';
                    httpRequest.getJSON(url)
                        .then(function (locationInformation) {
                             var thought = data.result[i];
                             viewModel.thoughts.push({
                                 imageUrl: thought.ImageUrl,
                                 title: thought.Title,
                                 content: thought.Content,
                                 location: locationInformation.results[0].formatted_address,
                                 captureUrl: thought.CaptureUrl
                             });
                            i++;
                            loadNext();
                        });
                }
                loadNext();
            },
            function(error){
                app.application.hideLoading();
                navigator.notification.alert("Our servers are very busy right now, please try again later.", null, "Connection error");
            });
        },
    });

    app.thoughts = {
        viewModel: viewModel
    };
})(window);