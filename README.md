# grunt-inline-angular-templates

> Inline angular templates into an HTML file

[![Build Status](https://travis-ci.org/wmluke/grunt-inline-angular-templates.png?branch=master)](https://travis-ci.org/wmluke/grunt-inline-angular-templates)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/wmluke/grunt-inline-angular-templates/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

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
                base: 'dist/templates', // (Optional) ID of the <script> tag will be relative to this folder. Default is project dir.
                prefix: '/',            // (Optional) Prefix path to the ID. Default is empty string.
                selector: 'body',       // (Optional) CSS selector of the element to use to insert the templates. Default is `body`.
                method: 'prepend'       // (Optional) DOM insert method. Default is `prepend`.
                unescape: {             // (Optional) List of escaped characters to unescape
                    '&lt;': '<',
                    '&gt;': '>',
                    '&apos;': '\'',
                    '&amp;': '&'
                }
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

If bundling templates into a JS file is more your thing, check out https://github.com/ericclemmons/grunt-angular-templates.

### Options

#### options.base
Type: `String`
Default value: Grunt working folder

ID of the `<script>` tag will be relative to this folder

#### options.prefix
Type: `String`
Default value: Empty string

Append this prefix to the template ID.

#### options.selector
Type: `String`
Default value: 'body'

The CSS selector of the element to use to insert the templates.

#### options.method
Type: `String`
Values: append | prepend | replaceWith | after | before
Default value: 'prepend'

The DOM method used to insert the templates.

#### options.unescape
Type: `Object`
Default value: '{}'

List of escaped characters to unescape.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
