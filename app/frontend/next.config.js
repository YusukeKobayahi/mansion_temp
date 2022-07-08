module.exports = {
  basePath: "/ms-library",
  trailingSlash: true,
  webpack: (config, options) => {
    // SSRでnode側とbrowser側とそれぞれ向けにWebpackを設定する必要がある
    // next.jsではSSR用とブラウザ用で2回Webpackビルドが実行されるので、ブラウザ側の実行時のみimportするモジュールを@sentry/browserに置き換える
    // See: https://github.com/vercel/next.js/blob/1231ddb001da4ca9b3377f3fc8b990a986bcff1f/examples/with-sentry/next.config.js#L33-L50
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    return config;
  },
  experimental: {
    scrollRestoration: true,
  },
};
