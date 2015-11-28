import React from 'react';
import Router from 'react-router';
import Sidebar from './Sidebar.react';

export
default React.createClass({
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
                <Sidebar />
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
