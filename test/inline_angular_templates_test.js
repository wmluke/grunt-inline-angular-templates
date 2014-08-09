'use strict';

var grunt = require('grunt');

function stripBlankLines(content) {
    return content.replace(/^\s+$/gm, '');
}

exports.inlineAngularTemplates = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    defaultOptions: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default.html');
        var expected = grunt.file.read('test/expected/default');
        test.equal(actual, expected);

        test.done();
    },
    customOptionsReplaceWith: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-replaceWith.html');
        var expected = grunt.file.read('test/expected/custom-replaceWith');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    customOptionsAppend: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-append.html');
        var expected = grunt.file.read('test/expected/custom-append');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    customOptionsAfter: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-after.html');
        var expected = grunt.file.read('test/expected/custom-after');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    customOptionsBefore: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-before.html');
        var expected = grunt.file.read('test/expected/custom-before');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    noMungingAttributeNames: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/no-munging-attribute-names.html');
        test.ok(actual.indexOf('data-ng-app')!==-1, 'attribute names should not be munged');

        test.done();
    },
    customOptionsUnescape: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom-unescape.html');
        var expected = grunt.file.read('test/expected/custom-unescape');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    deferNotPresent: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/defer-not-present.html');
        var expected = grunt.file.read('test/expected/defer-not-present.html');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    deferPresent: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/defer-present.html');
        var expected = grunt.file.read('test/expected/defer-present.html');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    },
    commentsDisabled: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/comments-disabled.html');
        var expected = grunt.file.read('test/expected/comments-disabled.html');
        test.equal(stripBlankLines(actual), stripBlankLines(expected));

        test.done();
    }
};
