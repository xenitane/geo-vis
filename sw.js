/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-8b214665'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "404",
    "revision": "f1c79bbee0bf022d273e4b87a5421993"
  }, {
    "url": "assets/_id_.BUZNQpV4.css",
    "revision": null
  }, {
    "url": "assets/BaseLayout.astro_astro_type_script_index_0_lang.BJG_CjhK.js",
    "revision": null
  }, {
    "url": "assets/page.DVH5gqST.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5.B9K5rw8f.js",
    "revision": null
  }, {
    "url": "branching-fractal/barnsley-fern",
    "revision": "d0e88f90bc934cc4842c4eaed588eabe"
  }, {
    "url": "branching-fractal/fractal-tree",
    "revision": "c1eab6987f480954fec7d8e5fbf71e40"
  }, {
    "url": "branching-fractal/peano-sierpinski-carpet",
    "revision": "d3175fc049e30c1e0d9e09991e4fc025"
  }, {
    "url": "branching-fractal/sierpinski-carpet",
    "revision": "554315b0fb37ff8d31920589b697b1e2"
  }, {
    "url": "branching-fractal/sierpinski-gasket",
    "revision": "6ed6992a45419bbbc4f7fd6e2e80d17d"
  }, {
    "url": "branching-fractal/t-square",
    "revision": "6ef98887128a83bb0797e00620f1c319"
  }, {
    "url": "branching-fractal/vicsek-fractal",
    "revision": "9165dc6b57551017ec61516240fc79a2"
  }, {
    "url": "fill-fractal/hex-nut",
    "revision": "72d95c76f1313c86e3bca7a8ce86902c"
  }, {
    "url": "fill-fractal/hex-pool",
    "revision": "86adc5c7917b87d1da63217b02fe7089"
  }, {
    "url": "fill-fractal/hexaflake",
    "revision": "c2511fce3ee5ab0c10e1934f1b459845"
  }, {
    "url": "fill-fractal/pentaflake",
    "revision": "8ff165590a85cb06e0996b01278e06fb"
  }, {
    "url": "fill-fractal/sierpinski-carpet",
    "revision": "6c1644dad563f863cb58fc7f227c9847"
  }, {
    "url": "fill-fractal/sierpinski-hexagon",
    "revision": "96d7f74c0039449622d3c7957f7bc29d"
  }, {
    "url": "fill-fractal/sierpinski-pentagon",
    "revision": "3180f68e9ba8a464361f5a8a2e0cce49"
  }, {
    "url": "fill-fractal/sierpinski-triangle",
    "revision": "87b25ac310e224f0df8addcaa65de794"
  }, {
    "url": "fill-fractal/t-square",
    "revision": "9be592f562337dd4e511c158dc43c971"
  }, {
    "url": "fill-fractal/vicsek-fractal-2",
    "revision": "e017ff370a4b156fa2a6c76a0de45471"
  }, {
    "url": "fill-fractal/vicsek-fractal",
    "revision": "b9d41ca26f13e8afe5b1d01ed252a210"
  }, {
    "url": "/geo-vis",
    "revision": "935b6fe149ddcd584631ea1d5ab86970"
  }, {
    "url": "lib/renderer/branching-fractal.js",
    "revision": "c05db6359ac42d039accb78ac76a4b4f"
  }, {
    "url": "lib/renderer/fill-fractal.js",
    "revision": "b761a0aa3e642400085f85c1be7dea45"
  }, {
    "url": "lib/renderer/linear-fractal.js",
    "revision": "d5d712c0e4e899690589920cc4fac003"
  }, {
    "url": "lib/rules/branching-fractal/barnsley-fern.js",
    "revision": "68e3c05192776b666420a79e55477172"
  }, {
    "url": "lib/rules/branching-fractal/fractal-tree.js",
    "revision": "71b59672e5c35542d19589ea27fcf715"
  }, {
    "url": "lib/rules/branching-fractal/peano-sierpinski-carpet.js",
    "revision": "5c4ede3ae23355e08866f1a306a7d320"
  }, {
    "url": "lib/rules/branching-fractal/sierpinski-carpet.js",
    "revision": "b8aa1f813cdb559ecd9b907b5715f0bb"
  }, {
    "url": "lib/rules/branching-fractal/sierpinski-gasket.js",
    "revision": "fd5ac3f63efa5d2a2f89955bd94a0239"
  }, {
    "url": "lib/rules/branching-fractal/t-square.js",
    "revision": "25959b2344c4694e45824b68f3d64f43"
  }, {
    "url": "lib/rules/branching-fractal/vicsek-fractal.js",
    "revision": "98a63e0b56ae657fa11cbd110ec65bbd"
  }, {
    "url": "lib/rules/fill-fractal/hex-nut.js",
    "revision": "e307c6f3aa0b5e8939f371772e63b8f5"
  }, {
    "url": "lib/rules/fill-fractal/hex-pool.js",
    "revision": "499040a0821f59ba4ccceb72d5ed7d13"
  }, {
    "url": "lib/rules/fill-fractal/hexaflake.js",
    "revision": "e368805e69e707c72a367d1eb0b225b3"
  }, {
    "url": "lib/rules/fill-fractal/pentaflake.js",
    "revision": "ce5a4800a1947e10b8026b756b1cad46"
  }, {
    "url": "lib/rules/fill-fractal/sierpinski-carpet.js",
    "revision": "340df81ac213826a6a994a0b2db15c02"
  }, {
    "url": "lib/rules/fill-fractal/sierpinski-hexagon.js",
    "revision": "1f91ac141a0363b0752628adfe296458"
  }, {
    "url": "lib/rules/fill-fractal/sierpinski-pentagon.js",
    "revision": "92bb09146e000d2493d4ccd9cb330b1b"
  }, {
    "url": "lib/rules/fill-fractal/sierpinski-triangle.js",
    "revision": "db9b8442c71c88c5e171560f6f2abe0a"
  }, {
    "url": "lib/rules/fill-fractal/t-square.js",
    "revision": "a4cd6bf6b55c7f871f2a43a9ad8d07e6"
  }, {
    "url": "lib/rules/fill-fractal/vicsek-fractal-2.js",
    "revision": "45e93ab0741d5dc2097edc7f1dd5d702"
  }, {
    "url": "lib/rules/fill-fractal/vicsek-fractal.js",
    "revision": "fe54f3121a47084a9fc194eaab399021"
  }, {
    "url": "lib/rules/linear-fractal/cross-stitch-curve.js",
    "revision": "b9bcc4128e40745a48ea7044406d8eb0"
  }, {
    "url": "lib/rules/linear-fractal/dragon-curve.js",
    "revision": "c1de4baac0a0ad8b3cb25b075226ea4b"
  }, {
    "url": "lib/rules/linear-fractal/fibonacci-word-fractal.js",
    "revision": "bc0993fca2954ef435a93f6f4716aa55"
  }, {
    "url": "lib/rules/linear-fractal/gosper-curve.js",
    "revision": "da57bd6e9cfd6002b68c83eb713c4793"
  }, {
    "url": "lib/rules/linear-fractal/gosper-island.js",
    "revision": "739adb2f4d1995b0c25bcd4fa6e266e4"
  }, {
    "url": "lib/rules/linear-fractal/hilbert-curve-2.js",
    "revision": "7dd4659e8d06fc160fc1ca7c8e9b1d96"
  }, {
    "url": "lib/rules/linear-fractal/hilbert-curve.js",
    "revision": "62a6fcecc691e61ce6ec5dfe884adda8"
  }, {
    "url": "lib/rules/linear-fractal/koch-anti-snowflake.js",
    "revision": "3db0fd6d4316d6e90bd96869b8b58d1c"
  }, {
    "url": "lib/rules/linear-fractal/koch-snowflake.js",
    "revision": "3db0fd6d4316d6e90bd96869b8b58d1c"
  }, {
    "url": "lib/rules/linear-fractal/levy-c-curve.js",
    "revision": "f058596fd16313820bb34b5bfd2ff4db"
  }, {
    "url": "lib/rules/linear-fractal/minkowski-island.js",
    "revision": "f03040e14094c7c5aed4ad186774dd6b"
  }, {
    "url": "lib/rules/linear-fractal/peano-curve.js",
    "revision": "f507910f9fb512d3e92ee9a1bd81eba1"
  }, {
    "url": "lib/rules/linear-fractal/quadratic-island.js",
    "revision": "abf956d3cec0d9099598d86c99273ecd"
  }, {
    "url": "lib/rules/linear-fractal/quadratic-koch-island.js",
    "revision": "a43ddb5a106e49da7710139c1a5f0b54"
  }, {
    "url": "lib/rules/linear-fractal/sierpinski-arrow-head.js",
    "revision": "e3370874c9c68820bc5780686ef5e723"
  }, {
    "url": "lib/rules/linear-fractal/sierpinski-triangle.js",
    "revision": "2734566269461da374d3fed0a8c64548"
  }, {
    "url": "lib/rules/linear-fractal/t-square.js",
    "revision": "e4f2590be1f7b48db5fe4fda28719e69"
  }, {
    "url": "lib/rules/linear-fractal/vicsek-fractal-2.js",
    "revision": "3e071fecc64bda853a5afb2aa48bb5ce"
  }, {
    "url": "lib/rules/linear-fractal/vicsek-fractal.js",
    "revision": "820b7806834f5746087d45fa01393937"
  }, {
    "url": "lib/util/branching-fractal-validator.js",
    "revision": "84dbc21a01e5772f1ea238eeb7bce84f"
  }, {
    "url": "lib/util/core.js",
    "revision": "51d4d3eb3947deb76f2c6a72b85b818a"
  }, {
    "url": "lib/util/fractal.js",
    "revision": "cd26f4c8c2f11521365de41616c54843"
  }, {
    "url": "lib/util/linear-fractal-validator.js",
    "revision": "af2bc6fde72116f13b6697ab7f1fd905"
  }, {
    "url": "lib/util/lines.js",
    "revision": "f5c7949af5c84328174c52d7adf236b7"
  }, {
    "url": "linear-fractal/cross-stitch-curve",
    "revision": "84855cd8c1c22974f2a9cacc6b16846f"
  }, {
    "url": "linear-fractal/dragon-curve",
    "revision": "59ee40aa2d459410227f38b941d06595"
  }, {
    "url": "linear-fractal/fibonacci-word-fractal",
    "revision": "550e621d5ac2f8f7038fdff41a366ce7"
  }, {
    "url": "linear-fractal/gosper-curve",
    "revision": "c9afb5b788d28f5ee8276b16f5b956df"
  }, {
    "url": "linear-fractal/gosper-island",
    "revision": "6abb16476621c99c34841a038ac3d1a2"
  }, {
    "url": "linear-fractal/hilbert-curve-2",
    "revision": "c0c05904c91a0e28cba11e9a08f49889"
  }, {
    "url": "linear-fractal/hilbert-curve",
    "revision": "bd7df1e3f06516a25ce8e046d31ab74a"
  }, {
    "url": "linear-fractal/koch-anti-snowflake",
    "revision": "4a30a4f1bd4f5b3f615ef95f824a624a"
  }, {
    "url": "linear-fractal/koch-snowflake",
    "revision": "938bf299205b1ff07cc9a35818dcb29f"
  }, {
    "url": "linear-fractal/levy-c-curve",
    "revision": "b7a34d413f1ecbe7bb82871612cf51ab"
  }, {
    "url": "linear-fractal/minkowski-island",
    "revision": "782a77f2db9b8f8d65607d8630ddec13"
  }, {
    "url": "linear-fractal/peano-curve",
    "revision": "1eb53254bb775c1d54df796464c39467"
  }, {
    "url": "linear-fractal/quadratic-island",
    "revision": "956aced3a26a603e024ae4cabbce988f"
  }, {
    "url": "linear-fractal/quadratic-koch-island",
    "revision": "2112b90105552b7a01c994beeef6c5da"
  }, {
    "url": "linear-fractal/sierpinski-arrow-head",
    "revision": "55cb8149ba3026342ac504c83523e115"
  }, {
    "url": "linear-fractal/sierpinski-triangle",
    "revision": "3e2c5f17ecb21d948f3dc7fe99ad8b4b"
  }, {
    "url": "linear-fractal/t-square",
    "revision": "f0760181a00016c432a7d0705ce29277"
  }, {
    "url": "linear-fractal/vicsek-fractal-2",
    "revision": "1dfad98c61e08fe38cb4baf8a2ec4a0f"
  }, {
    "url": "linear-fractal/vicsek-fractal",
    "revision": "057ad240cf8bacee13f3e2e7bda69c57"
  }, {
    "url": "robots.txt",
    "revision": "9152d7f1724ed8fbcd2e0c87029f193c"
  }, {
    "url": "manifest.webmanifest",
    "revision": "77ce223923eb4fce140525e3380b28be"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/")));
  workbox.registerRoute(/^https:\/\/xenitane\.xyz\/assets\/*.woff2?$/, new workbox.StaleWhileRevalidate({
    "cacheName": "fonts",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/^https:\/\/cdn\.xenitane\.xyz\/thumbs/, new workbox.StaleWhileRevalidate({
    "cacheName": "thumbs",
    plugins: []
  }), 'GET');
  workbox.registerRoute(/^https:\/\/xenitane\.xyz\/lib\rules/, new workbox.StaleWhileRevalidate({
    "cacheName": "rules",
    plugins: []
  }), 'GET');

}));
