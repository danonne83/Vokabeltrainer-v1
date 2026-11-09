const CACHE="vokabeltrainer-v4";
const FILES=["./","./index.html","./manifest.webmanifest"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Netzwerk zuerst (damit GitHub-Updates sofort ankommen), Cache nur als Offline-Fallback
self.addEventListener("fetch",e=>{
 const req=e.request;
 if(req.method!=="GET"||new URL(req.url).origin!==location.origin)return;
 e.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));return res;}).catch(()=>caches.match(req)));
});
