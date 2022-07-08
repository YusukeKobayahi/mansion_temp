import { GetServerSideProps } from "next";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { MansionDocument } from "~/graphql/generated";
import { buildLibraryPagePath, redirect } from "~/lib/utils";
import { GraphQLError, isNotFoundError } from "~/lib/graphql/errors";
import redirectMansionsData from "~/public/json/redirectMansions.json";

import styles from "~/pages/mansions/[uniqueCode]/index.module.scss";
import Layout from "~/components/templates/Layout";
import Access from "~/components/pages/mansions/Access";
import BaseInfo from "~/components/pages/mansions/BaseInfo";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import Details from "~/components/pages/mansions/Details";
import SalesHistories from "~/components/pages/mansions/SalesHistories";
import SalesSummary from "~/components/pages/mansions/SalesSummary";
import SimilarMansions from "~/components/pages/mansions/SimilarMansions";
import MembersCTA from "~/components/pages/mansions/MembersCTA";
import ProductJsonLd from "~/components/commons/JsonLd/Product";
import FloatCTA from "~/components/pages/mansions/FloatCTA";
import CityInfo from "~/components/commons/CityInfo";
import MarketPrice from "~/components/pages/mansions/MarketPrice";
import MansionHistory from "~/components/pages/mansions/MansionHistory";
import SchoolReviews from "~/components/pages/schools/SchoolReviews";
import CitySummary from "~/components/pages/mansions/CitySummary";
import UnitSize from "~/components/pages/mansions/UnitSize";
import SeismicSafety from "~/components/pages/mansions/SeismicSafety";
import Nav from "~/components/pages/mansions/Nav";
import { useState } from "react";

const Mansion: React.FC = () => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const router = useRouter();
  const uniqueCode = router.query.uniqueCode as string;
  const { data, error, loading, fetchMore } = useQuery(MansionDocument, {
    variables: { uniqueCode },
  });
  const canonical = buildLibraryPagePath("mansions", data.mansion.uniqueCode);
  const prefecture = data.mansion.prefecture;
  const city = data.mansion.city;
  const historyPageInfo = data.mansion.salesHistories?.pageInfo;
  const name = data.mansion.name;
  const hasHistoryNextPage = historyPageInfo.hasNextPage;
  const onLoadMore = () => {
    if (fetchMore == null) {
      return;
    }
    setIsLoadingMore(true);
    fetchMore({
      variables: {
        uniqueCode,
        historyCursor: historyPageInfo.endCursor,
      },
    }).finally(() => setIsLoadingMore(false));
  };

  const breadcrumbs = [
    {
      name: "Housiiトップ",
      path: "https://ieul.jp/buy/",
    },
    {
      name: "マンションライブラリー",
      path: buildLibraryPagePath(),
    },
    {
      name: `${prefecture.name}`,
      path: "/prefectures/[jisCode]",
      asLink: buildLibraryPagePath("prefectures", prefecture.jisCode),
    },
    {
      name: `${city.name}`,
      path: buildLibraryPagePath("cities", city.jisCode),
    },
    {
      name: `${data.mansion.town.name}`,
      path: buildLibraryPagePath("towns", data.mansion.town.id),
    },
    {
      name: name,
      path: "/mansions/[uniqueCode]",
      asLink: buildLibraryPagePath("mansions", uniqueCode),
    },
  ];

  const hasSimilarMansions = data.mansion.similarMansions?.edges?.length > 0;
  const hasAccess = data.mansion.access.length > 0;

  if (loading) return <p>Loading...</p>;
  // TODO: fix
  if (error || data.mansion == null) {
    return null;
  }

  return (
    <Layout
      title={`${name}(${prefecture.name}${city.name})の物件情報`}
      description={`${name}(${prefecture.name}${city.name})のプレミアム中古マンション情報・販売情報ならHousii。物件の販売情報・価格推移・詳細情報・周辺のマンション情報を掲載しています。人気の高いプレミアム購入中古マンションの売却情報・価格推移、他マンションとの比較情報などが満載。`}
      breadcrumbs={breadcrumbs}
      pages={"mansions"}
      url={canonical}
    >
      <ProductJsonLd
        data={data.mansion}
        description={`${name}(${prefecture.name}${city.name})のプレミアム中古マンション情報・販売情報ならHousii。物件の販売情報・価格推移・詳細情報・周辺のマンション情報を掲載しています。人気の高いプレミアム購入中古マンションの売却情報・価格推移、他マンションとの比較情報などが満載。`}
      />
      <div className={styles.container}>
        <Nav />
        <BaseInfo data={data.mansion} />
        <section className={styles.content} id="used">
          <h2>
            <BoxHeading>この物件の価格を見る</BoxHeading>
          </h2>
          <SalesSummary data={data.mansion} />
          <SalesHistories
            data={data.mansion}
            onLoadMore={onLoadMore}
            isLoadingMore={isLoadingMore}
            hasHistoryNextPage={hasHistoryNextPage}
          />
        </section>
        <section className={styles.content} id="info">
          <h2>
            <BoxHeading>{name}情報</BoxHeading>
          </h2>
          <UnitSize data={data.mansion} />
          <SeismicSafety data={data.mansion} />
        </section>
        <section className={styles.content}>
          <h2>
            <BoxHeading>地図</BoxHeading>
          </h2>
          {hasAccess && <Access data={data.mansion} />}
        </section>
        <section className={styles.content} id="price">
          <h2>
            <BoxHeading>
              {name}がある{data.mansion.city.name}の相場情報
            </BoxHeading>
          </h2>
          <MarketPrice data={data.mansion} />
          <CitySummary data={data.mansion} />
        </section>
        <MembersCTA mansionName={name} pageView={data.mansion.pageView} />
        <CityInfo data={data.mansion.city} className={"m_y_30px"} />
        <SchoolReviews
          title={`${name}の小学校の評価`}
          data={data.mansion.primarySchool}
        />
        <MembersCTA mansionName={name} pageView={data.mansion.pageView} />
        {hasSimilarMansions && (
          <section className={styles.content}>
            <h2>
              <BoxHeading>周辺環境</BoxHeading>
            </h2>
            <SimilarMansions data={data.mansion} />
          </section>
        )}
        <section className={styles.content} id="detail">
          <h2>
            <BoxHeading>物件概要</BoxHeading>
          </h2>
          <Details data={data.mansion} />
        </section>
        <MansionHistory data={data.mansion} />
      </div>
      <FloatCTA uniqueCode={uniqueCode} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo();
  const uniqueCode = params?.uniqueCode as string;

  // 重複しているマンションのuniqueIDを一つのuniqueIDに誘導するための処理。
  // pv数が分散してしまうのを防ぐ
  const redirectableUniqueCode = uniqueCode as keyof typeof redirectMansionsData;
  if (redirectMansionsData[redirectableUniqueCode]) {
    const location = buildLibraryPagePath(
      "mansions",
      redirectMansionsData[redirectableUniqueCode]
    );
    return redirect(location);
  }

  try {
    await apolloClient.query({
      query: MansionDocument,
      variables: { uniqueCode },
    });
  } catch (err) {
    if (!isNotFoundError(err as GraphQLError)) throw err;
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

export default Mansion;
