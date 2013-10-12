var app = app || {};

(function(a) {
    var globalizationApi = kendo.observable({
        language: "",
        visible: false,
        load: function() {
            var that = this;
            navigator.globalization.getPreferredLanguage(
              function (language) {
                  that.language = language.value;
                  that.visible = true;
              },
              function () {
                  navigator.notification.alert(JSON.stringify(arguments));
              }
            );
        },
    });
    
    a.globalizationApi = globalizationApi;
}(app));