# smart-zip

Usage
-----

```javascript

var smartZip = require("smart-zip");

smartZip.zip('app\\','zip.zip',false,function(error){
	if (error) {
		throw error;
	}
	console.log('OK');
});

smartZip.zip('app\\','zipTopLevel.zip',true,function(error){
	if (error) {
		throw error;
	}
	console.log('OK');
});

smartZip.unzip("app1.zip","app1",function(error) {});

```