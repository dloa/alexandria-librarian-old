import React from 'react/addons';
import Router from 'react-router';
import utils from '../utils/Util';
import fs from 'fs';
import path from 'path';

let Contributors = {
    'luigiplr': {
        name: 'Luigi Poole',
        email: 'luigipoole@outlook.com',
        github: 'luigiplr'
    },
};

var About = React.createClass({
    mixins: [Router.Navigation],


    openGithub:function(e){
      var username = e.target.getAttribute('data-github');
      utils.openUrl('https://github.com/'+ username)
    },

    render: function() {
        var Contributors = [
            {
                name: 'Luigi Poole',
                email: 'luigipoole@outlook.com',
                github: 'luigiplr'
            },
            {
                name: 'Niv Sardi',
                email: 'xaiki@debian.org',
                github: 'Xaiki'
            },
            {
                name: 'Devon Read',
                email: 'devon@blocktech.com',
                github: 'DevonJames'
            },
            {
                name: 'Colin Bishop',
                email: 'colin_bishop@outlook.com',
                github: 'cobis2798'
            },
            {
                name: 'Avery Dodd',
                email: 'averyhvdodd@gmail.com',
                github: 'AveryDodd'
            }
        ];
        var version = 'v0.5.2 α';

        var License = fs.readFileSync(path.normalize(path.join(__dirname, '../../', 'LICENSE.md')), 'utf8');

        return (
        <div className="content-scroller" id="content">
        <section>
                <h1 className="title">About</h1>
                <p className="about" >This is a prototype developer build, and is not representative of the final product.</p>
                <br/>
                <p className="about" >ΛLΞXΛNDRIΛ Librarian, {version} </p>
               
        </section>
        <section>
                <h1 className="title">Contributors</h1>
                  {Contributors.map(function(Contributor, i) {
                    return (
                      <p className="Contributor">{Contributor.name} {'<' + Contributor.email + '>'} <i data-github={Contributor.github}  onClick={this.openGithub} className="ion-social-github" /></p>
                    );
                   }, this)}             
        </section>
         <section>
                <h1 className="title">License</h1>
                <textarea className="License"  value={License} readOnly />
        </section>
      </div>
        );
    }
});

module.exports = About;