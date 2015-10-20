import React from 'react/addons';
import Router from 'react-router';
import Settings from '../utils/SettingsUtil';
import utils from '../utils/Util';
import HTTPAPI from '../utils/HttpUtil';
import startupManager from 'node-startup-manager';

var Preferences = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
            Analytics: true,
            HTTPAPIEnabled: Settings.get('HTTPAPIEnabled'),
            HTTPAPIPort: Settings.get('HTTPAPIPort'),
            MinToTray: true,
            WebPort: 80,
            startOnBoot: Settings.get('startOnBoot'),
            FlorincoindUsername: Settings.get('Florincoind-username'),
            FlorincoindPassword: Settings.get('Florincoind-password')
        };
    },
    handleChangeMinimizeToTray: function(e) {
        var checked = e.target.checked;
        console.log(checked);
        this.setState({
            Analytics: checked
        });

    },
    handleChangeAnalytics: function(e) {
        var checked = e.target.checked;

        this.setState({
            Analytics: checked
        });

    },
    handleChangeStartOnBoot: function(e) {
        var checked = e.target.checked;
        this.setState({
            startOnBoot: checked
        });

        if (checked) {
            startupManager.addStartup({
                    appPath: require('remote').require('app').getPath('exe'),
                    appName: 'AlexandriaLibrarian'
                })
                .then(function() {
                    console.log('App added to startup')
                })
                .catch(function(e) {
                    Console.log('Something went wrong; Perms?', e)
                });
        } else {
            startupManager.removeStartup('AlexandriaLibrarian')
                .then(function() {
                    console.log('App removed from startup')
                })
                .catch(function(e) {
                    Console.log('Something went wrong; Perms?', e)
                });
        }

        Settings.save('startOnBoot', checked);
    },
    handleChangeHTTPAPIEnabled: function(e) {
        var checked = e.target.checked;
        var self = this;
        HTTPAPI.toggle(checked, this.state.HTTPAPIPort).then(function() {
            self.setState({
                HTTPAPIEnabled: checked
            });
            Settings.save('HTTPAPIEnabled', checked);
        }).catch(function(e) {
            self.setState({
                HTTPAPIEnabled: false
            });
            Settings.save('HTTPAPIEnabled', false);

        });


    },
    handleResetSettings: function() {
        Settings.reset();
    },
    handlePurgeBins: function() {
        utils.purgeBins('all');
    },
    handleResetPurge: function() {
        utils.purgeBins('all').then(Settings.reset);
    },
    handleChangeWebAccsess: function(e) {
        var checked = e.target.checked;
        console.log(checked);
        this.setState({
            RemoteWeb: checked
        });
    },
    handleChangeFlorincoindCreds: function(e) {
        var target = e.target.id;

        if (target === 'Florincoind-username')
            this.setState({
                FlorincoindUsername: e.target.value
            });
        else
            this.setState({
                FlorincoindPassword: e.target.value
            });
        Settings.save(e.target.id, e.target.value);

    },
    handleOpenDevTools: function() {
        require('remote').getCurrentWindow().toggleDevTools();
    },
    render: function() {
        return (
            <div className='content-scroller' id='content'>
                <section>
                    <h1 className='title'>General</h1>
                    <div className="DaemonWrapper">
                        <div className="toggle-wrapper">
                            <input checked={this.state.startOnBoot} onChange={this.handleChangeStartOnBoot} type="checkbox" id="startOnBoot" className="toggle" />
                            <label htmlFor="startOnBoot"></label>
                        </div>
                        <p>Start ΛLΞXΛNDRIΛ Librarian on boot</p>
                    </div>
                </section>
                <section>
                    <h1 className='title'>Web Interface</h1>
                    <div className="DaemonWrapper">
                        <div className="toggle-wrapper">
                            <input checked={this.state.HTTPAPIEnabled} onChange={this.handleChangeHTTPAPIEnabled} type="checkbox" id="HTTPAPIEnabled" className="toggle" />
                            <label htmlFor="HTTPAPIEnabled"></label>
                        </div>
                        <p>Enable HTTP API</p>
                    </div>
                    <span>Port:</span><input name="username" value={this.state.HTTPAPIPort} placeholder="HTTP API Port" type="text" />
                </section>
                <section>
                    <h1 className='title'>Authentication</h1>
                </section>
                <section>
                    <h1 className='title'>Florincoind Credentials</h1>

                    <input name="username" id='Florincoind-username' onChange={this.handleChangeFlorincoindCreds} value={this.state.FlorincoindUsername} placeholder="Username" type="text" />
                    <input name="password" id='Florincoind-password' onChange={this.handleChangeFlorincoindCreds} value={this.state.FlorincoindPassword} placeholder="Password" type="text" />
                </section>
                <section>
                    <h1 className='title'>Other</h1>

                    <button className="left" type="submit" onClick={this.handleResetSettings}><p>Reset Settings</p></button> 
                    <button className="left" type="submit" onClick={this.handlePurgeBins}><p>Uninstall All Daemons</p></button>
                    <button className="left" type="submit" onClick={this.handleResetPurge}><p>Uninstall & Reset Settings (dev)</p></button>
                    <button className="left" type="submit" onClick={this.handleOpenDevTools}><p>Open Dev Tools</p></button>
                </section>
            </div>
        );
    }
});

module.exports = Preferences;
