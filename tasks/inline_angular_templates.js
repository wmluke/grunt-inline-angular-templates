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

    grunt.registerMultiTask('inlineAngularTemplates', 'Inline angular templates into a HTML file', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            base: process.cwd(),
            prefix: '',
            selector: 'body',
            method: 'prepend',
            unescape: {},
            defer: false,
            comments: true
        });

        // Replace characters according to 'unescape' option
        var unescapeCharacters = function (rawHtml) {
            var matchKeys = Object.keys(options.unescape);
            if (matchKeys.length === 0) {
                return rawHtml;
            }
            var pattern = new RegExp('(' + matchKeys.join('|') + ')', 'g');
            return rawHtml.replace(pattern, function (match) {
                return options.unescape[match];
            });
        };

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
                    var templateUrl = path.join(options.prefix, path.relative(options.base, filepath)).replace(/\\/g, '/'),
                        deferModifier = options.defer ? 'defer="defer" ' : '';
                    return '<script type="text/ng-template" ' + deferModifier + 'id="' + templateUrl + '">\n' + grunt.file.read(filepath) + '\n</script>';
                }).join('\n\n');

            var $ = cheerio.load(grunt.file.read(f.dest), {
                ignoreWhitespace: false,
                xmlMode: false,
                lowerCaseTags: false
            });

            var $elem = $(options.selector);
            var method = $elem[options.method] || $elem.prepend;
            var comments = options.comments ? ['\n\n<!-- Begin Templates -->\n', '\n<!-- End Templates -->\n\n'] : ['', ''];
            method.call($elem, comments[0] + src + comments[1]);
            var html = unescapeCharacters($.html());
            grunt.file.write(f.dest, html);

            grunt.log.writeln('Templates inserted into "' + f.dest + '".');
        });
    });

};
