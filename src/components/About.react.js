import React from 'react/addons';

import utils from '../utils/util';
import externalActions from '../actions/externalActions';
import externalStore from '../stores/externalStore';


var About = React.createClass({

    getInitialState: function() {
        return {
            loaded: externalStore.getState().loaded,
            contributors: externalStore.getState().contributors,
            lisence: externalStore.getState().lisence,
            version: externalStore.getState().version
        }
    },
    componentDidMount: function() {
        if (!this.state.loaded) {
            externalStore.listen(this.update);
            externalActions.loadAll();
        }
    },
    componentWillUnmount: function() {
        if (!this.state.loaded)
            externalStore.unlisten(this.update);
    },
    update: function() {
        if (this.isMounted()) {
            this.setState({
                contributors: externalStore.getState().contributors,
                lisence: externalStore.getState().lisence,
                version: externalStore.getState().version
            });
        }
    },
    openGithub: function(e) {
        var url = e.target.getAttribute('data-github');
        utils.openUrl(url)
    },

    render: function() {
        return (
            <div className="content-scroller" id="content">
                <section>
                    <h1 className="title">About</h1>
                    <p className="about" >This is a prototype developer build, and is not representative of the final product.</p>
                    <br/>
                <p className="about" >ΛLΞXΛNDRIΛ Librarian, {this.state.version} </p>
                </section>
                <section>
                    <h1 className="title">Contributors</h1>
                        {
                            this.state.contributors.map(function(Contributor, i) {
                                return (
                                        <p className="Contributor">{Contributor.name} {Contributor.email} <i data-github={Contributor.github}  onClick={this.openGithub} className="ion-social-github" /></p>
                                    );
                                }, this)
                        }             
                 </section>
                <section>
                    <h1 className="title">License</h1>
                    <textarea className="License"  value={this.state.lisence} readOnly />
                </section>
            </div>
        );
    }
});

module.exports = About;