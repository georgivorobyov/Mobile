(function (global) {
    var db = global.sqlLiteDatabase.openDatabase("CarRental");
    
    function add(model, vendor, available, returnDate) {
        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO Cars(model, vendor, available, returnDate) VALUES (?,?,?,?);",
                          [model, vendor, available, returnDate],
                          onSuccess,
                          onError);
        });
    }
    
    function update(id, available, returnDate) {
        db.transaction(function(tx) {
            tx.executeSql("UPDATE Cars SET available = ?, returnDate = ? WHERE id = ?;",
                          [available, returnDate, id],
                          onSuccess,
                          onError);
        });
    }
    
    function get(fn) {
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM Cars;", [],
                          fn,
                          onError);
        });
    }
    
    function onSuccess() {
        console.log("Your SQLite query was successful!");
    }

    function onError(tx, e) {
        console.log("SQLite Error: " + e.message);
    }
    
    function init(){
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Cars(" +
                      "model TEXT, " +
                      "vendor TEXT, " +
                      "available BOOLEAN, " +
                      "returnDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP);", [],
                          onSuccess,
                          onError);
            
            add("Model 1", "Vendor 1", true, new Date());
            add("Model 2", "Vendor 2", false, new Date());
            add("Model 3", "Vendor 3", false, new Date());
            add("Model 4", "Vendor 4", true, new Date());
        });
    }
    init();
    
    global.app = global.app || {};
    global.app.carRepository = {
        get: get,
        add: add,
        update: update
    };
}(window));