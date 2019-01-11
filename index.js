let express = require('express');
let request = require('request');

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let urlJP = "https://asia-northeast1-alibaba-baidu.cloudfunctions.net/screenshot?" +
    "url=https://fir-maps-e4e81.firebaseapp.com/";
// let urlJCN = "https://fir-maps-e4e81.firebaseapp.com/osm/";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
    request.get({
        url : urlJP,
        time : true
    },function(err, response){
        console.log('Request time in ms', response);
        console.log('Request time in bodty', response.body);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({time: response.elapsedTime, image: response.body}));
        // res.json({time: response.elapsedTime, image: response.body});

        // res.send(response.body);
    });

});

let portSV = 80;
app.set('port', process.env.PORT || portSV);
app.listen(app.get('port'), () => {
    console.log('Server is running at PORT ' + portSV);
});
