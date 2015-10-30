import React from 'react/addons';

import utils from '../utils/util';
import externalActions from '../actions/externalActions';
import externalStore from '../stores/externalStore';


var About = React.createClass({

    getInitialState: function() {
        return {
            contributors: externalStore.getState().contributors,
            license: externalStore.getState().license,
            version: externalStore.getState().version
        }
    },
    componentDidMount: function() {
        if (!this.state.license || !this.state.contributors || !this.state.version) {
            externalStore.listen(this.update);
            if (!this.state.version)
                externalActions.getVersion();
            if (!this.state.license)
                externalActions.getLicense();
            if (!this.state.contributors)
                externalActions.getContributors();
        }
    },
    componentWillUnmount: function() {
        if (!this.state.license || !this.state.contributors || !this.state.version)
            externalStore.unlisten(this.update);
    },
    update: function() {
        if (this.isMounted()) {
            this.setState({
                contributors: externalStore.getState().contributors,
                license: externalStore.getState().license,
                version: externalStore.getState().version
            });
        }
    },
    openGithub: function(e) {
        var url = e.target.getAttribute('data-github');
        utils.openUrl(url)
    },

    render: function() {
        var contributors = this.state.contributors ? this.state.contributors : [];
        var license = this.state.license ? this.state.license : 'Loading...';
        var version = this.state.version ? this.state.version : 'Loading...';
        return (
            <div className="content-scroller" id="content">
                <section>
                	<h1 className="aboutHeading">Alexandria Librarian, v0.5.2 &alpha;</h1>
                	<p className="aboutSub">This is a prototype developer build, and is not representative of the final product</p>
                	<br/>
                	<p className="about">Copyright &copy;2015, The Decentralized Library of Alexandria</p>
                	<br/>
                </section>
                <section>
                    <h2 className="aboutTitle">Contributors</h2>
                        {
                            contributors.map(function(Contributor, i) {
                                return (
                                        <p className="Contributor">{Contributor.name} {Contributor.email} <i data-github={Contributor.github}  onClick={this.openGithub} className="ion-social-github" /></p>
                                    );
                                }, this)
                        }
                 </section>
                <section>
                    <h2 className="aboutTitle">License</h2>
                    <textarea className="License"  defaultValue={license} readOnly />
                </section>
            </div>
        );
    }
});

module.exports = About;
