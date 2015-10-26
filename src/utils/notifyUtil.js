import notifier from 'node-notifier';
import ipc from 'ipc';
import path from 'path';


module.exports = {
    notify: function(params) {
        console.log('notify!')

        notifier.notify({
            title: 'My awesome title',
            message: 'Hello from node, Mr. User!',
            icon: path.normalize(path.join('../images', 'logo.png')), // absolute path (not balloons)
            sound: true, // Only Notification Center or Windows Toasters
            wait: true // wait with callback until user action is taken on notification
        }, function(err, response) {
            // response is response from notification
        });

        notifier.on('click', function(notifierObject, options) {
            // Happens if `wait: true` and user clicks notification
        });

        notifier.on('timeout', function(notifierObject, options) {
            // Happens if `wait: true` and notification closes
        });

    }

};