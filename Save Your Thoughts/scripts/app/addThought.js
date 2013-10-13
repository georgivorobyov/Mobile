(function (global) {
    var viewModel, codeBehind,
    app = global.app = global.app || {};

    viewModel = kendo.observable({
        isAdded: false,
        title: "",
        imageSource: "",
        content: "",
        _imageBase64: "",
        _imageUrl: "",
        _position: {},
        _savedSteps: 0,
        _stepsForSave: 0,
        _mediaFile: null,
        
        show: function () {
            viewModel._clear();
        },
        
        capture: function () {
            var that = this;
            
            app.cordova.capturePicure({
                quality: 40,
                destinationType: navigator.camera.DestinationType.DATA_URL
            })
            .then(function(url) {
                that.set("imageSource", "data:image/png;base64," + url);
                that._imageBase64 = url;
                that.set("isAdded", true);
            }, function () {
                navigator.notification.alert("An error occurred while making the picture.", null, "Camera error");
            });
        },
        
        captureAudio: function () {
            app.cordova.captureAudio().then(function (mediaFiles) {
                viewModel._mediaFile = mediaFiles[0];
            }, function () {
                navigator.notification.alert("An error occurred while making the record.", null, "Media error");
            });
        },
        
        save: function () {
            var that = this;
            
            if (this.title.length < 5 || this.title.length > 60) {
                navigator.notification.alert("Title should be in range between 5 to 60 letters.", null, "Validation error");
            }
            else {
                app.application.showLoading();
                app.application.showLoading();
                app.application.showLoading();
                app.application.showLoading();
                that.getLocation();
                that._savePicture();
                that._saveMedia();
            }
        },
        
        _saveMedia: function () {
            if (this._mediaFile != null) {
                var mediaFile = this._mediaFile;
                var ft = new FileTransfer(),
                name = mediaFile.name;

                viewModel._stepsForSave += 1;
                ft.upload(mediaFile.fullPath, Everlive.$.Files.getUploadUrl(),
                function(result) {
                    viewModel._isSaved();
                }, this._onError,
                { fileName: name });
            }
        },
        
        _savePicture: function () {
            if (this._imageBase64.length > 0) {
                var file = {
                    "Filename": this.title,
                    "ContentType": "image/png",             
                    "base64": this._imageBase64
                };
                
                this._stepsForSave += 1;
                Everlive.$.Files.create(file)
                .then(this._onPhotoUploadSuccess, this._onError);
            }
        },
        
        _onPhotoUploadSuccess: function (data) {
            viewModel._imageUrl = data.result.Uri;
            viewModel._isSaved();
        },
        
        getLocation: function () {
            viewModel._stepsForSave += 1;
            app.cordova.getGeolocationPosition()
            .then(this._onGeolocationSuccess, this._onError);
        },
        
        _onGeolocationSuccess: function (position) {
            viewModel._position = position;
            viewModel._isSaved();
        },
        
        _saveThougth: function () {
            var that = this;
            
            Everlive.$.data("Thoughts")
            .create({
                ImageUrl: that._imageUrl,
                Title: that.title,
                Content: that.content,
                Coordinations: that._position.coords
            }).then(function () {
                that._clear();
                app.application.hideLoading();
                navigator.notification.vibrate(1000);
                navigator.notification.alert("Your thought was successfully added.", null, "Success");
            }, that._onError);
        },
        
        _isSaved: function () {
            viewModel._savedSteps += 1;
            if (viewModel._savedSteps == viewModel._stepsForSave) {
                // All async procress are finished
                viewModel._saveThougth();
            }
        },
        
        _clear: function () {
            viewModel.set("title", "");
            viewModel.set("imageSource", "");
            viewModel.set("content", "");
            viewModel.set("_imageBase64", "");
            viewModel.set("_imageUrl", "");
            viewModel.set("_position", {});
            viewModel.set("_savedSteps", 0);
            viewModel.set("_stepsForSave", 0);
            viewModel.set("_mediaFile", null);
            viewModel.set("isAdded", false);
        },
        
        _onError: function (error) {
            app.application.hideLoading();
            viewModel._savedSteps = 0;
            viewModel._stepsForSave = 0;
            navigator.notification.alert("An error occured while creating the thought.", null, "Connection error");
        },
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
    
    app.addThought = {
        viewModel: viewModel,
        codeBehind: codeBehind
    };
})(window);