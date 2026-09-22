const C='qai-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(u.origin!==location.origin){return}
 if(u.pathname.endsWith('board.json')){e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('board.json',cp));return r}).catch(()=>caches.match('board.json')));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
