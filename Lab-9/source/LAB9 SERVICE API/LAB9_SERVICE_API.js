/**
 * Created by SAI TEJA MAKANI 25 OCT 2016.
 */
var express = require('express');
var app = express();
var request = require('request');
app.get('/getDetails',function (req, res) {
    var result={
        'description': []
    };

    console.log(req.query["name_p"]);
    //console.log(res);

    request('https://kgsearch.googleapis.com/v1/entities:search?query=' + req.query["name_p"] + '&key=AIzaSyC_JB8BlVHxXdKPBv6kPE9JniJpbBlVNWg&limit=5&indent=True', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        var details = body.itemListElement;
        for(var i=0;i<details.length;i++)
        {
            result.description.push({'description': details[i].result.description});
        }
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
    });
    console.log(result);




})

var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})