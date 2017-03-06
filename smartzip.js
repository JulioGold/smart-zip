var fs = require("fs");
var path = require("path");
var jszip = require("jszip");
var unzipLib = require('unzip');

var smartZip = {
	zip: zip,
	unzip: unzip,
	unzipFromStream: unzipFromStream
};

module.exports = smartZip;

function zip(rootDir, saveTo, generateTopFolder, regexExcludes, done) {

	var jsZip = new jszip();
	rootDir = path.resolve(rootDir);

	if (done === undefined && regexExcludes === undefined) {
		done = generateTopFolder;
		regexExcludes = [];
		generateTopFolder = false;
	} else if (done === undefined) {
		done = regexExcludes;
		regexExcludes = [];
	}

	function recurse(fullPath, parentZip, first, regexExcludes, callback) {

		fs.stat(fullPath, function(err, stat) {

			if (err) return callback(err);
			var file = path.basename(fullPath);


			if (stat.isDirectory()) {
				var excluded = false;
				var len = regexExcludes.length;
				for (var i = 0; i < len; i++) {
					if (file.match(regexExcludes[i])) {
						excluded = true;
					}
				}

				if (excluded === false) {
					var folderZip = first ? parentZip : parentZip.folder(file);

					fs.readdir(fullPath, function(err, files) {

						if (err) { return callback(err); }
						if (!files.length) { return callback(); }
						var count = files.length;

						files.forEach(function(file) {

							var filePath = path.resolve(fullPath, file);

							recurse(filePath, folderZip, false, regexExcludes, function(err) {
								if (!--count) {
									callback(err);
								}
							});
						});
					});
				}
				else {
					callback(err);
				}


			} else {

				var excluded = false;
				var len = regexExcludes.length;
				for (var i = 0; i < len; i++) {
					if (file.match(regexExcludes[i])) {
						excluded = true;
					}
				}

				fs.readFile(fullPath, function(err, data) {
					if (excluded === false) {
						parentZip.file(file, data);
					}
					callback(err);
				});
			}
		});
	};

	recurse(rootDir, jsZip, !generateTopFolder, regexExcludes, function(error) {

		if (error) {
			done(error);
		} else {

			var buffer = jsZip.generate({
				compression: "DEFLATE",
				type: "nodebuffer",
			});

			fs.writeFile(saveTo, buffer, {
				encoding: "binary"
			}, function(error) {
				done(error);
			});
		}
	});

	return smartZip;
};

function unzip(zipFilePath, targetPath, done) {

	var zipStream = fs.createReadStream(zipFilePath);
	unzipFromStream(zipStream, targetPath, done);

	return smartZip;
};

function unzipFromStream(zipFileStream, targetPath, done) {

	zipFileStream
		.pipe(
			unzipLib.Extract({ path: targetPath })
		)
		.on("error",function(error) {
			done(error);
		})
		.on("close",function() {
			done();
		});

	return smartZip;
};
