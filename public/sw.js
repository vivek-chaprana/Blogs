if(!self.define){let s,e={};const a=(a,i)=>(a=new URL(a+".js",i).href,e[a]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=a,s.onload=e,document.head.appendChild(s)}else s=a,importScripts(a),e()})).then((()=>{let s=e[a];if(!s)throw new Error(`Module ${a} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let t={};const c=s=>a(s,n),o={module:{uri:n},exports:t,require:c};e[n]=Promise.all(i.map((s=>o[s]||c(s)))).then((s=>(r(...s),t)))}}define(["./workbox-c06b064f"],(function(s){"use strict";importScripts("/fallback-8e5b7798448a30a7.js"),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/static/chunks/0e762574-56e467db9d517159.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/1126-55bf9bf57fb4d027.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/1158-a9fd7ffa78ed6ab4.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/2123.1332c53680e47d20.js",revision:"1332c53680e47d20"},{url:"/_next/static/chunks/2423-7246aa01f9589591.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/3275.2c37edf69a6784a1.js",revision:"2c37edf69a6784a1"},{url:"/_next/static/chunks/3328-b318a2aad4b656bd.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/3675-c1f36fdb1cbee908.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/370b0802-6980d7d0ddeb4fa5.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/4328.3a4387f3feecb0dc.js",revision:"3a4387f3feecb0dc"},{url:"/_next/static/chunks/4337-36b526e74e179ec1.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/4476-7340bde0100c4106.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/4663.4edd758657b26aea.js",revision:"4edd758657b26aea"},{url:"/_next/static/chunks/5250-c0d1480142ec14ed.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/5468-fc3ca96d1f62c3d3.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/5480-f6ccb68e950ef767.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/54a60aa6-29ce923df7763eda.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/5700-878dbc08d8c7ba87.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/7041-7c1867a1dbf7c7c9.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/70e0d97a-ead35f0687852850.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/7149-af8ac0df2c84fe9f.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/7292-b411d63681ce48d3.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/7435-ffaf1bfac0b1e37c.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/761-15e3c7e1ddcab00b.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/795d4814-59d4dc2176874320.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/7981-3762b7f48a50d437.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/8318-e46a70978d7bbad6.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/8530-10c49152b9b63457.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/8572-584e857aec92bbc0.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/8882-ed5573ab1cb9183a.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/8e1d74a4-1a2d9c0424c27d86.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/9414-0b9bcde660eeab49.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/9425-f2fb57f63415d797.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/94730671-049a6adf9da3337e.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/%5BblogSlug%5D/edit/page-eae34764f7ebba14.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/%5BblogSlug%5D/page-27e201dd5898a58c.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(others)/followers/page-ffd3ca15783a1ca9.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(others)/following/page-a0e9e038d413baf7.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(others)/layout-2d4e34c71f50bcbe.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(others)/loading-78e0a9292edc3cff.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(profile)/about/page-daa544076ce75766.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(profile)/layout-915ee8d3d27665b2.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/(profile)/page-4bf425f6d327b803.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/%5Busername%5D/(with-profile-sidebar)/layout-9bf2b1e823c4125e.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(search)/layout-940f8dbc9a6815ef.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(search)/search/%5Bquery%5D/layout-c243a518d68b9585.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(search)/search/%5Bquery%5D/posts/page-aebbfbada20e1c9f.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(search)/search/%5Bquery%5D/tags/page-c88d06cf29faba2b.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(search)/search/%5Bquery%5D/users/page-214844237c74b57e.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/about/page-1ef27b55a5183639.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/contact/page-7f801c12502289e6.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/faqs/page-678c0d5f3636fb0a.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/help/page-0ca5b8fc91a59ac6.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/layout-fc477182caf1be97.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/privacy-policy/page-011c423748c20ad2.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/terms-and-conditions/page-2374d78c8629738a.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/topics/%5BtopicSlug%5D/page-e4341aa4aaf8d465.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/topics/layout-473f2e9147a747a4.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-footer)/topics/page-19295b749db3a497.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/(home)/layout-0e0e1ae60d61d80a.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/(home)/loading-a124cdc940032c45.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/(home)/page-f6dda46e3a79d606.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/layout-ff0e78ed62970535.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/notifications/layout-2ba94317a2ef0343.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/notifications/loading-66d8e8e05ccc4adf.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/notifications/page-cbaa59a84f3c4728.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/layout-d905885b6e033080.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/page-602f5502d0c68a1a.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/people/loading-2c980a1fd6cb57b2.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/people/page-d8c15d89f939934d.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/top-picks/loading-9acafe78a3a8b340.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/top-picks/page-3f5df1b7090a6ef0.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/topics/loading-cc523a9b46438070.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/recommendations/topics/page-fdef316ee2b58719.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/saved/loading-e551fdade8a08747.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/(with-sidebar)/saved/page-5567c6527b77175a.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/layout-b59b5ffcae3802bd.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/new-story/page-b0c7f95e9f367acb.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/not-found-887e847d922abc47.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/(main)/settings/page-abb62023dc36fcea.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/_not-found-32e2dc2e5a373f09.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/auth/error/page-e26f0b905e26d493.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/auth/login/page-0429f5c83cd1cf73.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/auth/verify/page-f602358f638013cf.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/layout-985a237511fe7968.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/loading-ea1318f148c0f342.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/register/page-73467cbd2776a3d4.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/app/~offline/page-25d2da9f07e31bd2.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/c916193b-c972d57043411aa7.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/fc2f6fa8-d7fb56f02f1a5a42.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/fd9d1056-5b2a62f284ec4029.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/framework-08aa667e5202eed8.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/main-ad7d84dc8b38e4e9.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/main-app-3dea3552bb1f5b30.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/pages/_app-57bdff7978360b1c.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/pages/_error-29037c284dd0eec6.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-05c54ab0fe4e45ba.js",revision:"qrNjes7ia7sLosEFaGXrZ"},{url:"/_next/static/css/48ccb81d9ec35b15.css",revision:"48ccb81d9ec35b15"},{url:"/_next/static/media/a7e5d9c45b50d244-s.p.ttf",revision:"6730eccfb031fa49ce2558527c8a3424"},{url:"/_next/static/qrNjes7ia7sLosEFaGXrZ/_buildManifest.js",revision:"2b54d7db375d2b4c0e6af318090bebea"},{url:"/_next/static/qrNjes7ia7sLosEFaGXrZ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"9eab17ffbe8a5ecbf99abc34b3750897"},{url:"/android-chrome-512x512.png",revision:"ff16ffa73f62c1346c5b780da2ca0255"},{url:"/apple-touch-icon.png",revision:"f92e2e898eb40a4efe8bf075502c042e"},{url:"/fallback-8e5b7798448a30a7.js",revision:"9ce9e8fe1a0baf80515b990b51ddc4df"},{url:"/favicon-16x16.png",revision:"431b609ae82daf5e7352eec8b6eddfff"},{url:"/favicon-32x32.png",revision:"36bdaa01c7c9ddab0cc32f8d9e38005b"},{url:"/favicon.ico",revision:"a8ac0ffbd68ac17f416c18e56bc174e0"},{url:"/manifest.json",revision:"4fbb239ba832c4fd645076c5a9af06eb"},{url:"/swe-worker-4da67dda9bc18c53.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/~offline",revision:"qrNjes7ia7sLosEFaGXrZ"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:s})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\/_next\/static.+\.js$/i,new s.CacheFirst({cacheName:"next-static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:mp4|webm)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({sameOrigin:s,url:{pathname:e}})=>!(!s||e.startsWith("/api/auth/callback")||!e.startsWith("/api/"))),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&"1"===s.headers.get("Next-Router-Prefetch")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({request:s,url:{pathname:e},sameOrigin:a})=>"1"===s.headers.get("RSC")&&a&&!e.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages-rsc",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({url:{pathname:s},sameOrigin:e})=>e&&!s.startsWith("/api/")),new s.NetworkFirst({cacheName:"pages",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),s.registerRoute((({sameOrigin:s})=>!s),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:s})=>"undefined"!=typeof self?self.fallback(s):Response.error()}]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
