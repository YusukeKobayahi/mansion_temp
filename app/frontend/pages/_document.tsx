import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID, GA4_TRACKING_ID } from "../lib/gtag";

export default class MyDocument extends Document {
  // Google Analytics グローバルサイトタグ
  // See: https://developers.google.com/analytics/devguides/collection/gtagjs#install_the_global_site_tag
  renderGtagSnippet(): JSX.Element | undefined {
    if (!GA_TRACKING_ID && !GA4_TRACKING_ID) return;

    return (
      <>
        {GA_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        )}
        {GA4_TRACKING_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                // eslint-disable-next-line @typescript-eslint/naming-convention
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA4_TRACKING_ID}');
            `,
              }}
            />
          </>
        )}
      </>
    );
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>{this.renderGtagSnippet()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
