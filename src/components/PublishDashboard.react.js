import React from 'react/addons';

import Settings from '../utils/settingsUtil';
import IPFS from '../actions/ipfsActions';
import Libraryd from '../actions/librarydActions';

import utils from '../utils/util';
import daemonStore from '../stores/daemonStore';




let If = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        } else {
            return false;
        }
    }
});


var Publish = React.createClass({

    getInitialState: function() {
        return {
            //checkedRunning: daemonStore.getState().checkedRunning,

        };
    },

    componentDidMount: function() {
        //daemonStore.listen(this.update);
    },

    componentWillUnmount: function() {
       // daemonStore.unlisten(this.update);
    },

    update: function() {
        if (this.isMounted()) {
            this.setState({
               // LibrarydEnabled: daemonStore.getState().librarydEnabled,
            });
        }
    },

    handleChangeIPFSEnabled: function(e) {
        var checked = e.target.checked;
        IPFS.toggle(checked);
    },
    render: function() {
        return (
            <div className='content-scroller' id='content'>
                <section>
                    <h1 className='title'>Youtube</h1>
                    
                </section>
    
            </div>
        );

    }

});


module.exports = Publish;