var http = require('http');//gets http
var fs = require('fs');//gets file system

var server = http.createServer(function(req, res){//creates a server
  
  if (req.url === "/") {//check for url that i am going to pass
  		fs.readFile("./index.html", "UTF-8", function (err, html) {
  			res.writeHead(200, {"Content-Type":"text/html"});
	  		res.end(html);	
  		});
  } else if (req.url == "/api") {
  		var language = req.headers['accept-language'].split(";")[0];//requests language
		var userAgent = req.headers['user-agent'];//requests user agent
		 /* 
			In case you are running this application using any proxy, every single IP addresses will be 127.0.0.1 
		 Probably you can see the problem now. But chill solution is simple.
	  	 Look for the originating IP address in the (X-Forwarded-For) HTTP header. 
	  	 You will find it in req.header('x-forwarded-for').----This is the most important part 
	  	 although knowing it, here is the best way to get the IP address of a user:
	    var ip = req.headers('x-forwarded-for') || req.connection.remoteAddress;---as i have used below
	    Now you can be sure the variable ip will catch the IP address of the client, not of your proxy's. */
		var ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	  
	  res.writeHead(200, {"Content-Type": "text/plain"});
	
	// get IP etc of the user
	  var respObject = {	   
	    ipaddress: ip,
	    "language": language,
	    "software": userAgent
	  };
	  res.end(JSON.stringify(respObject));//put it into browser
  
  } else {
	// 404 not found  
		res.writeHead(404,  {"Content-Type": "text/plain"} );
		res.end("Sorry buddy you got 404 error");
  }
});
var portNo = 8080;
if (!isNaN(process.env.PORT)) { 
  
  server.listen(process.env.PORT, function() {//connect to port
    console.log('App started on http://localhost:' +
        process.env.PORT + '; press Ctrl+C to terminate');
  });
} else {
  server.listen(portNo, function() {
    console.log('App started on http://localhost:' +
        portNo + '; press Ctrl+C to terminate');
  });
}