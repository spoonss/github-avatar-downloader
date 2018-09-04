var request = require('request');
var secrets = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
      };
        console.log(options);

      request(options, function(err, res, body) {
        var parsed = JSON.parse(body);
        cb(err, parsed);
      });

  }

  
  function x(err, afterParsed){
    console.log(err, afterParsed);
    afterParsed.forEach(function(ele){
        console.log(ele.avatar_url);
    });
}

  getRepoContributors('jquery', 'jquery', x)