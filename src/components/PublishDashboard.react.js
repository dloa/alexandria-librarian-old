import React from 'react';
import DataGrid from 'react-datagrid';

import Settings from '../utils/settingsUtil';
import PublishActions from '../actions/publishActions';
import utils from '../utils/util';
import publishStore from '../stores/publishStore';

var Dropzone = require('react-dropzone');

var artwork = "";
var audioFiles = [];
var extraFiles = [];


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({
    componentDidMount() {
        publishStore.listen(this.update);
    },

    componentWillUnmount() {
        publishStore.unlisten(this.update);
    },

    artworkDrop: function (files) {
      console.log('Received files: ', files);
      console.log(this.refs.artwork);
      this.refs.artwork.style.backgroundImage = "url('file://" + files[0].path + "')";
      this.refs.albumText.innerHTML = "";
    },

    audioDrop: function (files) {
      console.log('Received files: ', files);
      for (var i = 0; i < files.length; i++) {
          if (files[i].type.indexOf("audio") > -1){
            if (audioFiles.length == 0){
                this.refs.audioInner.innerHTML = "<div class='pad'><table><thead><tr><th style='width:10%'>File #</th><th style='width:40%' class='left-text'>File Name</th><th style='width:15%'>File Size</th><th style='width:10%'>Duration</th><th style='width:10%'>Track #</th><th style='width:25%' class='left-text'>Display Name</th></tr></thead><tbody><tr><td>File #"+(audioFiles.length+files.length)+"</td><td class='left-text'>" + files[i].name + "</td><td>3.5 MB</td><td>3:27</td><td><input type='text' value='1'></input></td><td class='left-text'><input type='text' value='DJ Day' style='width:90%'></input></td></tr></tbody></table></div>";
                /*<div className='pad'>
                        <table>
                          <thead>
                            <tr>
                              <th style='width: 10%' >File #</th>
                              <th style='width: 40%' class='left-text'>File Name</th>
                              <th style='width: 15%'>File Size</th>
                              <th style='width: 10%'>Duration</th>
                              <th style='width: 10%'>Track #</th>
                              <th style='width: 25%' class='left-text'>Display Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>File #" + (audioFiles.length+files.length) + "</td>
                              <td class='left-text'>" + files[i].name + "</td>
                              <td>3.5 MB</td>
                              <td>3:27</td>
                              <td><input type='text' value='1'></input></td>
                              <td class='left-text'><input type='text' value='DJ Day' style='width: 90%'></input></td>
                            </tr>
                          </tbody>
                        </table>
                    </div>"*/
            }
          } else {
            console.log("Not Audio!");
          }
      };
    },

    extraDrop: function (files) {
      console.log('Received files: ', files);
    },

    update() {
        if (this.isMounted()) {
            this.setState({
                youtubeAuthorization: publishStore.getState().youtubeAuthorization,
                youtubeContent: publishStore.getState().youtubeContent
            });
        }
    },
    render() {
        return (
            <div className="content-scroller">
            <div className="container">
            <h2>Publish Artifact</h2>
            <h3>Choose Artifact Type</h3>
            <div className="well full">
                <div className="clear"></div>
                <div className="artifactModule">
                    <div className="artifactCircle archive"></div>
                    <p className="artifactText">Archive</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle movie"></div>
                    <p className="artifactText">Movie</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle video"></div>
                    <p className="artifactText">Video</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle song"></div>
                    <p className="artifactText">Song</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle album active"></div>
                    <p className="artifactText">Album</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle podcast"></div>
                    <p className="artifactText">Podcast</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle recipies"></div>
                    <p className="artifactText">Recipies</p>
                </div>
                <div className="artifactModule">
                    <div className="artifactCircle things"></div>
                    <p className="artifactText">Things</p>
                </div>
                <div className="clear"></div>
            </div>
            <div className="twothirds left">
                <h3>Album Information</h3>
                <div className="well">
                    <div className="pad">
                        <div className="inputSpacing">
                            <p className="albumText">Artist Name</p> 
                            <input type="text" name="artist-name"></input>
                        </div>
                        <div className="clear"></div>
                        <div className="inputSpacing">
                            <p className="albumText">Album Title</p> 
                            <input type="text" name="album-title"></input>
                        </div>
                        <div className="clear"></div>
                        <div className="inputSpacing">
                            <p className="albumText">Record Label</p> 
                            <input type="text" name="record-label"></input>
                        </div>
                        <div className="clear"></div>
                        <div className="inputSpacing">
                            <p className="albumText">Release Date</p> 
                            <input type="date" name="release-date"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="onethird right">
                <h3>Cover Art</h3>
                <Dropzone className="well" activeClassName="well-dashed" ref="artwork-dropzone" onDrop={this.artworkDrop}>
                    <div className="album-artwork" ref="artwork">
                        <h2 className="cover-text" ref="albumText">drag cover art file here</h2>
                    </div>
                </Dropzone>
            </div>
            <div className="onefourth left">
                <h3>Individual Track Pricing</h3>
                <div className="well">
                    <div className="pricing-pad">
                        <div className="pricingSpacing">
                            <span className="price-width left">Suggested price / play </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div className="pricingSpacing">
                            <span className="price-width left">Minimum price / play </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div className="pricingSpacing">
                            <span className="price-width left">Suggested price / download </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div className="pricingSpacing">
                            <span className="price-width left">Minimum price / download </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="onefourth left">
                <h3>Full Album Pricing</h3>
                <div className="well">
                    <div className="pricing-pad">
                        <div className="pricingSpacing">
                            <span className="price-width left">Suggested price / play </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div className="pricingSpacing">
                            <span className="price-width left">Minimum price / play </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div className="pricingSpacing">
                            <span className="price-width left">Suggested price / download </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div className="pricingSpacing">
                            <span className="price-width left">Minimum price / download </span><input id="price1" className="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="full left">
                <h3>Audio Tracks</h3>
                <Dropzone className="well" activeClassName="well-dashed" ref="audio" onDrop={this.audioDrop}>
                    <div ref="audioInner">
                        <h2 className="audio-text">drag audio files here</h2>
                    </div>
                </Dropzone>
            </div>
            <div className="full left">
                <h3>Extra Files</h3>
                <Dropzone className="well" activeClassName="well-dashed" ref="extraFiles" onDrop={this.extraDrop}>
                    <h2 className="audio-text">drag extra files here</h2>
                </Dropzone>
            </div>
        </div>
        </div>
        );
    }
});