const express = require('express');
const fs = require('fs');
const path = require('path');
const PROJECT_ROOT = fs.existsSync(path.join(__dirname, 'package.json')) ? path.join(__dirname) : path.join(__dirname);

const puppeteer = require(PROJECT_ROOT);

const app = express();
const urlJP = 'https://fir-maps-e4e81.firebaseapp.com/';
const urlCN = 'http://39.105.116.224:8080/osm';

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function(req, res) {
  // const start = new Date();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const override = Object.assign(page.viewport(), {width: 1000});
  await page.setViewport(override);
  await page.goto(urlCN);
  const imageBuffer = await page.screenshot();
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({time: new Date() - start, image: imageBuffer}));

  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);

});

app.get('/jp', async function(req, res) {
  // const start = new Date();
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const override = Object.assign(page.viewport(), {width: 1000});
  await page.setViewport(override);
  await page.goto(urlJP);
  const imageBuffer = await page.screenshot();
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({time: new Date() - start, image: imageBuffer}));

  res.set('Content-Type', 'image/png');
  res.send(imageBuffer);

});

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'));
