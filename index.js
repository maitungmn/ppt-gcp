let express = require('express');
let request = require('request');
let puppeteer = require('puppeteer');

let port = 8080;

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// let urlJP = "https://fir-maps-e4e81.firebaseapp.com/";
let urlJCN = "https://fir-maps-e4e81.firebaseapp.com/osm/";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET, POST');
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    let start = new Date();
    await page.goto(urlJCN);
    const imageBuffer = await page.screenshot();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({time: new Date() - start, image: imageBuffer}));

});

app.set('port', process.env.PORT || port);
app.listen(app.get('port'), () => {
    console.log('App is running on PORT ' + port)
});
