const C='qai-v12';
// 2026-09-22 v4: 画面は「ネットから先に取り、つながらない時だけ保存分」にした（以前は保存分を先に出し、更新が届かなかった）
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
 if(u.origin!==location.origin||e.request.method!=='GET')return;
 const key=u.pathname.endsWith('board.json')?'board.json':e.request;
 e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(key,cp))}return r})
  .catch(()=>caches.match(key).then(r=>r||caches.match('index.html'))))});
