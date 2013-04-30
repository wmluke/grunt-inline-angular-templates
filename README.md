# grunt-inline-angular-templates

> Inline angular templates into an HTML file

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-inline-angular-templates --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-inline-angular-templates');
```

## The "inline_angular_templates" task

### Overview
In your project's Gruntfile, add a section named `inline_angular_templates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    inline_angular_templates: {
        options: {
            base: 'dist/views',
            prefix: '/'
        },
        files: {
            'dist/index.html': [
                'dist/views/template1.html',
                'dist/views/template2.html'
            ]
        }
    }
})
```

### Options

#### options.base
Type: `String`
Default value: Grunt working folder

Relative folder

#### options.prefix
Type: `String`
Default value: `''`

ID url prefix

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
