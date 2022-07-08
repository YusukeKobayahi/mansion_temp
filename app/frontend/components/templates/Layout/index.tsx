import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "~/components/templates/Header";
import Footer from "~/components/templates/Footer";
import BreadcrumbsJsonLd from "~/components/commons/JsonLd/Breadcrumbs";
import Breadcrumb, {
  BreadcrumbItemProps,
} from "~/components/commons/Breadcrumb";
import Popup from "~/components/commons/Popup";
import styles from "./index.module.scss";

type LayoutProps = {
  children?: ReactNode;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItemProps[];
  mainClassName?: string;
  pages?:
    | "prefectures"
    | "cities"
    | "towns"
    | "lines"
    | "stations"
    | "schools"
    | "brands"
    | "freeword"
    | "mansions"
    | "commute";
  url?: string;
  isNoindex?: boolean;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  breadcrumbs,
  mainClassName = "",
  pages,
  url,
  isNoindex,
}: LayoutProps) => {
  const siteTitle = "中古マンション購入・売却ならHousii";
  const fullTitle = [title, siteTitle].join(" | ");
  const robots = isNoindex ? "noindex,follow" : "index,follow";

  return (
    <div>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/ms-library/images/og-image.png" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="content-language" content="ja"></meta>
        <link rel="shortcut icon" href="/ms-library/favicon.ico" />
        <link rel="canonical" href={url} />
        <meta name="robots" content={robots} />
      </Head>
      {breadcrumbs && <BreadcrumbsJsonLd breadcrumbs={breadcrumbs} />}
      <Header />
      <main className={mainClassName}>
        <div className={styles.container}>
          {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />}
          <div className={styles.content}>{children}</div>
        </div>
      </main>
      <Footer pages={pages} />
      <Popup pages={pages} />
    </div>
  );
};

export default Layout;
