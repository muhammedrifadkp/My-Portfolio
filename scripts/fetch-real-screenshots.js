import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const projectUrls = [
  { id: 'ztoiq', url: 'https://ztoiq.com/' },
  { id: 'agstarautomobiles', url: 'https://agstarautomobiles.vercel.app' },
  { id: 'zhmrealestatellc', url: 'https://zhmrealestatellc.ae' },
  { id: 'adfirms', url: 'https://businesssetup.ad-firms.com' },
  { id: 'dailyhoreca', url: 'https://www.dailyhoreca.com' },
  { id: 'onepackonline', url: 'https://www.onepackonline.com/' },
  { id: 'cdc-attendance', url: 'https://cdc-attendance-com.vercel.app' },
  { id: 'rasdent', url: 'https://rasdent.in' },
  { id: 'b4baking', url: 'https://www.b4baking.com' },
  { id: 'chillera', url: 'https://www.chillera.co.in' },
  { id: 'zuditt', url: 'https://www.zuditt.com/' },
  { id: 'my-ecommerce', url: 'https://my-ecommerce-black.vercel.app/' },
  { id: 'nasiha', url: 'https://nasiha-arc.vercel.app/' },
  { id: 'rain-forest', url: 'https://rain-forest.vercel.app' },
  { id: 'portfolio-3d', url: 'https://muhammedrifad.vercel.app/' }
];

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  console.log('Fetching real website landing page screenshots for 15 projects...');
  for (const item of projectUrls) {
    try {
      console.log(`Fetching screenshot for ${item.id} (${item.url})...`);
      const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true`;
      const resData = await fetchJson(apiUrl);
      
      let imgUrl = resData?.data?.screenshot?.url || resData?.data?.image?.url;
      if (imgUrl) {
        const dest = path.join(screenshotsDir, `${item.id}.png`);
        await downloadFile(imgUrl, dest);
        console.log(`Saved screenshot for ${item.id} -> ${dest}`);
      } else {
        console.warn(`No screenshot found for ${item.id}`);
      }
    } catch (err) {
      console.error(`Error processing ${item.id}:`, err.message);
    }
  }
  console.log('Finished downloading all screenshots!');
}

run();
