const request = require('request');
const fs = require('fs');
const download_image = function(uri, filename, callback){
      //console.log('download image ran:'+filename);
  request.head(uri, function(err, res, body){
  console.log('content-type:', res.headers['content-type']);
  console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
 module.exports = download_image;