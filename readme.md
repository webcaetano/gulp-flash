# Gulp Flash

### Installation

```
npm install gulp-flash
```

### Documentation


Single file

```javascript
var flash = require('gulp-flash');

gulp.src('src/main.as')
.pipe(flash()) // will out pull main.swf in same folder
```

Multi file

```javascript
gulp.src('src/*.as')
.pipe(flash()) // will out pull all .swf in same folder
```


Multi file with swf output

```javascript
gulp.src('src/*.as')
.pipe(flash('swf/')) // will out pull all .swf in target folder
```

With parameters

```javascript
gulp.src('src/*.as')
.pipe(flash('swf/',{
	'library-path': [
		'./libs'
	],
	'source-path': [
		'./zClass'
	],
	'swf-version': 13,
	'use-gpu': true
}))) // will out pull all .swf in target folder using this parameters

// or 

gulp.src('src/*.as')
.pipe(flash({
	'library-path': [
		'./libs'
	],
	'source-path': [
		'./zClass'
	],
	'swf-version': 13,
	'use-gpu': true
}))) // will out pull all .swf in same folder using this parameters
```


---------------------------------

The MIT [License](https://raw.githubusercontent.com/webcaetano/gulp-flash/master/LICENSE.md)
