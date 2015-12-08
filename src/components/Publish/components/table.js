import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({

    mixins: [PureRenderMixin],

    render() {
        return (
            <table className="table">
                <colgroup>
                    <col className=""/>
                    <col className=""/>
                    <col style={{width: '75px'}}/>
                    <col style={{width: '75px'}}/>
                    <col style={{width: '75px'}}/>
                    <col className=""/>
                </colgroup>
                <thead>
                    <tr>
                        <th>File</th>
                        <th>File Name</th>
                        <th>File Size</th>
                        <th>Duration</th>
                        <th>Track</th>
                        <th>Display name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>dj_day.flac</td>
                        <td>3.5 MB</td>
                        <td>3:27 min</td>
                        <td><input type="text" className="form-control" value="1"/></td>
                        <td><input type="text" className="form-control" value="DJ Day"/></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>i_digress.flac</td>
                        <td>3.5 MB</td>
                        <td>3:27 min</td>
                        <td><input type="text" className="form-control" value="2"/></td>
                        <td><input type="text" className="form-control" value="I Digress"/></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>snow_white.flac</td>
                        <td>3.5 MB</td>
                        <td>3:27 min</td>
                        <td><input type="text" className="form-control" value="3"/></td>
                        <td><input type="text" className="form-control" value="Snow White"/></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>offbeat.flac</td>
                        <td>3.5 MB</td>
                        <td>3:27 min</td>
                        <td><input type="text" className="form-control" value="4"/></td>
                        <td><input type="text" className="form-control" value="Offbeat"/></td>
                    </tr>
                </tbody>
            </table>
        );
    }
});