
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/repertorio",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/repertorio"
  },
  {
    "renderMode": 2,
    "route": "/canciones"
  },
  {
    "renderMode": 2,
    "route": "/letras"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 433, hash: '778b010b74f95992ffcad6c8773371d1df172fd4744956543774f8b6eb5f3f4c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 946, hash: '267bdfde6604b5f054787a96119c2a4dcc49cc5055d39ee16c89e96599546122', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'letras/index.html': {size: 3451, hash: '097eee4657a06fc0d625bec774f996c65fdc23f39d9f908098ea6a5a80ea067b', text: () => import('./assets-chunks/letras_index_html.mjs').then(m => m.default)},
    'repertorio/index.html': {size: 7812, hash: '699bb8b218728e6db6a71bdeadff4d8ea98143155af3954e20ac3fb42e23f78c', text: () => import('./assets-chunks/repertorio_index_html.mjs').then(m => m.default)},
    'canciones/index.html': {size: 7193, hash: 'a9456935d455592ed92b6da7e90314720506778b1885a12916c8e4dee41b88a4', text: () => import('./assets-chunks/canciones_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
