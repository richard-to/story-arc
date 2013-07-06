module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        distdir: 'dist',

        clean: ['<%= distdir %>'],

        copy: {
            server: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/server',
                        src: ['*.yaml', '*.py'],
                        dest: '<%= distdir %>/'
                    }
                ]
            },
            components: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'components',
                        src: [
                            'angular/angular.js',
                            'angular-bootstrap/ui-bootstrap.js',
                            'angular-resource/angular-resource.js',
                            'angular-ui-sortable/src/sortable.js',
                            'backbone/backbone.js',
                            'jquery/jquery.js',
                            'jquery-ui/ui/jquery-ui.js',
                            'jquery-ui/ui/jquery.ui.sortable.js',
                            'underscore/underscore.js'
                        ],
                        dest: '<%= distdir %>/static/js'
                    },
                    {
                        expand: true,
                        cwd: 'components/bootstrap/docs/assets/css',
                        src: [
                            'bootstrap.css',
                            'bootstrap-responsive.css'
                        ],
                        dest: '<%= distdir %>/static/css'
                    },
                    {
                        expand: true,
                        cwd: 'components/bootstrap/docs/assets/img',
                        src: ['glyphicons-*.png'],
                        dest: '<%= distdir %>/static/img'
                    },
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/client/js',
                        src: ['**/*.js', '!**/*.spec.js', '**/*.tpl.html'],
                        dest: '<%= distdir %>/static/js'
                    }
                ]
            }
        },

        jshint: {
            src: [
                'Gruntfile.js',
                'src/client/js/**/*.js',
            ]
        },

        concat: {
            templates: {
                src: ['src/server/templates/index.html'],
                dest: '<%= distdir %>/templates/index.html',
                options: {
                    process: true
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= distdir %>/static/css/main.css': ['src/client/scss/main.scss']
                }
            }
        },

        karma: {
            options: {
                runnerPort: 9100,
                browsers: ['Chrome']
            },
            unit: {
                configFile: 'karma.conf.js',
                background: true
            },
            e2e: {
                configFile: 'karma.e2e.conf.js',
                background: true
            },
            continuous: {
                configFile: 'karma.e2e.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        watch: {
            css: {
                files: ['src/client/scss/main.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/client/js/**/*.js', 'src/client/js/**/*.tpl.html'],
                tasks: ['jshint', 'copy:dist']
            },
            server: {
                files: ['src/server/**'],
                tasks: ['copy:server', 'concat:templates']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['jshint', 'clean', 'copy', 'concat', 'sass']);
    grunt.registerTask('test', ['karma:unit', 'karma:e2e']);
};
