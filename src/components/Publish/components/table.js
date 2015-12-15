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


    setFile(event) {

    },

    generateFiles(files) {

        switch (this.props.type) {
            case 'audio':
                return (
                        {
                            // \/ that period breaks it ;)
                            this.props.files.map((file, idx) => {
                                return(
                                        <tr>
                                            <td>1</td>
                                            <td>{file.name}</td>
                                            <td>{file.size}</td>
                                            <td>{file.length} min</td>
                                            <td><input onChange={this.setFile} type="text" className="form-control" value={file.track_num}/></td>
                                            <td><input onChange={this.setFile} type="text" className="form-control" value={file.name}/></td>
                                        </tr>
                                    )
                            })
                        }
                );
                break;
            case 'extra':
                return (
                    <tr>
                        <td>1</td>
                        <td>dj_day.flac</td>
                        <td><input onChange={this.setFile} type="text" className="form-control" value="1"/></td>
                        <td><input onChange={this.setFile} type="text" className="form-control" value="DJ Day"/></td>
                    </tr>
                );
                break;
        }

    },

    render(header = this.getHeader()) {
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