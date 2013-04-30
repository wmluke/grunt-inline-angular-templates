/*
 * grunt-inline-angular-templates
 * https://github.com/wmluke/grunt-inline-angular-templates
 *
 * Copyright (c) 2013 Luke Bunselmeyer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tests: ['tmp']
        },

        copy: {
            fixtures: {
                files: [
                    {src: ['test/fixtures/index.html'], dest: 'tmp/custom.html'},
                    {src: ['test/fixtures/index.html'], dest: 'tmp/default.html'}
                ]
            }
        },

        // Configuration to be run (and then tested).
        inline_angular_templates: {
            default: {
                files: {
                    'tmp/default.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            custom: {
                options: {
                    base: 'test/fixtures',
                    prefix: '/'
                },
                files: {
                    'tmp/custom.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'inline_angular_templates', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
