'use strict';

var grunt = require('grunt');

exports.inline_angular_templates = {
    setUp: function (done) {
        // setup here if necessary
        done();
    },
    custom_options: function (test) {
        test.expect(1);

        var actual = grunt.file.read('tmp/index.html');
        var expected = grunt.file.read('test/expected/custom_options');
        test.equal(actual, expected, 'should describe what the default behavior is.');

        test.done();
    }
};
