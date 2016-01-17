var path = require('path');
var execFile = require('child_process').execFile;
var packagejson = require('./package.json');
try{
    var electron = require('electron-prebuilt');
}catch(e){
    
}

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var target = grunt.option('target') || 'development';

    var BASENAME = 'ΛLΞXΛNDRIΛ Librarian';
    var arch = grunt.option('arch') ? grunt.option('arch') : 'ia32';

    var platform = grunt.option('platform') ? grunt.option('platform') : process.platform;

    var env = process.env;
    env.NODE_ENV = 'development';

    grunt.initConfig({
        electron: {
            win32: {
                options: {
                    name: BASENAME,
                    dir: 'build/',
                    out: 'dist',
                    version: packagejson.optionalDependencies['electron-prebuilt'],
                    platform: 'win32',
                    arch: arch,
                    asar: false
                }
            },
            linux: {
                options: {
                    name: BASENAME,
                    dir: 'build/',
                    out: 'dist',
                    version: packagejson.optionalDependencies['electron-prebuilt'],
                    platform: 'linux',
                    arch: arch,
                    asar: false
                }
            },
            darwin: {
                options: {
                    name: BASENAME,
                    dir: 'build/',
                    out: 'dist',
                    version: packagejson.optionalDependencies['electron-prebuilt'],
                    platform: 'darwin',
                    arch: 'x64',
                    asar: false,
                    'app-bundle-id': 'io.ΛLΞXΛNDRIΛ.Librarian',
                    'app-version': packagejson.version
                }
            }
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['*.md', 'package.json', 'settings.json', 'index.html'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'bin/' + platform + '/',
                    src: ['**/*'],
                    dest: 'build/bin/',
                }, {
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*'],
                    dest: 'build/images/'
                }, {
                    expand: true,
                    cwd: 'fonts/',
                    src: ['**/*'],
                    dest: 'build/fonts/'
                }]
            },
            release: {
                files: [{
                    expand: true,
                    cwd: '.',
                    src: ['*.md', 'package.json', 'settings.json', 'index.html'],
                    dest: 'build/'
                }, {
                    expand: true,
                    cwd: 'bin/' + platform + '/',
                    src: ['**/*'],
                    dest: 'build/bin/',
                }, {
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*'],
                    dest: 'build/images/'
                }, {
                    expand: true,
                    cwd: 'fonts/',
                    src: ['**/*'],
                    dest: 'build/fonts/'
                }]
            },
            'release-darwin': {
                files: [{
                    src: 'util/images/librarian_icon.icns',
                    dest: '<%= OSX_FILENAME %>/Contents/Resources/atom.icns'
                }],
                options: {
                    mode: true
                }
            },
        },
        'npm-command': {
            release: {
                options: {
                    cwd: 'build/',
                    args: ['--production', '--no-optional']
                }
            }
        },
        sass: {
            options: {
                outputStyle: 'compressed',
                sourceMapEmbed: true
            },
            dist: {
                files: {
                    'build/css/main.css': 'styles/src/main.scss',
                    'build/css/vender.css': 'styles/vender/**/*.css'
                }
            }
        },
        babel: {
            options: {
                sourceMap: 'inline',
                presets: ['es2015', 'react'],
                plugins: ["syntax-decorators"],
                compact: true,
                comments: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'build/js'
                }]
            }
        },
        shell: {
            electron: {
                command: electron + ' . ' + (grunt.option('dev') ? '--dev' : ''),
                options: {
                    async: true,
                    execOptions: {
                        cwd: 'build'
                    }
                }
            }
        },
        clean: {
            build: ['build/'],
            dist: ['dist/'],
            release: ['release/']
        },
        watchChokidar: {
            options: {
                spawn: true
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: ['build/**/*']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['newer:babel']
            },
            sass: {
                files: ['styles/**/*.scss'],
                tasks: ['sass']
            },
            copy: {
                files: ['images/*', 'index.html', 'fonts/*'],
                tasks: ['newer:copy:dev']
            }
        }
    });

    grunt.registerTask('default', ['newer:babel', 'sass', 'newer:copy:dev', 'shell:electron', 'watchChokidar']);

    grunt.registerTask('run', ['newer:babel', 'shell:electron', 'watchChokidar']);

    grunt.registerTask('clean:all', ['clean:build', 'clean:dist', 'clean:release']); 

    grunt.registerTask('release', ['babel', 'sass', 'copy:release', 'npm-command:release', 'electron:' + platform]);

    process.on('SIGINT', function() {
        grunt.task.run(['shell:electron:kill']);
        process.exit(1);
    });
};