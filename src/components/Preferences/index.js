import React from 'react';
import startupManager from 'node-startup-manager';

import Settings from '../utils/settingsUtil';
import utils from '../utils/util';
import HTTPAPI from '../utils/httpApiUtil';


export
default React.createClass({
    getInitialState() {
        return {
            Analytics: true,
            HTTPAPIEnabled: Settings.get('HTTPAPIEnabled'),
            HTTPAPIPort: Settings.get('HTTPAPIPort'),
            MinToTray: true,
            WebPort: 80,
            startOnBoot: Settings.get('startOnBoot'),
            startMinimized: Settings.get('startMinimized'),
            FlorincoindUsername: Settings.get('Florincoind-username'),
            FlorincoindPassword: Settings.get('Florincoind-password')
        };
    },
    handleChangeMinimizeToTray(e) {
        var checked = e.target.checked;
        console.log(checked);
        this.setState({
            Analytics: checked
        });

    },
    handleChangeAnalytics(e) {
        var checked = e.target.checked;

        this.setState({
            Analytics: checked
        });

    },
    handleChangeStartOnBoot(e) {
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
    handlestartMinimized(e) {
        var checked = e.target.checked;
        this.setState({
            startMinimized: checked
        });
        Settings.save('startMinimized', checked);
    },
    handleChangeHTTPAPIEnabled(e) {
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
    handleChangeHTTPAPIPort(e) {
        
    },
    handleResetSettings() {
        Settings.reset();
    },
    handlePurgeBins() {
        utils.purgeBins('all');
    },
    handleResetPurge() {
        utils.purgeBins('all').then(Settings.reset);
    },
    handleChangeWebAccsess(e) {
        var checked = e.target.checked;
        console.log(checked);
        this.setState({
            RemoteWeb: checked
        });
    },
    handleChangeFlorincoindCreds(e) {
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
    handleOpenDevTools() {
        require('remote').getCurrentWindow().toggleDevTools();
    },
    render() {
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
                    <div className="DaemonWrapper">
                        <div className="toggle-wrapper">
                            <input checked={this.state.startMinimized} onChange={this.handleChangestartMinimized} type="checkbox" id="startMinimized" className="toggle" />
                            <label htmlFor="startMinimized"></label>
                        </div>
                        <p>Start in tray</p>
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
                    <span>Port:</span><input name="username" onChange={this.handleChangeHTTPAPIPort} value={this.state.HTTPAPIPort} placeholder="HTTP API Port" type="text" />
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