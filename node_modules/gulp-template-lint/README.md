# gulp-template-lint
![logo](https://d30y9cdsu7xlg0.cloudfront.net/png/30843-200.png)

Wrap of [template-lint](https://github.com/MeirionHughes/template-lint) as a simple gulp plugin in order to sanity check html

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![Travis Status][travis-image]][travis-url]

## install
```
npm install gulp-template-lint
```

## usage

```
var gulp = require('gulp');
var linter = require('gulp-template-lint');

gulp.task('lint-template-html', function () {
    return gulp.src('**/*.html')
        .pipe(linter())
        .pipe(gulp.dest('output'));
});
 
```

## configure rules

you can override the default set of rules by supplying an array of rules.

```
var gulp = require('gulp');
var linter = require('gulp-template-lint');

var SelfClose = require('template-lint').SelfCloseRule;

var rules = [new SelfClose()];

gulp.task('build-html', function () {
    return gulp.src('**/*.html')
        .pipe(linter(rules))
        .pipe(gulp.dest('output'));
});
```

## adding obsolete tags and attributes

the obsolete rules aren't part of the default rule-set; 
you can add them in and define obsolete tags and attributes

```
var gulp = require('gulp');
var linter = require('gulp-template-lint');

var SelfClose = require('template-lint').SelfCloseRule;
var ParserRule = require('template-lint').ParserRule;
var ObsoleteTagRule = require('template-lint').ObsoleteTagRule;
var ObsoleteAttributeRule = require('template-lint').ObsoleteAttributeRule;

var obsoleteTags = [
    {tag:'my-old-tag', msg:'its really old....'}
];
var obsoleteAttributes = [
    {attr:'myattribute'}, 
    {attr:'moo', tag:'my-old-tag'}, //obsolete only when on for my-old-tag 
    {attr:'fubar', msg:'uh uh... '}
];

var rules = [
    new SelfClose(),
    new ParserRule(),
    new ObsoleteTagRule(obsoleteTags), 
    new ObsoleteAttributeRule(obsoleteAttributes)
];

gulp.task('build-html', function () {
    return gulp.src('**/*.html')
        .pipe(linter(rules))
        .pipe(gulp.dest('output'));
});
```

##Icon

Icon courtesy of [The Noun Project](https://thenounproject.com/)

[npm-url]: https://npmjs.org/package/gulp-template-lint
[npm-image]: http://img.shields.io/npm/v/gulp-template-lint.svg

[npm-url]: https://npmjs.org/package/gulp-template-lint
[npm-image]: http://img.shields.io/npm/v/gulp-template-lint.svg
[npm-downloads]: http://img.shields.io/npm/dm/gulp-template-lint.svg
[travis-url]: https://travis-ci.org/MeirionHughes/gulp-template-lint
[travis-image]: https://img.shields.io/travis/MeirionHughes/gulp-template-lint/master.svg
