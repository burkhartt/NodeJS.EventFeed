/**
 * Module dependencies.
 */
 
var express = require('express')
, cheerio = require('cheerio')
, request = require('request')
, url = require('url')
, app = module.exports = express();

app.get('/nodetube', function(req, res){
   //Tell the request that we want to fetch youtube.com, send the results to a callback function
        request({
			uri: 'http://crossroadspresents.com/brighton-music-hall/'
		}, function(err, response, body){
			var self = this;
			self.items = new Array();
			
			//Just a basic error check
            if(err && response.statusCode !== 200){console.log('Request error.');}
			
			var $ = cheerio.load(body),			
			$body = $('body'),
			$eventdetails = $body.find('.eventdetails');
						
			$eventdetails.each(function(i, item){			
				var $title = $(item).find('.headliners').text();
				self.items[i] = { title : $title.trim() };
			});
			console.log(self.items);
        });
});

app.listen(3000);