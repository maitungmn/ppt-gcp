let express = require('express');
let request = require('request');
let puppeteer = require('puppeteer');

let app = express();
let urlJP = "https://fir-maps-e4e81.firebaseapp.com/";
let urlCN = "http://39.105.116.224:8080/osm";

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
    let start = new Date();
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const override = Object.assign(page.viewport(), {width: 1000});
    await page.setViewport(override);
    await page.goto(urlCN);
    const imageBuffer = await page.screenshot();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({time: new Date() - start, image: imageBuffer}));

    // res.set('Content-Type', 'image/png');
    // res.send(imageBuffer);

});

app.get('/jp', async function (req, res) {
    let start = new Date();
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const override = Object.assign(page.viewport(), {width: 1000});
    await page.setViewport(override);
    try {
        await page.goto(urlJP);
        const imageBuffer = await page.screenshot();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({time: new Date() - start, image: imageBuffer}));
    } catch (e) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({time: new Date() - start, image: e}));
    } finally {
        await page.close()
    }


    // res.set('Content-Type', 'image/png');
    // res.send(imageBuffer);

});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));
