/* Minimal static server for IPS PORLASALUD — node serve.js */
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 5228;
const ROOT = __dirname;
const MIME = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8', '.json':'application/json',
  '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff2':'font/woff2'
};
http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/') url = '/index.html';
  const file = path.join(ROOT, url);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('404 Not Found'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control':'no-store, no-cache, must-revalidate, max-age=0', 'Pragma':'no-cache', 'Expires':'0' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`IPS PORLASALUD → http://localhost:${PORT}`));
