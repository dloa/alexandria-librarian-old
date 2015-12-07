import React from 'react';

import PublishActions from './actions';
import publishStore from './store';


let If = React.createClass({
    render() {
        return this.props.test ? this.props.children : false;
    }
});

export
default React.createClass({
    getInitialState() {
        return {};
    },
    componentDidMount() {
        publishStore.listen(this.update);
    },
    componentWillUnmount() {
        publishStore.unlisten(this.update);
    },
    update() {
        if (this.isMounted()) {
            this.setState({});
        }
    },
    render() {
        return (
            <div className="col-lg-12">
                <div className="section publish">
                    <h4 className="title">Publish Artifact</h4>
                    <div className="publish-section">
                        <h5>Select Artifact type</h5>
                        <div className="artifact-type">
                        <div data-toggle="buttons">
                            <label className="btn btn-toggle-primary active">
                                <input type="radio" name="options" id="option1" autocomplete="off"/> Archive
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option2" autocomplete="off"/> Movies
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autocomplete="off"/> Videos
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autocomplete="off"/> Song
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autocomplete="off"/> Album
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autocomplete="off"/> Podcast
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autocomplete="off"/> Recipies
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autocomplete="off"/> Things
                            </label>
                        </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="row">
                            <div className="col-sm-8">
                                <h5>Album Information</h5>
                                <form>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="" placeholder="Artist Name"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="" placeholder="Album Title"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="" placeholder="Record Label"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="" placeholder="Release Date"/>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-4">
                                <h5>Cover Art</h5>
                                <img src="assets/img/cover-art-example.png" alt="" className="cover-art"/>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="row">
                            <div className="col-sm-6">
                                <h5>Individual Track Pricing</h5>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-sm-6">
                                <h5>Full Album Pricing</h5>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <h5>Audio Tracks</h5>
                    </div>
                    <div className="publish-section">
                        <h5>Extra Files</h5>
                    </div>
                </div>
                
            </div>
        );
    }
});