var app = app || {};

(function(a) {
    var fileApi = kendo.observable({
        fileName: "",
        text: "",
        file: new FileSystemHelper(),
        readText: function () {
            this.file.readTextFromFile(this.fileName, this._onSuccess, this._onError);
        },
        writeText: function () {
            this.file.writeLine(this.fileName, this.text, this._onSuccess, this._onError);
        },
        deleteFile: function () {
            this.file.deleteFile(this.fileName, this._onSuccess, this._onError);
        },
        _onSuccess: function () {
            navigator.notification.alert(JSON.stringify(arguments));
        },
        _onError: function () {
            navigator.notification.alert(JSON.stringify(arguments));
        }
    });
    
    a.fileApi = fileApi;
}(app));