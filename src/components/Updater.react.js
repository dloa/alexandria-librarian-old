import React from 'react/addons';
import UpdaterActions from '../utils/updateActions';


var Updater = React.createClass({

    getInitialState: function() {
        return {

        };
    },
    handleCheckUpdates: function() {
        Updater.checkForUpdates();
    },
    render: function() {
        return (
            <section>
                <h1 className='title'>Updates</h1>
                <button className="left" type="submit" onClick={this.handleCheckUpdates}><p>Check for updates</p></button>
            </section>

        );
    }
});

module.exports = Updater;