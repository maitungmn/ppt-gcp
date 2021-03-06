let express = require('express');
let puppeteer = require('puppeteer');

let port = 8080;

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// let urlJP = "https://fir-maps-e4e81.firebaseapp.com/";
let urlJCN = "https://www.openstreetmap.org/#map=13/35.6919/139.7210";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
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
