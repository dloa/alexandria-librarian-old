import React from 'react/addons';
import Router from 'react-router';
import LogStore from '../stores/LogStore';

var _prevBottom = 0;

var PinManager = React.createClass({

  getInitialState: function () {
    return {
      pinned:{}
    };
  },
  handleAddPin: function(){

  },
  render: function () {

    return (
        <section>
            <h1 className="title">IPFS pin manager</h1>
            
            <button className="left" type="submit" onClick={this.handleAddPin}><p>Pin File</p></button>
        </section>
    );
  }
});

module.exports = PinManager;
