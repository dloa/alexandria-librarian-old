import React from 'react/addons';
import Router from 'react-router';
import utils from '../utils/util';
import fs from 'fs';
import path from 'path';
import request from 'request';

var About = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
            contributors: [],
            lisence: '',
            version: ''
        }
    },
    componentDidMount: function() {
        this.getContributors();
        this.getLisence();
    },
    getLisence: function() {
        var self = this;

        request('https://raw.githubusercontent.com/dloa/alexandria-librarian/master/LICENSE.md', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                self.setState({
                    lisence: body
                });
            } else {
                fs.readFile(path.normalize(path.join(__dirname, '../../', 'LICENSE.md')), function(err, data) {
                    if (err) return console.log(err);
                    self.setState({
                        lisence: data
                    });
                })
            }
        });
    },
    getContributors: function() {

        fs.readFile(path.normalize(path.join(__dirname, '../../', 'CONTRIBUTORS.md')), function(err, data) {
            if (err) return console.log(err);



            /*
            self.setState({
                lisence: data
            });
*/
        })


    },

    openGithub: function(e) {
        var username = e.target.getAttribute('data-github');
        utils.openUrl('https://github.com/' + username)
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
                        {this.state.contributors.map(function(Contributor, i) {
                            return (
                                        <p className="Contributor">{Contributor.name} {'<' + Contributor.email + '>'} <i data-github={Contributor.github}  onClick={this.openGithub} className="ion-social-github" /></p>
                                    );
                            }, this)}             
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