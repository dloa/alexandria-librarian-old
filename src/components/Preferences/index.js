import React from 'react';
import remote from 'remote';


export
default React.createClass({
    getInitialState() {
        return {};
    },
    handleChangeAnalytics(e) {
        var checked = e.target.checked;

        this.setState({
            Analytics: checked
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
            <div className="section preferences">
                <div className="settings-section">
                    <h4 className="title">General</h4>
                    <div className="settings-toggle clearfix">
                        <div className="pull-left">
                            <input type="checkbox" id="checked" className="toggle hidden" checked/>
                            <label htmlFor="checked" className="lbl"/>
                        </div>
                        <div className="pull-left">
                            <p>Start Alexandria Librarian on boot</p>
                        </div>
                    </div>
                    <div className="settings-toggle clearfix">
                        <div className="pull-left">
                            <input type="checkbox" id="checked" className="toggle hidden" checked/>
                            <label htmlFor="checked" className="lbl"/> 
                        </div>
                        <div className="pull-left">
                            <p>Start in tray</p>
                        </div>
                    </div>
                </div>
                <div className="settings-section">
                    <h4 className="title">Web Interface</h4>
                    <div className="settings-toggle clearfix">
                        <div className="pull-left">
                            <input type="checkbox" id="checked" className="toggle hidden" checked/>
                            <label htmlFor="checked" className="lbl"/>
                        </div>
                        <div className="pull-left">
                            <p>Enable HTTP API</p>
                        </div>
                    </div>
                    <form className="form-inline">
                        <div className="form-group">
                            <p>Port:</p>
                            <input type="text" className="form-control port" value="8079"/>
                        </div>
                    </form>
                </div>
                <div className="settings-section">
                    <h4 className="title">Florincoind Credentials</h4>
                    <form className="form-inline">
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Password"/>
                        </div>
                        <button className="btn btn-primary">Save</button>
                    </form>
                </div>
                <div className="settings-section">
                    <h4 className="title">Other</h4>
                    <p>
                        <button className="btn btn-default">Reset Settings</button>
                    </p>
                    <p>
                        <button className="btn btn-default">Uninstall All Daemons</button>
                    </p>
                    <p>
                        <button className="btn btn-default">Uninstall & Reset Settings (dev)</button>
                    </p>
                    <p>
                        <button className="btn btn-default">Open Dev tools</button>
                    </p>
                </div>
            </div>
        );
    }
});