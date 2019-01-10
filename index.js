let express = require('express');
let request = require('request');

let app = express();
let urlJP = "https://asia-northeast1-alibaba-baidu.cloudfunctions.net/screenshot?" +
    "url=https://fir-maps-e4e81.firebaseapp.com/";
let urlCN = "https://asia-northeast1-alibaba-baidu.cloudfunctions.net/screenshot?" +
    "url=https://fir-maps-e4e81.firebaseapp.com/osm/";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    request.get({
        url : urlJP,
        time : true
    },function(err, response, body){
        console.log('Request time in ms', response.elapsedTime);
        console.log('Body', body);
    });
    res.send('hello')
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
