# smart-zip

Usage
-----

```javascript

var smartZip = require("smart-zip");

// Use to don't put files into .zip, each match won't be inserted into .zip
var regexExcludes = ['index.html'];

smartZip.zip('app\\','zip.zip',false,regexExcludes,function(error){
	if (error) {
		throw error;
	}
	console.log('OK');
});

smartZip.zip('app\\','zipTopLevel.zip',true,regexExcludes,function(error){
	if (error) {
		throw error;
	}
	console.log('OK');
});

smartZip.unzip("app1.zip","app1",function(error) {
	if (error) {
		throw error;
	}
	console.log('OK');
});

```