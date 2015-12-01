import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ProgressComponent from './progress';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            stats: {},
            enabled: false
        };
    },

    componentDidMount() {
        //daemonStore.listen(this.update);
    },

    componentWillUnmount() {
        //daemonStore.unlisten(this.update);
    },

    update() {
        if (this.isMounted()) {
            this.setState({

            });
        }
    },
    render() {
        return (
            <div className="section ipfs">
                <h4>Florincoin</h4>
                <div className="detail">
                    <p>Florincoin is free software with an open ledger of transaction history known as the block chain. Florincoin extends the Bitcoin codebase and stores additional information on the network.</p>
                </div>
            </div>
        );
    }
});