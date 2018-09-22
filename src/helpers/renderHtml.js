import serialize from 'serialize-javascript';
import { minify } from 'html-minifier';

export default (
  head: Object,
  assets: Object,
  htmlContent: string,
  initialState: Object,
  loadableStateTag: string
): string => {
  // Use pre-defined assets for development to prevent html from inserting wrong styles / scripts
  const envAssets = __DEV__
    ? { main: { js: '/assets/main.js', css: '/assets/main.css' } }
    : assets;

  const html = `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <!--[if IE]>
          <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <![endif]-->

        <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Tangerine">
        <link rel="apple-touch-icon" href="apple-touch-icon.png">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="facebook icon" href="/facebook.svg">
        <link rel="google icon" href="/google.svg">
     

        ${head.title.toString()}
        ${head.base.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        <!-- Insert bundled styles into <link> tag -->
        ${Object.keys(envAssets).map(
          key =>
            envAssets[key].css
              ? `<link href="${
                  envAssets[key].css
                }" media="screen, projection" rel="stylesheet" type="text/css">`
              : ''
        )}

      </head>
      <body>
        <!-- Insert the router, which passed from server-side -->
        <div id="react-view">${htmlContent}</div>
        
        
        <!-- Hotjar Tracking Code for drivo.xyz -->
        <script>
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1023912,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        </script>

        <!-- Insert loadableState's script tag into page (loadable-components setup) -->
        ${loadableStateTag}

        <!-- Store the initial state into window -->
        <script>
          // Use serialize-javascript for mitigating XSS attacks. See the following security issues:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__INITIAL_STATE__=${serialize(initialState)};
        </script>

        <!-- Insert bundled scripts into <script> tag -->
        ${Object.keys(envAssets)
          .reverse() // Reverse scripts to get correct ordering
          .map(key => `<script src="${envAssets[key].js}"></script>`)}

        ${head.script.toString()}
      </body>
    </html>
  `;

  // html-minifier configuration, refer to "https://github.com/kangax/html-minifier" for more configuration
  const minifyConfig = {
    collapseWhitespace: true,
    removeComments: true,
    trimCustomFragments: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: true
  };
  console.log('renderedHtml');

  // Minify html in production
  return __DEV__ ? html : minify(html, minifyConfig);
};
