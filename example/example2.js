var smartZip = require("../smartzip.js");
var fs = require("fs");

var zipFileStream = fs.createReadStream('app1.zip');

// Unzip the stream
smartZip.unzipFromStream(zipFileStream, "app1Stream", function (error) {
	if (error) {
		throw error;
	}
	console.log('Stream unziped.');
});