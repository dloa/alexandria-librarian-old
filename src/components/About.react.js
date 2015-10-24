import React from 'react/addons';
import utils from '../utils/util';
import fs from 'fs';
import path from 'path';
import request from 'request';

var About = React.createClass({

    getInitialState: function() {
        return {
            contributors: [],
            lisence: 'Loading...',
            version: 'Loading...'
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
        var self = this;
        var contributors = [];
        request('https://raw.githubusercontent.com/dloa/alexandria-librarian/master/CONTRIBUTORS.md', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var people = body.split('# ΛLΞXΛNDRIΛ Librarian Contributors:')[1].replace('### Want to contribute?', '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '').split('*').filter(Boolean);
                people.forEach(function(entry) {
                    entry = entry.split(' | ');
                    var person = {
                        name: entry[0],
                        email: entry[1],
                        github: entry[2].split('(')[1].split(')')[0]
                    };
                    contributors.push(person);
                });
                self.setState({
                    contributors: contributors
                });
            } else {
                fs.readFile(path.normalize(path.join(__dirname, '../../', 'CONTRIBUTORS.md')), function(err, data) {
                    if (err) return console.log(err);
                    var people = data.toString().split('# ΛLΞXΛNDRIΛ Librarian Contributors:')[1].replace('### Want to contribute?', '').replace(/\n/g, '').replace(/^\s+|\s+$/g, '').split('*').filter(Boolean);
                    people.forEach(function(entry) {
                        entry = entry.split(' | ');
                        var person = {
                            name: entry[0],
                            email: entry[1],
                            github: entry[2].split('(')[1].split(')')[0]
                        };
                        contributors.push(person);
                    });
                    self.setState({
                        contributors: contributors
                    });
                });
            }
        });
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
