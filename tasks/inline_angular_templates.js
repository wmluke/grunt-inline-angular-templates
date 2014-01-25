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
            prefix: '',
            selector: 'body',
            method: 'prepend',
            unescape: {}
        });

        // Replace characters according to 'unescape' option
        var unescapeCharacters = function(raw_html){
          var match_keys = Object.keys(options.unescape);
          var unescaped_html = raw_html;
          // Generating RegExp from 'option.unescape' keys
          var _generateRegexp = function(chars){
            var ribbon = "";
            chars.forEach(function(item, index){
              ribbon += item;
              if(index !== chars.length - 1){
                ribbon += "|";
              }
            });
            return new RegExp("(" + ribbon + ")", "g");
          };
          // Get substitution character
          var _fitCharacter = function(match){
            return options.unescape[match];
          };
          if(match_keys.length > 0){
            var pattern = _generateRegexp(match_keys);
            unescaped_html = raw_html.replace(pattern, _fitCharacter);
          }
          return unescaped_html;
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
                    var templateUrl = path.join(options.prefix, path.relative(options.base, filepath)).replace(/\\/g, '/');
                    return '<script type="text/ng-template" id="' + templateUrl + '">\n' + grunt.file.read(filepath) + '\n</script>';
                }).join('\n\n');

            var $ = cheerio.load(grunt.file.read(f.dest), {
                ignoreWhitespace: false,
                xmlMode: false,
                lowerCaseTags: false
            });

            var $elem = $(options.selector);
            var method = $elem[options.method] || $elem.prepend;
            method.call($elem, '\n\n<!-- Begin Templates -->\n' + src + '\n<!-- End Templates -->\n\n');
            var html = unescapeCharacters($.html());
            grunt.file.write(f.dest, html);

            grunt.log.writeln('Templates inserted into "' + f.dest + '".');
        });
    });

};
