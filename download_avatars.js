var request = require('request');
var secrets = require('./secrets');
const fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + secrets.GITHUB_TOKEN
        //   Authorization': secrets.GITHUB_TOKEN
        }
      };
        console.log(options);

      request(options, function(err, res, body) {
        var parsed = JSON.parse(body);
        cb(err, parsed);
      });

  }

// download image
  function downloadImageByURL(url, filePath) {
    
    request.get(url)             
       .on('error', function (err) {                                 
         throw err; 
       })
       .on('response', function (response) {
        console.log('Status Code: ', response.statusCode);        
        console.log('Status Message: ', response.statusMessage);
        console.log('Content-Type: ', response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath));            

  }

  
  function x(err, afterParsed){
    afterParsed.forEach(function(ele){
        var path = "avatars/" + ele.login + ".jpg";
        var url = ele.avatar_url
        downloadImageByURL(url, path);
    });
}

  getRepoContributors('jquery', 'jquery', x)

  //downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")