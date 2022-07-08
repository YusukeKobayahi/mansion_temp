import Head from "next/head";
import Link from "next/link";
import Header from "~/components/templates/Header";
import Footer from "~/components/templates/Footer";
import { buildLibraryPagePath } from "~/lib/utils";

import layoutStyles from "~/components/templates/Layout/index.module.scss";
import styles from "./error.module.scss";

const Custom404: React.FC = () => {
  return (
    <div>
      <Head>
        <title>
          お探しのページが見つかりません | 中古マンション購入・売却ならHousii
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/ms-library/favicon.ico" />
      </Head>

      <Header />
      <main>
        <div className={layoutStyles.content}>
          <div className={styles.container}>
            <h1 className={styles.title}>お探しのページが見つかりません</h1>
            <p className={styles.description}>
              お探しのページは移動、もしくは削除された
              <br className="spOnly" />
              可能性があります。
            </p>
            <div className={styles.linkWrapper}>
              <Link href={"/"} as={buildLibraryPagePath()} prefetch={false}>
                <a className={styles.link}>トップページへ戻る</a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Custom404;
