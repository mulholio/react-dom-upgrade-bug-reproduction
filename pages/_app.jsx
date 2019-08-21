import React from 'react'
import App from 'next/app'

const localeToLang = locale => locale.split('-')[0];

async function loadIntlPolyfills(locale) {
  const lang = localeToLang(locale);
  await Promise.all([
    import(
      /* webpackChunkName: "intl-pluralrules" */
      'intl-pluralrules'
    ),
    import(
      /* webpackChunkName: "@formatjs/intl-relativetimeformat/polyfill" */
      '@formatjs/intl-relativetimeformat/polyfill'
    ),
    import(
      /* webpackChunkName: "@formatjs/intl-relativetimeformat/dist/locale-data/[index]" */
      `@formatjs/intl-relativetimeformat/dist/locale-data/${lang}`
    ),
  ]);
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const { req } = ctx;
    const { locale } = req;

    if (Component && Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }

    return {
      locale,
      pageProps,
    };
  }

  componentDidMount() {
    const { locale } = this.props;
    loadIntlPolyfills(locale);
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
