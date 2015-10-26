import notifier from 'node-notifier';


module.exports = {

    notify: function(params) {

        notifier.notify({
            title: 'My awesome title',
            message: 'Hello from node, Mr. User!',
            icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
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