var app = app || {};

(function(a) {
    var storageApi = {    
        open: function() {
            var carsFromDb = [];
            app.carRepository.get(function (tx, rows) {
                for (var i = 0; i < rows.rows.length; i++) {
                    carsFromDb.push(rows.rows.item(i));
                }
            
                navigator.notification.alert(JSON.stringify(carsFromDb));
            });
        },
    };
    
    a.storageApi = storageApi;
}(app));