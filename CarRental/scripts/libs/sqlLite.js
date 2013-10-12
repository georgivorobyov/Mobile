(function (global) {    
    function openDatabase (name) {
        return window.sqlitePlugin !== undefined ?
               window.sqlitePlugin.openDatabase(name) :
               window.openDatabase(name, "1.0", name, 300000);
    }
    
    global.sqlLiteDatabase = global.sqlLiteDatabase || {};
    global.sqlLiteDatabase.openDatabase = openDatabase;
}(window));