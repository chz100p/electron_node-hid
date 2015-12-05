

var crypto = require('crypto');
var md5hex = function(src){
  var md5hash = crypto.createHash('md5');
  md5hash.update(src, 'binary');
  return md5hash.digest('hex');
};

var diff_match_patch = require("./diff_match_patch_uncompressed");
var dmp = new diff_match_patch.diff_match_patch();

var fs = require('fs');
var text1 = fs.readFileSync('node_modules/node-hid/hidapi/windows/hid.c').toString();
var text1_hash = md5hex(text1);
if (text1_hash != 'c2467bf6ea683bad0b3145172ac7a20f'){
	if (text1_hash != 'c5554b7b5f577b90e652a1e58816ec83'){
		throw new Error('hid.c hash error');
	} else {
		console.log('hid.c patched.');
		process.exit(0);
	}
}


// var patch_text = (function(){/*
// @@ -6572,16 +6572,33 @@
//  ARE_READ
// +%7CFILE_SHARE_WRITE
//  ;%0A%0A%09hand
// */}).toString().match(/[^]*\/\*[^]([^]*)\*\/;?\}$/)[1];
var patch_text = fs.readFileSync('hid_win10.patch').toString();

//console.log('"' + patch_text + '"');

var patches = dmp.patch_fromText(patch_text);

var results = dmp.patch_apply(patches, text1);
var text2 = results[0];
results = results[1];

// console.log(md5hex(text1));
// console.log(md5hex(text2));

for (var x = 0; x < results.length; x++) {
  if (results[x]) {
      console.log(x, 'Success');
  } else {
      console.log(x, 'Fail');
  }
}

fs.writeFileSync('node_modules/node-hid/hidapi/windows/hid.c', text2);
