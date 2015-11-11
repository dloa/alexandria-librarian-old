import React from 'react';
import DataGrid from 'react-datagrid';

import Settings from '../utils/settingsUtil';
import PublishActions from '../actions/publishActions';
import utils from '../utils/util';
import publishStore from '../stores/publishStore';






var If = React.createClass({
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
            youtubeAuthorization: publishStore.getState().youtubeAuthorization,
            youtubeContent: publishStore.getState().youtubeContent
        };
    },

    componentDidMount: function() {
        publishStore.listen(this.update);
    },

    componentWillUnmount: function() {
        publishStore.unlisten(this.update);
    },

    update: function() {
        if (this.isMounted()) {
            this.setState({
                youtubeAuthorization: publishStore.getState().youtubeAuthorization,
                youtubeContent: publishStore.getState().youtubeContent
            });
        }
    },
    handleAuthYoutube: function() {
        PublishActions.authorize('youtube');
    },
    render: function() {
        var youtubeAuthorized = this.state.youtubeAuthorization ? true : false;
        var youtubeContent = this.state.youtubeContent ? true : false;
        var youtubeContentDataTabe = this.state.youtubeContent ? this.state.youtubeContent : [];

        var columns = [{
            name: 'position'
        }, {
            name: 'title'
        }, {
            name: 'description'
        }, {
            name: 'publishedAt'
        }, {
            name: 'channelTitle'
        }];

        return (
            <div className='content-scroller' id='content'>
                <section>
                    <h1 className='title'>Youtube</h1>
                    <If test={!youtubeAuthorized}>
                    	<button className="left" onClick={this.handleAuthYoutube} ><p>Authorize youtube account</p></button> 
                    </If>
                    <If test={youtubeContent}>
                    	<DataGrid
                    		idProperty='id'
                    		dataSource={youtubeContentDataTabe}
                    		columns={columns}
                		/>
                	</If>
                </section>
    
            </div>
        );

    }

});


module.exports = Publish;