'use strict';

var grunt = require('grunt');

exports.inline_angular_templates = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    default_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/default.html');
        var expected = grunt.file.read('test/expected/default_options');
        test.equal(actual, expected);

        test.done();
    },
    custom_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/custom.html');
        var expected = grunt.file.read('test/expected/custom_options');
        test.equal(actual, expected);

        test.done();
    }
};
