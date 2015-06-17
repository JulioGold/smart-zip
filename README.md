# smart-zip

```js
var smartZip = require("smart-zip");

// Usage
smartZip.zip('C:\\temp\\node_zip-origem\\app\\','C:\\temp\\node_zip-destino\\zip.zip',false,function(error){
	if (error) {
		throw error;
	}
	console.log('OK');
});

smartZip.zip('C:\\temp\\node_zip-origem\\app\\','C:\\temp\\node_zip-destino\\zipTopLevel.zip',true,function(error){
	if (error) {
		throw error;
	}
	console.log('OK');
});
```