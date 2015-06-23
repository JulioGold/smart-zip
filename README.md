# smart-zip

Removed the dependencies not used and changed to work on windows and ios.

Usage
-----

```javascript

var smartZip = require("smart-zip");

// Use to don't put files into .zip, each match won't be inserted into .zip
var regexExcludes = ['index.html'];

// Generate zip without top folder
smartZip.zip('app\\','zip.zip',false,regexExcludes,function(error){
	if (error) {
		throw error;
	}
	console.log('zip file created without top folder.');
});

// Generate zip with top folder
smartZip.zip('app\\','zipTopLevel.zip',true,regexExcludes,function(error){
	if (error) {
		throw error;
	}
	console.log('zip file created with top folder.');
});

// Unzip the files
smartZip.unzip("app1.zip","app1",function(error) {
	if (error) {
		throw error;
	}
	console.log('File unziped.');
});

```