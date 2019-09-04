/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "006718e08daa5bd920bc92536aa606a8"
  },
  {
    "url": "api/index.html",
    "revision": "d6d3cd94d251ccbe9c22c26d342275ba"
  },
  {
    "url": "api/rules.html",
    "revision": "eef46400c06a6336c9401987fdcbb37f"
  },
  {
    "url": "assets/css/0.styles.28c99067.css",
    "revision": "b98c247351c6b4a72f3fa6620886265d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.6a9f1822.js",
    "revision": "bf7139081a4a2722d5c1343d1c5b9325"
  },
  {
    "url": "assets/js/11.166d16cc.js",
    "revision": "29c0cf06957e1b5a213e553e05f73c78"
  },
  {
    "url": "assets/js/12.16e033fe.js",
    "revision": "a1395aeb84ce85f756a8b8a1dbd400f2"
  },
  {
    "url": "assets/js/13.51e72912.js",
    "revision": "df204bc7fd59a97f05ec747d24e0ee7c"
  },
  {
    "url": "assets/js/14.7a11d302.js",
    "revision": "69f5ad3079265f3aaba7d6b82d4b91c1"
  },
  {
    "url": "assets/js/15.4aa91a18.js",
    "revision": "b87ed48cecd108eb77d7c474ea09961d"
  },
  {
    "url": "assets/js/16.7f76ca31.js",
    "revision": "d7cb3a5ed2b572613fd508f4e605cae2"
  },
  {
    "url": "assets/js/17.88efc7f1.js",
    "revision": "2537d251145c1917312b87c09807738c"
  },
  {
    "url": "assets/js/18.a39bfe59.js",
    "revision": "1e86a9a84f06c4f40db384d08111c960"
  },
  {
    "url": "assets/js/19.c7eba924.js",
    "revision": "f9817ec045e9b95ce63e32b7193f4364"
  },
  {
    "url": "assets/js/2.cc1e3b21.js",
    "revision": "2ddf1d037488faecf664ace29afc68c8"
  },
  {
    "url": "assets/js/20.a016b72e.js",
    "revision": "82230ea189d85812770aadac8f03b6d1"
  },
  {
    "url": "assets/js/21.04eb2afb.js",
    "revision": "70477e26e9e266c507343fb6f6265d8c"
  },
  {
    "url": "assets/js/22.2e25fc51.js",
    "revision": "3a4c49fde19f2eeb340a88d134afd8f7"
  },
  {
    "url": "assets/js/23.4c9335fb.js",
    "revision": "d18566532cb91eb8d0e25a8abe025a02"
  },
  {
    "url": "assets/js/24.2caae87a.js",
    "revision": "89b512dec85f956ad8bf0f7b861fecdb"
  },
  {
    "url": "assets/js/25.180bcc5a.js",
    "revision": "206c649405ccbf0f212926ab065e11e6"
  },
  {
    "url": "assets/js/26.2af24115.js",
    "revision": "19957f6189a68f4436adf4693323e12c"
  },
  {
    "url": "assets/js/27.e39d0e95.js",
    "revision": "360d23f32d69eee5768a2eb39c34bf7b"
  },
  {
    "url": "assets/js/28.db2c8d5f.js",
    "revision": "4cb90d38cb86faa39498d2f4b35228a2"
  },
  {
    "url": "assets/js/29.60e2dd82.js",
    "revision": "2cd80bafde66a86cb1b5a58e1bc572b2"
  },
  {
    "url": "assets/js/3.d8c5785d.js",
    "revision": "1b77223da3b51314bbbcfa6e115ee84f"
  },
  {
    "url": "assets/js/30.bb1f17c0.js",
    "revision": "7fbfb9665185823278902c71db6fb50a"
  },
  {
    "url": "assets/js/31.f7030153.js",
    "revision": "495699e493a96dc0ac5a285c2bbddb30"
  },
  {
    "url": "assets/js/4.21a0ef0b.js",
    "revision": "d551f837a1d63988458186058b6b998b"
  },
  {
    "url": "assets/js/5.d6f1d3be.js",
    "revision": "17c290e3a8eadb6db6719147c8de0b72"
  },
  {
    "url": "assets/js/6.65880a5b.js",
    "revision": "8bdaa8b778356c5f35a457b37da27825"
  },
  {
    "url": "assets/js/7.f08858b6.js",
    "revision": "77738d24beea8a0ebfd7aa4f547020a3"
  },
  {
    "url": "assets/js/8.258acc73.js",
    "revision": "c6be3c2915118cac5ef1e53dac9c50d8"
  },
  {
    "url": "assets/js/9.491f22e0.js",
    "revision": "c3c19bf16b996efc6a83f9b39979bc51"
  },
  {
    "url": "assets/js/app.ec7a56fb.js",
    "revision": "7304a5eddae7e4967e88a7a85dd4e337"
  },
  {
    "url": "configuration.html",
    "revision": "7ff7f59a551bbe4a724e5ae9086dcdfb"
  },
  {
    "url": "examples/backend.html",
    "revision": "b9dbaa7bcfbba1e6a5c63fcd63bffb21"
  },
  {
    "url": "examples/i18n.html",
    "revision": "89b9a2cd3ea77119ff4b469c7942cecd"
  },
  {
    "url": "examples/index.html",
    "revision": "6fb84ec31a3503e2b625cca2e80085bc"
  },
  {
    "url": "examples/multiple-forms.html",
    "revision": "f15ce7f5b186add2401357104565e171"
  },
  {
    "url": "examples/nuxt.html",
    "revision": "e9c0d7863ec092458da7c1d80f15498a"
  },
  {
    "url": "examples/ui-libraries.html",
    "revision": "969914d1987a343b72f8d9438d9c4d27"
  },
  {
    "url": "guide/a11y.html",
    "revision": "39e61f1af25fdf6522bfa6009b9bc6bd"
  },
  {
    "url": "guide/advanced-validation.html",
    "revision": "e7e9fb5e6d3181d2983686ca5c9b5b6b"
  },
  {
    "url": "guide/applying-rules.html",
    "revision": "0733726360169ef561d4a026352671fb"
  },
  {
    "url": "guide/basic-validation.html",
    "revision": "d4c235d839d91dd03ce3ff08a989610c"
  },
  {
    "url": "guide/displaying-errors.html",
    "revision": "804887f9285d11f5285613725eb81e16"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "fccbf8f8ec13f1f60f2e6b413118887c"
  },
  {
    "url": "guide/html5-validation.html",
    "revision": "d9044ca0682da4145067abef9c3e54d0"
  },
  {
    "url": "guide/index.html",
    "revision": "a707dc4ff747a4091bfbe0598a27bacf"
  },
  {
    "url": "guide/interaction-and-ux.html",
    "revision": "ba56f405309636a22c7154c873d1749a"
  },
  {
    "url": "guide/localization.html",
    "revision": "33cb569f13009497eed97973b77e8ce4"
  },
  {
    "url": "guide/styling.html",
    "revision": "a1dff13947f9c75dbdd830414b04b0aa"
  },
  {
    "url": "guide/testing.html",
    "revision": "ef5716ffce8f5afb4fa51d76f398355d"
  },
  {
    "url": "guide/validation-observer.html",
    "revision": "814aed4da00f1cc377ce930eb909f0b1"
  },
  {
    "url": "guide/validation-provider.html",
    "revision": "24c10f105e860589763601f2c740b198"
  },
  {
    "url": "img/android-icon-144x144.png",
    "revision": "6e62ce50be0bcd4880124743b11f42b1"
  },
  {
    "url": "img/android-icon-192x192.png",
    "revision": "749eb7570911aa13fa7a305f7dfdb042"
  },
  {
    "url": "img/android-icon-36x36.png",
    "revision": "94d70fb19e77b88129a2a4b44d30273f"
  },
  {
    "url": "img/android-icon-48x48.png",
    "revision": "6e039016a0d1721277e863e6400107a9"
  },
  {
    "url": "img/android-icon-72x72.png",
    "revision": "cf3bbf6c5c50306cb1d2af34148fd4ad"
  },
  {
    "url": "img/android-icon-96x96.png",
    "revision": "171c58f6d99812028cdc433f706fab88"
  },
  {
    "url": "img/apple-icon-114x114.png",
    "revision": "a1612722a53e36417890844f4aaca4bd"
  },
  {
    "url": "img/apple-icon-120x120.png",
    "revision": "0fdcdb4e43499467315916e07d5a09e0"
  },
  {
    "url": "img/apple-icon-144x144.png",
    "revision": "6e62ce50be0bcd4880124743b11f42b1"
  },
  {
    "url": "img/apple-icon-152x152.png",
    "revision": "bdd5fb6d3e9976d4b66199750e7398a0"
  },
  {
    "url": "img/apple-icon-180x180.png",
    "revision": "6e4bfb481a5f5546673674ea2f53a80d"
  },
  {
    "url": "img/apple-icon-57x57.png",
    "revision": "2a3e81c26413d7cfb085132e4d0d78ed"
  },
  {
    "url": "img/apple-icon-60x60.png",
    "revision": "f3f63dae941a269726cecb63d5eb8ae4"
  },
  {
    "url": "img/apple-icon-72x72.png",
    "revision": "cf3bbf6c5c50306cb1d2af34148fd4ad"
  },
  {
    "url": "img/apple-icon-76x76.png",
    "revision": "8df9e1335515138c89abe7489d3331ee"
  },
  {
    "url": "img/apple-icon-precomposed.png",
    "revision": "0ae26495c87bea19c3238efac57100db"
  },
  {
    "url": "img/apple-icon.png",
    "revision": "0ae26495c87bea19c3238efac57100db"
  },
  {
    "url": "img/favicon-16x16.png",
    "revision": "50325b55b6decbf164f49e8ab2ef3a82"
  },
  {
    "url": "img/favicon-32x32.png",
    "revision": "7d8244cb1190e5818aaf3b5bc7dbe523"
  },
  {
    "url": "img/favicon-96x96.png",
    "revision": "171c58f6d99812028cdc433f706fab88"
  },
  {
    "url": "img/ms-icon-144x144.png",
    "revision": "6e62ce50be0bcd4880124743b11f42b1"
  },
  {
    "url": "img/ms-icon-150x150.png",
    "revision": "868ea201b8975a3f505a31992da8bf60"
  },
  {
    "url": "img/ms-icon-310x310.png",
    "revision": "635b0545d3369a88a7a3238089a38853"
  },
  {
    "url": "img/ms-icon-70x70.png",
    "revision": "476a4d57938b8a33701124593cb2301b"
  },
  {
    "url": "index.html",
    "revision": "d317940bc6d056398a1f1df2bb3a6dbe"
  },
  {
    "url": "logo.svg",
    "revision": "851182946aa8e35268efa9a9ccd410d2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
