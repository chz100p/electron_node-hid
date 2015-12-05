
var crypto = require('crypto');
var md5hex = function(src){
  var md5hash = crypto.createHash('md5');
  md5hash.update(src, 'binary');
  return md5hash.digest('hex');
};

var diff_match_patch = require("./diff_match_patch_uncompressed");
var dmp = new diff_match_patch.diff_match_patch();

var fs = require('fs');
var text1 = fs.readFileSync('hid_orig.c').toString();
var text2 = fs.readFileSync('hid_win10.c').toString();
var diff = dmp.diff_main(text1, text2, true);

if (diff.length > 2) {
  dmp.diff_cleanupSemantic(diff);
}

var patch_list = dmp.patch_make(text1, text2, diff);
var patch_text = dmp.patch_toText(patch_list);

//console.log(md5hex(text1));
//console.log(md5hex(text2));
//console.log('"' + patch_text + '"');
console.log(patch_text);
