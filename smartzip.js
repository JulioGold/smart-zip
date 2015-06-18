var fs = require("fs");
var path = require("path");
var jszip = require("jszip");
var decompress = require("decompress-zip");

var smartZip = {
	zip: zip,
	unzip: unzip
};

module.exports = smartZip;

function unzip(zipPath,directoryPath,done) {

	var name = path.basename(zipPath);
	var unzipper = new decompress(zipPath);

	unzipper.on("error",function(error) {
		done(error);
	});
	unzipper.on("extract",function() {
		done();
	});
	unzipper.extract({
		path: directoryPath,
	});

	return smartZip;
}

function zip(rootDir, saveTo, generateTopFolder, done) {
	
	var zip = new jszip();
	rootDir = path.resolve(rootDir);

	if (done === undefined) {
		done = generateTopFolder;
		generateTopFolder = false;
	};

	function recurse(fullPath, parentZip, first, callback) {
		fs.stat(fullPath, function(err, stat) {
			if (err) return callback(err);
			var dir = path.dirname(fullPath);
			var file = path.basename(fullPath);
			if (stat.isDirectory()) {
				var folderZip = first ? parentZip : parentZip.folder(file);
				fs.readdir(fullPath, function(err, files) {
					if (err) return callback(err);
					if (!files.length) return callback();
					var count = files.length;
					files.forEach(function(file) {
						var filePath = path.resolve(fullPath, file);
						recurse(filePath, folderZip, false, function(err) {
							if (!--count) {
								callback(err);
							}
						});
					});
				});
			} else {
				fs.readFile(fullPath, function(err, data) {
					parentZip.file(file, data);
					callback(err);
				});
			}
		});
	}

	recurse(rootDir, zip, !generateTopFolder, function(error) {
		if (error) {
			done(error);
		} else {
			var buffer = zip.generate({
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
}