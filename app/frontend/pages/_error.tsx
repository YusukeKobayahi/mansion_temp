import NextErrorComponent, { ErrorProps } from "next/error";
import * as Sentry from "@sentry/node";
import { NextPageContext } from "next";
import Head from "next/head";
import Header from "~/components/templates/Header";
import Footer from "~/components/templates/Footer";

import layoutStyles from "~/components/templates/Layout/index.module.scss";
import styles from "./error.module.scss";

interface Props {
  statusCode: number;
  hasGetInitialPropsRun: boolean;
  err: Error;
}

interface AppErrorProps extends ErrorProps {
  hasGetInitialPropsRun: boolean;
}

// Sentryでエラーをハンドリング出来るようにWrapしたエラーコンポーネント
// See: https://github.com/vercel/next.js/tree/canary/examples/with-sentry
class AppError extends NextErrorComponent<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const { err, asPath } = ctx;
    const errorInitialProps = (await NextErrorComponent.getInitialProps(
      ctx
    )) as AppErrorProps;

    // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
    // getInitialProps has run
    errorInitialProps.hasGetInitialPropsRun = true;

    // Running on the server, the response object (`res`) is available.
    //
    // Next.js will pass an err on the server if a page's data fetching methods
    // threw or returned a Promise that rejected
    //
    // Running on the client (browser), Next.js will provide an err if:
    //
    //  - a page's `getInitialProps` threw or returned a Promise that rejected
    //  - an exception was thrown somewhere in the React lifecycle (render,
    //    componentDidMount, etc) that was caught by Next.js's React Error
    //    Boundary. Read more about what types of exceptions are caught by Error
    //    Boundaries: https://reactjs.org/docs/error-boundaries.html

    if (err) {
      Sentry.captureException(err);
      return errorInitialProps;
    }

    // If this point is reached, getInitialProps was called without any
    // information about what the error might be. This is unexpected and may
    // indicate a bug introduced in Next.js, so record it in Sentry
    Sentry.captureException(
      new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
    );

    return errorInitialProps;
  }

  render() {
    const { hasGetInitialPropsRun, err } = this.props;
    if (!hasGetInitialPropsRun && err) {
      // getInitialProps is not called in case of
      // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
      // err via _app.js so it can be captured
      Sentry.captureException(err);
      // Flushing is not required in this case as it only happens on the client
    }

    return (
      <div>
        <Head>
          <title>
            システムメンテナンス中 | 中古マンション購入・売却ならHousii
          </title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" href="/ms-library/favicon.ico" />
        </Head>

        <Header />
        <main>
          <div className={layoutStyles.content}>
            <div className={styles.container}>
              <h1 className={styles.title}>システムメンテナンス中</h1>
              <p className={styles.description}>
                システムメンテナンス中につき、
                <br className="spOnly" />
                サイトの閲覧ができません。
                <br />
                大変恐れ入りますが、メンテナンス終了後に
                <br className="spOnly" />
                アクセスしていただきますようお願い致します。
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default AppError;
