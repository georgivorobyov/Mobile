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
                viewModel.set("thoughts", data.result);
            },
            function(error){
                app.application.hideLoading();
                alert(JSON.stringify(error));
            });
        },
    });

    app.thoughts = {
        viewModel: viewModel
    };
})(window);