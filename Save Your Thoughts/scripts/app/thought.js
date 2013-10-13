(function (global) {
    var viewModel, codeBehind,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        title: "",
        imageUrl: "",
        content: "",
        location: "",
        hasMedia: false,
        _mediaContent: null,
        open: function (e) {
            viewModel.set("title", e.view.params.title);
            viewModel.set("content", e.view.params.content);
            viewModel.set("location", e.view.params.location);
            viewModel.set("imageUrl", e.view.params.imageUrl);
            if (e.view.params.captureUrl) {
                viewModel.set("hasMedia", true);
                viewModel._mediaContent = new Media(e.view.params.captureUrl, function () {
                    console.log(arguments);
                }, function () {
                    console.log(arguments);
                })
            }
        },
        clean: function () {
            viewModel.set("title", "");
            viewModel.set("content", "");
            viewModel.set("location", "");
            viewModel.set("imageUrl", "");
            viewModel.set("hasMedia", false);
        },
        play: function () {
            this._mediaContent.play();
        },
        stop: function () {
            this._mediaContent.stop();
        }
    });

    codeBehind = {
        selectButton: function () {
            var index = this.current().index();
            $(".text-panel").hide();
            $(".photo-panel").hide();
            $(".audio-panel").hide();
            switch (index) {
                case 0:
                    $(".text-panel").show();
                    break;
                case 1:
                    $(".photo-panel").show();
                    break;
                case 2:
                    $(".audio-panel").show();
                    break;
            }
        }
    };
    
    app.thought = {
        viewModel: viewModel,
        codeBehind: codeBehind
    };
})(window);