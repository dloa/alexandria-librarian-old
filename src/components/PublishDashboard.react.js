import React from 'react';
import DataGrid from 'react-datagrid';

import Settings from '../utils/settingsUtil';
import PublishActions from '../actions/publishActions';
import utils from '../utils/util';
import publishStore from '../stores/publishStore';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({
    getInitialState() {
        return {
            youtubeAuthorization: publishStore.getState().youtubeAuthorization,
            youtubeContent: publishStore.getState().youtubeContent
        };
    },

    componentDidMount() {
        publishStore.listen(this.update);
    },

    componentWillUnmount() {
        publishStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                youtubeAuthorization: publishStore.getState().youtubeAuthorization,
                youtubeContent: publishStore.getState().youtubeContent
            });
        }
    },
    handleAuthYoutube() {
        PublishActions.authorize('youtube');
    },
    render() {
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