import React from 'react/addons';
import Router from 'react-router';
import Settings from '../utils/SettingsUtil';
import utils from '../utils/Util';
import startupUtil from '../utils/StartupUtil';

var Preferences = React.createClass({
    mixins: [Router.Navigation],

    getInitialState: function() {
        return {
            Analytics: true,
            RemoteWeb: true,
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
        if (checked)
            startupUtil.enableStartOnBoot().then(console.log)
        else
            startupUtil.disableStartOnBoot()

        Settings.save('startOnBoot', checked);
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
                 <div className='checkbox'>
                    <input id='webEnabled' type='checkbox' checked={this.state.RemoteWeb} onChange={this.handleChangeWebAccsess}/>
                    <label className='checkbox' htmlFor='webEnabled'></label>
                    <p>Enable remote accsess</p>
                </div>
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
        </section>
         
      </div>
      );
    }
});

module.exports = Preferences;