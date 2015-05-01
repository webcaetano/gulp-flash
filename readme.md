# gulp-flash [![Build Status](https://travis-ci.org/webcaetano/gulp-flash.svg?branch=master)](https://travis-ci.org/webcaetano/gulp-flash)

> My geometric gulp plugin


## Install

```
$ npm install --save-dev gulp-flash
```


## Usage

```js
var gulp = require('gulp');
var flash = require('gulp-flash');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(flash())
		.pipe(gulp.dest('dist'));
});
```


## API

### flash(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [](https://github.com/webcaetano)
