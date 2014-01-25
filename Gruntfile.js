/*
 * grunt-inline-angular-templates
 * https://github.com/wmluke/grunt-inline-angular-templates
 *
 * Copyright (c) 2013 Luke Bunselmeyer
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

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
                    {src: ['test/fixtures/index.html'], dest: 'tmp/default.html'},
                    {src: ['test/fixtures/index.html'], dest: 'tmp/custom-replaceWith.html'},
                    {src: ['test/fixtures/index.html'], dest: 'tmp/custom-append.html'},
                    {src: ['test/fixtures/index.html'], dest: 'tmp/custom-before.html'},
                    {src: ['test/fixtures/index.html'], dest: 'tmp/custom-after.html'},
                    {src: ['test/fixtures/index_unescape.html'], dest: 'tmp/custom-unescape.html'},
                    {src: ['test/fixtures/no-munging-attribute-names.html'], dest: 'tmp/no-munging-attribute-names.html'}
                ]
            }
        },

        // Configuration to be run (and then tested).
        'inline_angular_templates': {
            default: {
                files: {
                    'tmp/default.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            'custom_replaceWith': {
                options: {
                    base: 'test/fixtures',
                    prefix: '/',
                    selector: '#templates',
                    method: 'replaceWith'
                },
                files: {
                    'tmp/custom-replaceWith.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            'custom_append': {
                options: {
                    base: 'test/fixtures',
                    prefix: '/',
                    selector: '#templates',
                    method: 'append'
                },
                files: {
                    'tmp/custom-append.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            'custom_before': {
                options: {
                    base: 'test/fixtures',
                    prefix: '/',
                    selector: '#templates',
                    method: 'before'
                },
                files: {
                    'tmp/custom-before.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            'custom_after': {
                options: {
                    base: 'test/fixtures',
                    prefix: '/',
                    selector: '#templates',
                    method: 'after'
                },
                files: {
                    'tmp/custom-after.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            'custom_unescape': {
                options: {
                    base: 'test/fixtures',
                    prefix: '/',
                    selector: '#templates',
                    method: 'append',
                    unescape: {
                        '&lt;': '<',
                        '&gt;': '>',
                        '&apos;': '\'',
                        '&amp;': '&'
                    }
                },
                files: {
                    'tmp/custom-unescape.html': [
                        'test/fixtures/templates/template2.html'
                    ]
                }
            },
            'no_munging_attribute_names': {
                options: {
                    base: 'text/fixtures',
                    prefix: '/',
                    selector: '#templates'
                },
                files: {
                    'tmp/no-munging-attribute-names.html': [
                        'test/fixtures/templates/template1.html',
                        'test/fixtures/templates/template2.html'
                    ]
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        },

        bumpup: ['package.json']

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bumpup');

    grunt.registerTask('bump', function (type) {
        type = type ? type : 'patch';
        grunt.task.run('bumpup:' + type);
    });

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'inline_angular_templates', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
