import Promise from 'bluebird';
import electronGoogleOauth from 'electron-google-oauth';
import BrowserWindow from 'browser-window';


module.exports = {
    getAuthorization: function(creds) {
        const googleOauth = electronGoogleOauth(BrowserWindow);
        var OAuthCreds = require('../../OAuth.json');

        return new Promise((resolve, reject) => {
            // retrieve  authorization code only 
            (async() => {
                const authCode = await googleOauth.getAuthorizationCode(
                    ['https://www.googleapis.com/auth/youtube.force-ssl'],
                    OAuthCreds.googleClientID,
                    OAuthCreds.googleClientSecret
                );
                console.dir(authCode);

                // retrieve access token and refresh token 
                const result = await googleOauth.getAccessToken(
                    ['https://www.googleapis.com/auth/youtube.force-ssl'],
                    OAuthCreds.googleClientID,
                    OAuthCreds.googleClientSecret
                );
                console.dir(result);
            })();
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