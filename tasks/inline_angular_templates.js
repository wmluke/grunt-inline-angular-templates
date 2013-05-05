/*
 * grunt-inline-angular-templates
 * https://github.com/wmluke/grunt-inline-angular-templates
 *
 * Copyright (c) 2013 Luke Bunselmeyer
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    var cheerio = require('cheerio'),
        path = require('path');

    grunt.registerMultiTask('inline_angular_templates', 'Inline angular templates into a HTML file', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            base: process.cwd(),
            prefix: ''
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {
            // Concat specified files.
            var src = f.src
                .filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                })
                .map(function (filepath) {
                    var templateUrl = path.join(options.prefix, path.relative(options.base, filepath)).replace(/\\/g, '/');
                    return '<script type="text/ng-template" id="' + templateUrl + '">\n' + grunt.file.read(filepath) + '\n</script>';
                }).join('\n\n');

            var $ = cheerio.load(grunt.file.read(f.dest), {
                ignoreWhitespace: false,
                xmlMode: false,
                lowerCaseTags: false
            });

            $('body').prepend('\n\n<!-- Begin Templates -->\n' + src + '\n<!-- End Templates -->\n\n');

            grunt.file.write(f.dest, $.html());

            grunt.log.writeln('Templates inserted into "' + f.dest + '".');
        });
    });

};
