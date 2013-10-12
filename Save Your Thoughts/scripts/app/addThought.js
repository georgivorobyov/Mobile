(function (global) {
    var viewModel,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        isAdded: false,
        title: "",
        imageUrl: "",
        _imageBase64: "",
        capture: function () {
            var that = this;
            
            navigator.camera.getPicture(function(url) {
                that.set("imageUrl", "data:image/png;base64," + url);
                that._imageBase64 = url;
            }, function() {
                navigator.notification.alert(JSON.stringify(arguments));
            }, {
                quality: 80,
                destinationType: navigator.camera.DestinationType.DATA_URL
            });
        },
        save: function () {
            var that = this;
            
            if (this.title.length < 5 || this.title.length > 60) {
                navigator.notification.alert("Title should be in range between 5 to 60 letters.");
                return;
            }

            app.application.showLoading();
            Everlive.$.Files.create({
                "Filename": this.title,
                "ContentType": "image/png",             
                "base64": this._imageBase64
            }).then(function (data) {
                console.log(data);
                return data.result.Uri;
            }, function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }).then(function (imgUrl) {
                Everlive.$.data("Thoughts")
                .create({
                    ImageUrl: imgUrl,
                    Title: that.title,
                }).then(function () {
                    app.application.hideLoading();
                }, function (error) {
                    navigator.notification.alert(JSON.stringify(error));
                });
            });
        }
    });

    app.addThought = {
        viewModel: viewModel
    };
})(window);