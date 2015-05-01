'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var swfBuild = require('swf-build');
var path = require('path');
var fs = require('fs');

module.exports = function (output,params) {
	// console.log('?????')
	var done;
	function flashBuild(file, enc, callback) {
		if (file.isNull() || path.extname(file.path)!='.as') return callback(null, file);
		if (file.isStream()) return callback(new gutil.PluginError('gulp-flash', 'Streaming not supported'));

		var self = this;

		var args = [file.path]; // input

		if(typeof output==='string') { // if string are output path
			args.push((fs.lstatSync(output).isDirectory() ? path.resolve(output,path.basename(file.path,'.as')+'.swf') : path.resolve(output)));
		}

		if(typeof output==='object') {
			args.push(output);
		} else {
			if(params) args.push(params);
		}

		args.push(function(err, stdout, stderr){ // callback
			callback(err, file);
		});

		swfBuild.bind.apply(swfBuild, [null].concat(args))();
	}

	return through.obj(flashBuild)
};



// var output = './test/swf/main.swf';
// 		swfBuild('./test/main.as',output,{
// 			'library-path': [
// 				'./test/libs'
// 			],
// 			'source-path': [
// 				'./test/zClass'
// 			],
// 			'swf-version': 13,
// 			'use-gpu': true
// 		},function(err, stdout, stderr){
// 			expect(err).to.be.null;
// 			expect(typeof fs.readFileSync(output)).to.be.equals('object');
// 			fs.unlinkSync(output)
// 			done();
// 		});



// module.exports = function (opt) {
// 	function imageHost (file, encoding, callback) {
// 		if (file.isNull()) return callback(null, file);

// 		if (file.isStream()) return callback(new gutil.PluginError('gulp-image-autohost', 'doesn\'t support Streams'));

// 		var $ = cheerio.load(String(file.contents));
// 		var imageUploads = [];
// 		$('img').each(function(ind,e){
// 			imageUploads.push(function(callback){
// 				var element = $(e);
// 				imgur.uploadFile(path.resolve(file.path,'../',$(e).attr('src')))
// 				.then(function (json) {
// 					element.attr('src',json.data.link)
// 					callback(null,json.data.link);
// 				})
// 				.catch(function (err) {
// 					console.error(err.message);
// 					console.error('Image Path Not Found');
// 					console.error(path.resolve(file.path,'../',element.attr('src')));
// 					callback(null,element.attr('src'));
// 				});
// 			});
// 		});

// 		async.parallel(imageUploads,function(err,res){
// 			file.contents = new Buffer($.html());
// 			callback(null,file);
// 		});
// 	}

// 	return through.obj(imageHost);
// };
