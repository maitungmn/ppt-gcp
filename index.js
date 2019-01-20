let express = require('express');
let request = require('request');
let puppeteer = require('puppeteer');

let app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let urlHK = "http://47.244.107.231:8080/osm";
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
    await page.close()

    // res.set('Content-Type', 'image/png');
    // res.send(imageBuffer);

});

app.get('/hk', async function (req, res) {
    let start = new Date();
    const browser = await puppeteer.launch({
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    const override = Object.assign(page.viewport(), {width: 1000});
    await page.setViewport(override);
    try {
        await page.goto(urlHK);
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
