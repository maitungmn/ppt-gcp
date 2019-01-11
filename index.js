let express = require('express');
let request = require('request');

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let urlJP = "https://fir-maps-e4e81.firebaseapp.com/";
// let urlJCN = "https://fir-maps-e4e81.firebaseapp.com/osm/";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
    request.get({
        url : urlJP,
        time : true
    },function(err, response){
        // console.log('Request time in ms', response);
        res.json({time: response.elapsedTime, image: response.body});
    });

});

app.set('port', process.env.PORT || 80);
app.listen(app.get('port'), () => {
    console.log('%c Server is running at ' + app.get('port'), 'background: #222; color: #bada55');
});
