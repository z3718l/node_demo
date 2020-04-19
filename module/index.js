var request = require('request')
var cheerio = require('cheerio')

var initModule = {
    getData: function(fn) {
        request('https://www.baidu.com/', function (error, response, body) {
        //   console.error('error:', error); // Print the error if one occurred
        //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //   console.log('body:', body); // Print the HTML for the Google homepage.
          var $ = cheerio.load(body)
        //   console.log($('#su'), '====')
          fn($('#su').val())
        });
    }
}
module.exports = initModule
