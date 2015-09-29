import React from 'react/addons';
import Router from 'react-router';
import hub from '../utils/HubUtil';

var Preferences = React.createClass({
  mixins: [Router.Navigation],
 
  getInitialState: function () {
    return {
      Analytics: true     
    };
  },

  handleChangeAnalytics: function (e) {
    var checked = e.target.checked;
    this.setState({
      Analytics: checked
    });

  },


  render: function () {
    return (
      <div className="content-scroller" id="content">
        <section>
                <h1 className="title">General</h1>
                <div className="checkbox">
                    <input id="reportAnon" type="checkbox" checked={this.state.Analytics} onChange={this.handleChangeAnalytics}/>
                    <label htmlFor="reportAnon"></label>
                    <p>Report anonymous usage analytics</p>
                </div>
                <div className="checkbox">
                    <input id="startOnBoot" type="checkbox" checked={this.state.Analytics} onChange={this.handleChangeAnalytics}/>
                    <label htmlFor="startOnBoot"></label>
                    <p>Start ΛLΞXΛNDRIΛ Librarian on boot</p>
                </div>
              
        </section>
      </div>
    );
  }
});

module.exports = Preferences;
