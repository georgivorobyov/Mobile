(function (global) {
    var lastState, states = {};
    
    function initStates() {
        states[Connection.UNKNOWN] = 'Unknown';
        states[Connection.ETHERNET] = 'Ethernet';
        states[Connection.WIFI] = 'WiFi';
        states[Connection.CELL_2G] = 'Cell 2G';
        states[Connection.CELL_3G] = 'Cell 3G';
        states[Connection.CELL_4G] = 'Cell 4G';
        states[Connection.CELL] = 'Cell generic';
        states[Connection.NONE] = 'No network';
    }
    
    function checkConnection () {
        var networkState = navigator.connection.type;
        if (networkState != Connection.ETHERNET &&
            networkState != Connection.WIFI &&
            networkState != Connection.UNKNOWN &&
            networkState != Connection.NONE) {
            if (lastState != networkState) {
                navigator.notification.alert("You are on a " +
                    states[networkState] +
                    " connection. This application relies entirely on internet.",
                    null, "Warning");
                lastState = networkState;
            }
        }
    }
    
    document.addEventListener("deviceready", function () {
        initStates();
        setInterval(checkConnection, 2000);
    }, false);
})(window);