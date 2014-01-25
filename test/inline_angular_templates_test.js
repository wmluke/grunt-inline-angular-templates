'use strict';

var grunt = require('grunt');

function stripBlankLines(content) {
    return content.replace(/^\s+$/gm, '');
}

exports.inline_angular_templates = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default.html');
        var expected = grunt.file.read('test/expected/default');
        test.equal(actual, expected);

        test.done();
    },
    custom_options_replaceWith: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-replaceWith.html');
        var expected = grunt.file.read('test/expected/custom-replaceWith');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    custom_options_append: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-append.html');
        var expected = grunt.file.read('test/expected/custom-append');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    custom_options_after: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-after.html');
        var expected = grunt.file.read('test/expected/custom-after');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    custom_options_before: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-before.html');
        var expected = grunt.file.read('test/expected/custom-before');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    no_munging_attribute_names: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/no-munging-attribute-names.html');
        test.ok(actual.indexOf('data-ng-app')!==-1, 'attribute names should not be munged');

        test.done();
    },
    custom_options_unescape: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-unescape.html');
        var expected = grunt.file.read('test/expected/custom-unescape');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
};
