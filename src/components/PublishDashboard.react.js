import React from 'react';
import DataGrid from 'react-datagrid';
import Dropzone from 'react-dropzone';
import ReactUpdate from 'react-addons-update';

import Settings from '../utils/settingsUtil';
import PublishActions from '../actions/publishActions';
import utils from '../utils/util';
import publishStore from '../stores/publishStore';


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
    getInitialState() {
        return {
            files: {
                extra: [],
                audio: [],
                artwork: false
            },
            meta: false
        };
    },
    componentDidMount() {
        publishStore.listen(this.update);
    },
    componentWillUnmount() {
        publishStore.unlisten(this.update);
    },
    update() {
        if (this.isMounted()) {
            this.setState({
                youtubeAuthorization: publishStore.getState().youtubeAuthorization,
                youtubeContent: publishStore.getState().youtubeContent
            });
        }
    },
    artworkDrop(files) {
        this.setState({
            files: ReactUpdate(this.state.files, {
                artwork: {
                    $set: files[0].path.toString()
                }
            })
        });
    },
    audioDrop(files) {
        console.log('Received files: ', files);
        for (var i = 0; i < files.length; i++) {
            if (files[i].type.indexOf('audio') > -1) {




            }
        };
    },
    extraDrop(files) {
        console.log('Received files: ', files);
    },
    generateFile(file, type = 'audio') {
        switch (type) {
            case 'audio':
                return (
                    <tr>
                        <td>'File '{audioFiles.length + files.length}</td>
                        <td className='left-text'>{file.name}</td>
                        <td>{file.size}</td>
                        <td>{file.length}</td>
                        <td><input type='text' value='1'/></td>
                        <td className='left-text'><input type='text' value='DJ Day' style={{width:'90%'}}/></td>
                    </tr>
                );
                break;
        }
    },
    render() {
        let artifactModules = ['Archive', 'Movie', 'Video', 'Song', 'Album', 'Podcast', 'Recipies', 'Things'];
        let albumart = this.state.files.artwork ? "url('file://" + this.state.files.artwork + "')" : '';
        return (
            <div className="content-scroller">
                <div className="container">
                    <h2>Publish Artifact</h2>
                    <h3>Choose Artifact Type</h3>
                    <div className="well full">
                    <div className="clear"/>
                        {
                            artifactModules.map(function(artifact) {
                                return (
                                        <div key={artifact} className="artifactModule">
                                            <div className="artifactCircle {artifact.toLowerCase()}"/>
                                            <p className="artifactText">{artifact}</p>
                                        </div>
                                    );
                            }, this)
                        }
                    <div className="clear"/>
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
                <Dropzone className="well" activeClassName="well-dashed" onDrop={this.artworkDrop}>
                    <div  className="album-artwork">
                        <If test={!this.state.files.artwork}>
                            <h2 className="cover-text" ref="albumText">drag cover art file here</h2>
                        </If>
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
                        <If test={(this.state.files.audio.length > 0)}>
                            <div className='pad'>
                                <table>
                                   <thead>
                                        <tr>
                                            <th style={{width: '10%'}}>File #</th>
                                            <th style={{width: '40%'}} className='left-text'>File Name</th>
                                            <th style={{width: '15%'}}>File Size</th>
                                            <th style={{width: '10%'}}>Duration</th>
                                            <th style={{width: '10%'}}>Track #</th>
                                            <th style={{width: '25%'}} className='left-text'>Display Name</th>
                                        </tr>
                                    </thead>
                                    <tbody ref='audioTable'>
                                        {
                                            this.state.files.audio.map(function(file) {
                                                return this.generateFile(file);
                                            }, this)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </If>
                        <If test={!(this.state.files.audio.length > 0)}>
                            <h2 className="audio-text">drag audio files here</h2>
                        </If>
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