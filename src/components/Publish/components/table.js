import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export
default React.createClass({

    mixins: [PureRenderMixin],

    getHeader() {
        switch (this.props.type) {
            case 'audio':
                return {
                    thead: (
                        <tr>
                            <th>File</th>
                            <th>File Name</th>
                            <th>File Size</th>
                            <th>Duration</th>
                            <th>Track</th>
                            <th>Display name</th>
                        </tr>
                    ),
                    colgroup: (
                        <colgroup>
                            <col className=""/>
                            <col className=""/>
                            <col style={{width: '75px'}}/>
                            <col style={{width: '75px'}}/>
                            <col style={{width: '75px'}}/>
                            <col className=""/>
                        </colgroup>
                    )
                }
                break;
            case 'extra':
                return {
                    thead: (
                        <tr>
                            <th>File</th>
                            <th>File Name</th>
                            <th>File Type</th>
                            <th>Display name</th>
                        </tr>
                    ),
                    colgroup: (
                        <colgroup>
                            <col className=""/>
                            <col className=""/>
                            <col style={{width: '75px'}}/>
                            <col className=""/>
                        </colgroup>
                    )
                }
                break;
        }
    },

    generateFiles(files) {

        switch (this.props.type) {
            case 'audio':
                return (
                    <tr>
                        <td>1</td>
                        <td>dj_day.flac</td>
                        <td>3.5 MB</td>
                        <td>3:27 min</td>
                        <td><input type="text" className="form-control" value="1"/></td>
                        <td><input type="text" className="form-control" value="DJ Day"/></td>
                    </tr>
                );
                break;
            case 'extra':
                return (
                    <tr>
                        <td>1</td>
                        <td>dj_day.flac</td>
                        <td><input type="text" className="form-control" value="1"/></td>
                        <td><input type="text" className="form-control" value="DJ Day"/></td>
                    </tr>
                );
                break;
        }

    },

    render() {

        let header = this.getHeader();

        return (
            <table className="table">
                {header.colgroup}
                <thead>
                    {header.thead}
                </thead>
                <tbody>
                    {this.generateFiles()}
                </tbody>
            </table>
        );
    }
});