onDeviceReady: function() {
        app.receivedEvent('deviceready');
          window.open = cordova.InAppBrowser.open;
            cordova.InAppBrowser.open('http://apache.org', '_self', 'location=yes');
    },
