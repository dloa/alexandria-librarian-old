import React from 'react';
import DataGrid from 'react-datagrid';

import Settings from '../utils/settingsUtil';
import PublishActions from '../actions/publishActions';
import utils from '../utils/util';
import publishStore from '../stores/publishStore';


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
            <div class="container">
            <h2>Publish Artifact</h2>
            <h3>Choose Artifact Type</h3>
            <div class="well full">
                <div class="clear"></div>
                <div class="artifactModule">
                    <div class="artifactCircle archive"></div>
                    <p class="artifactText">Archive</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle movie"></div>
                    <p class="artifactText">Movie</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle video"></div>
                    <p class="artifactText">Video</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle song"></div>
                    <p class="artifactText">Song</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle album active"></div>
                    <p class="artifactText">Album</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle podcast"></div>
                    <p class="artifactText">Podcast</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle recipies"></div>
                    <p class="artifactText">Recipies</p>
                </div>
                <div class="artifactModule">
                    <div class="artifactCircle things"></div>
                    <p class="artifactText">Things</p>
                </div>
                <div class="clear"></div>
            </div>
            <div class="twothirds left">
                <h3>Album Information</h3>
                <div class="well">
                    <div class="pad">
                        <div class="inputSpacing">
                            <p class="albumText">Artist Name</p> 
                            <input type="text" name="artist-name"></input>
                        </div>
                        <div class="clear"></div>
                        <div class="inputSpacing">
                            <p class="albumText">Album Title</p> 
                            <input type="text" name="album-title"></input>
                        </div>
                        <div class="clear"></div>
                        <div class="inputSpacing">
                            <p class="albumText">Record Label</p> 
                            <input type="text" name="record-label"></input>
                        </div>
                        <div class="clear"></div>
                        <div class="inputSpacing">
                            <p class="albumText">Release Date</p> 
                            <input type="date" name="release-date"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="onethird right">
                <h3>Cover Art</h3>
                <div class="well album-artwork" id="artwork">
                    <div class="album-image" id="album-image"></div>
                    <h2 class="cover-text">drag cover art file here</h2>
                </div>
            </div>
            <div class="onefourth left">
                <h3>Individual Track Pricing</h3>
                <div class="well">
                    <div class="pricing-pad">
                        <div class="pricingSpacing">
                            <span class="price-width left">Suggested price / play </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div class="pricingSpacing">
                            <span class="price-width left">Minimum price / play </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div class="pricingSpacing">
                            <span class="price-width left">Suggested price / download </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div class="pricingSpacing">
                            <span class="price-width left">Minimum price / download </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="onefourth left">
                <h3>Entire Album Pricing</h3>
                <div class="well">
                    <div class="pricing-pad">
                        <div class="pricingSpacing">
                            <span class="price-width left">Suggested price / play </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div class="pricingSpacing">
                            <span class="price-width left">Minimum price / play </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div class="pricingSpacing">
                            <span class="price-width left">Suggested price / download </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                        <div class="pricingSpacing">
                            <span class="price-width left">Minimum price / download </span><input id="price1" class="pricing" type="text" name="single-play-price" value="$"></input>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full left">
                <h3>Audio Tracks</h3>
                <div class="well">
                    <h2 class="audio-text">drag audio files here</h2>
                </div>
            </div>
            <div class="full left">
                <h3>Extra Files</h3>
                <div class="well">
                    <h2 class="audio-text">drag extra files here</h2>
                </div>
            </div>
        </div>
        );
    }
});