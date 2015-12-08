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
        return {
            type: 'music',
            files: [],
            meta: {},
            pricing: {}
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
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option1" autoComplete="off"/> Archive
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option2" autoComplete="off"/> Movies
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Videos
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Song
                            </label>
                            <label className="btn btn-toggle-primary active">
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Album
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Podcast
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Recipies
                            </label>
                            <label className="btn btn-toggle-primary">
                                <input type="radio" name="options" id="option3" autoComplete="off"/> Things
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
                                <img src="" alt="" className="cover-art"/>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section publish-pricing">
                        <img src="images/il-money.png" alt="" className="li-money"/>
                       <div className="row">
                           <div className="col-sm-10">
                               <p className="small">Pick the price for your track and album.</p>
                           </div>
                       </div>
                        <div className="row">
                            <div className="col col-sm-6">
                                <h5>Individual Track Pricing</h5>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col col-sm-6">
                                <h5>Full Album Pricing</h5>
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / play</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Suggested price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className="col-sm-7 control-label">Minimum price / download</label>
                                        <div className="col-sm-5">
                                            <div className="input-group">
                                                <div className="input-group-addon">$</div>
                                                <input type="text" className="form-control" id="" placeholder="0.00"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="publish-files audio-tracks">
                            <h5>
                            <object type="image/svg+xml" data="images/svg/media-16px-2_note-03.svg"/>
                            Audio Tracks</h5>

                            <div className="upload-area">
                                <object data="images/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/>
                            </div>
                        </div>
                    </div>
                    <div className="publish-section">
                        <div className="publish-files extra-files">
                            <h5>
                                <object type="image/svg+xml" data="images/svg/files-16px_single-folded-content.svg"/>
                                Extra Files
                            </h5>
                            <table className="table">
                                <colgroup>
                                    <col className=""/>
                                    <col className=""/>
                                    <col style={{width: '75px'}}/>
                                    <col className=""/>
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>File</th>
                                        <th>File Name</th>
                                        <th>File Type</th>
                                        <th>Display name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>dj_day.flac</td>
                                        <td><input type="text" className="form-control" value="1"/></td>
                                        <td><input type="text" className="form-control" value="DJ Day"/></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>i_digress.flac</td>
                                        <td><input type="text" className="form-control" value="2"/></td>
                                        <td><input type="text" className="form-control" value="I Digress"/></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="upload-area">
                                <object data="images/svg/arrows-24px-glyph-2_file-upload-88.svg" type="image/svg+xml"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});