(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        title: "",
        imageUrl: "",
        open: function (e) {
            viewModel.set("title", e.view.params.title);
            viewModel.set("imageUrl", e.view.params.imageUrl);
        }
    });

    app.thought = {
        viewModel: viewModel
    };
})(window);