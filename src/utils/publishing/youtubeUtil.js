import Promise from 'bluebird';
import remote from 'remote';
import path from 'path';
import google from 'googleapis';

var browserWindow = remote.require('browser-window');
var OAuth2 = google.auth.OAuth2;
var OAuthCreds = require(path.join(__dirname, '../../../', 'OAuth.json'));

module.exports = {
    getAuthorization: function() {
        var authWindow = new browserWindow({
            width: 800,
            height: 600,
            center: true,
            show: false,
            resizable: false,
            'always-on-top': true,
            'standard-window': true,
            'auto-hide-menu-bar': true,
            'node-integration': false
        });
        var authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/youtube.force-ssl']
        });

        authWindow.loadUrl(authUrl);
        authWindow.show();

        authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {

            var raw_code = /code=([^&]*)/.exec(newUrl) || null,
                code = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
                error = /\?error=(.+)$/.exec(newUrl);
            if (code || error) {
                authWindow.close();
            }
            if (code) {
                oauth2Client.getToken(code, function(err, tokens) {
                    if (!err) {
                        console.log(tokens)
                        oauth2Client.setCredentials(tokens);
                    } else {
                        alert('Oops! Something went wrong: ' + err);
                    }
                });
            } else if (error) {
                alert("Oops! Something went wrong and we couldn't log you in using Youtube. Please try again.");
            }
        });
    },
    download: function() {
        return new Promise((resolve, reject) => {

        });
    },
    getAll: function() {

    },
    info: function(url, creds) {
        return new Promise((resolve, reject) => {

        });
    }
}