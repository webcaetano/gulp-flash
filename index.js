'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var swfBuild = require('swf-build');
var path = require('path');
var fs = require('fs');
var var beep = require('beepbeep');

module.exports = function (output,params) {
	function flashBuild(file, enc, callback) {
		if (file.isNull() || path.extname(file.path)!='.as') return callback(null, file);
		if (file.isStream()) return callback(new gutil.PluginError('gulp-flash', 'Streaming not supported'));

		var self = this;

		var args = [file.path]; // input

		if(typeof output==='string') { // if string are output path
			args.push((!path.extname(path.resolve(output)) ? path.resolve(output,path.basename(file.path,'.as')+'.swf') : path.resolve(output)));
		}

		if(typeof output==='object') { //params
			args.push(output);
		} else {
			if(params) args.push(params);
		}

		args.push(function(err, stdout, stderr){ // callback
			if(err) {
				beep();
				console.log(err);
			}
			callback(null, file);
		});

		swfBuild.bind.apply(swfBuild, [null].concat(args))();
	}

	return through.obj(flashBuild)
};
