import React from 'react/addons';
import Router from 'react-router';
import hub from '../utils/HubUtil';

var Preferences = React.createClass({
  mixins: [Router.Navigation],
 
  getInitialState: function () {
    return {
      Analytics: true,
      RemoteWeb: true, 
      WebPort: 80
    };
  },

  handleChangeAnalytics: function (e) {
    var checked = e.target.checked;
    console.log(checked);
    this.setState({
      Analytics: checked
    });

  },
  handleChangeWebAccsess: function (e) {
    var checked = e.target.checked;
    console.log(checked);
    this.setState({
      RemoteWeb: checked
    });

  },


  render: function () {
    return (
      <div className='content-scroller' id='content'>
        <section>
                <h1 className='title'>General</h1>
                <div className='checkbox'>
                    <input id='reportAnon' type='checkbox' checked={this.state.Analytics} onChange={this.handleChangeAnalytics}/>
                    <label htmlFor='reportAnon'></label>
                    <p>Report anonymous usage analytics</p>
                </div>
                <div className='checkbox'>
                    <input id='startOnBoot' type='checkbox' checked={this.state.Analytics} onChange={this.handleChangeAnalytics}/>
                    <label htmlFor="startOnBoot"></label>
                    <p>Start ΛLΞXΛNDRIΛ Librarian on boot</p>
                </div>
        </section>
        <section>
                <h1 className='title'>Web Interface</h1>
                 <div className='checkbox'>
                    <input id='webEnabled' type='checkbox' checked={this.state.RemoteWeb} onChange={this.handleChangeWebAccsess}/>
                    <label htmlFor='webEnabled'></label>
                    <p>Enable remote accsess</p>
                </div>
        </section>
        <section>
                <h1 className='title'>Authentication</h1>
        </section>
      </div>
    );
  }
});

module.exports = Preferences;
