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
        dist: {
            options: {
                base: 'dist/templates', // (Optional) ID of the <script> tag will be relative to this folder
                prefix: '/'             // (Optional) Prefix path to the ID
            },
            files: {
                'dist/index.html': ['dist/templates/views/*.html']
            }
        }
    }
})
```

This will prepend the template files into the body of `dist/index.html` something like...

```html
<html>
<body>
<!-- Begin Templates -->
<script type="text/ng-template" id="/views/template1.html">
<div>
    <h1>Template 1</h1>
</div>
</script>

<script type="text/ng-template" id="/views/template2.html">
<div>
    <h1>Template 2</h1>
</div>
</script>
<!-- End Templates -->

<div ng-view></div>
</body>
</html>
```

### Options

#### options.base
Type: `String`
Default value: Grunt working folder

ID of the <script> tag will be relative to this folder

#### options.prefix
Type: `String`
Default value: `''`

Prefix path to the ID

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
