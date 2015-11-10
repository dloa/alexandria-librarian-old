import React from 'react';

export
default React.createClass({

    componentWillMount() {
        console.log('About to mount App');
    },

    render() {
        return (
            <div>
                {React.cloneElement(this.props.children, {query: this.props.query})}
            </div>
        );
    }

});