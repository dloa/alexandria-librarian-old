import Promise from 'bluebird';
import remote from 'remote';
import path from 'path';
import electronGoogleOauth from 'electron-google-oauth';



module.exports = {
    getAuthorization: function(creds) {
        const googleOauth = electronGoogleOauth(remote.require('browser-window'));
        var AuthPath = path.normalize(path.join(__dirname, '../../../', 'OAuth.json'))
        console.log(AuthPath)
        var OAuthCreds = require(AuthPath);

        return new Promise((resolve, reject) => {


            // retrieve access token and refresh token 
            const result = googleOauth.getAccessToken(
                ['https://www.googleapis.com/auth/youtube.force-ssl'],
                OAuthCreds.googleClientID,
                OAuthCreds.googleClientSecret
            );
            console.dir(result);

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