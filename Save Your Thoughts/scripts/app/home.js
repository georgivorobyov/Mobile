(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        cars: [],
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
            var carsFromDb = [];
            app.carRepository.get(function (tx, rows) {
                for (var i = 0; i < rows.rows.length; i++) {
                    carsFromDb.push(rows.rows.item(i));
                }
               
                app.application.hideLoading();
                viewModel.set("cars", carsFromDb);
            });
        },
        hide: function () {
            console.log("h");
        },
        clickedItem: function (e) {
            console.log(e);
        }
    });

    app.home = {
        viewModel: viewModel
    };
})(window);