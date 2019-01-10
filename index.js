let express = require('express');
let request = require('request');
let puppeteer = require('puppeteer');

let app = express();
let urlJP = "https://fir-maps-e4e81.firebaseapp.com/";
// let urlJCN = "https://fir-maps-e4e81.firebaseapp.com/osm/";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(urlJP);
    const imageBuffer = await page.screenshot();
    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);

});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
