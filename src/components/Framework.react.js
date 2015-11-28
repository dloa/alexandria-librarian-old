import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    History, RouteContext
}
from 'react-router';
import Sidebar from './Sidebar.react';

export
default React.createClass({

    mixins: [PureRenderMixin, RouteContext, History],

    getInitialState() {
        return {
            sidebarOffset: 0
        };
    },
    handleScroll(e) {
        if (e.target.scrollTop > 0 && !this.state.sidebarOffset) {
            this.setState({
                sidebarOffset: e.target.scrollTop
            });
        } else if (e.target.scrollTop === 0 && this.state.sidebarOffset) {
            this.setState({
                sidebarOffset: 0
            });
        }
    },
    render() {
        return (
            <div>
                <div id="sidebar">
                    <Sidebar />
                </div>
                <div id="content" className="dashboard">
                    <div className="container-fluid">
                        <div className="row">
                            {React.cloneElement(this.props.children, {query: this.props.query})}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});