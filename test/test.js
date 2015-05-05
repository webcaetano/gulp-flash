'use strict';
var	gulp = require('gulp');
var flash = require('../');
var swfBuild = require('swf-build');
var expect = require('chai').expect;
var through = require('through2');
var fs = require('fs');
var path = require('path');
var glob = require('glob');

describe('gulp-flash', function() {

	var filename = __dirname + '/main.as';
	var files = __dirname + '/*.as';

	it('should build one .as files', function(done) {
		this.timeout(8000);
		gulp.src(filename)
		.pipe(flash())
		.pipe(through.obj(function (file, enc, callback) {
			var output = __dirname + '/main.swf';
			expect(typeof fs.readFileSync(output)).to.be.equals('object');
			fs.unlinkSync(output)
			done();
		}));
	});

	it('should build all .as files', function(done) {
		this.timeout(10000);

		var filesArr = glob.sync(files);
		var pipeNum = 0;
		gulp.src(files)
		.pipe(flash())
		.pipe(through.obj(function (file, enc, callback){
			expect(file).to.be.an('object');
			if(++pipeNum==filesArr.length){
				for(var i in filesArr){
					var output = path.resolve(path.dirname(filesArr[i])+'/'+path.basename(filesArr[i],'.as')+'.swf');
					expect(fs.readFileSync(output)).to.be.an('object');
					fs.unlinkSync(output);
				}
				done();
			}
			callback();
		}));
	});

	it('should build all .as files and output on target folder', function(done) {
		this.timeout(10000);
		var filesArr = glob.sync(files);
		var pipeNum = 0;
		var outputFoder = __dirname+'/swf';

		gulp.src(files)
		.pipe(flash(outputFoder))
		.pipe(through.obj(function (file, enc, callback) {
			expect(file).to.be.an('object');
			if(++pipeNum==filesArr.length){
				for(var i in filesArr){
					var output = path.resolve(outputFoder,path.basename(filesArr[i],'.as')+'.swf');
					expect(fs.readFileSync(output)).to.be.an('object');
					fs.unlinkSync(output);
				}
				done();
			}
			callback();
		}));
	});

	it('should build all .as files and output on target folder with parameters', function(done) {
		this.timeout(10000);
		var filesArr = glob.sync(files);
		var pipeNum = 0;
		var outputFoder = __dirname+'/swf';

		gulp.src(files)
		.pipe(flash(outputFoder,{
			'library-path': [
				__dirname+'/libs'
			],
			'source-path': [
				__dirname+'/zClass'
			],
			'swf-version': 13,
			'use-gpu': true
		}))
		.pipe(through.obj(function (file, enc, callback) {
			expect(file).to.be.an('object');
			if(++pipeNum==filesArr.length){
				for(var i in filesArr){
					var output = path.resolve(outputFoder,path.basename(filesArr[i],'.as')+'.swf');
					expect(fs.readFileSync(output)).to.be.an('object');
					fs.unlinkSync(output);
				}
				done();
			}
			callback();
		}));
	});
});
