import { GetServerSideProps } from "next";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import { IndexDocument, IndexQuery } from "~/graphql/generated";
import { GraphQLError, isNotFoundError } from "~/lib/graphql/errors";
import { buildLibraryPagePath } from "~/lib/utils";

import styles from "~/pages/index.module.scss";
import Layout from "~/components/templates/Layout";
import Fv from "~/components/pages/index/Fv";
import MembersCTA from "~/components/pages/index/MembersCTA";
import PopularTowns from "~/components/pages/index/PopularTowns";
import Brands from "~/components/pages/index/Brands";
import Schools from "~/components/pages/index/Schools";
import Register from "~/components/pages/index/Register";
import Columns from "~/components/pages/index/Columns";
import WebSiteJsonLd from "~/components/commons/JsonLd/WebSite";
import CommuteStations from "~/components/pages/index/CommuteStations";
import ToggleContextProvider from "~/components/Context/ToggleContext";
import SearchConditionContextProvider from "~/components/Context/SearchConditionContext";
import { useState } from "react";
import SearchModal, {
  SearchModalTabType,
} from "~/components/organisms/SearchModal";

export interface LibraryProps {
  data: IndexQuery;
}

const LibraryIndex: React.FC<LibraryProps> = ({ data }) => {
  const [tab, setTab] = useState<SearchModalTabType>("City");
  const canonical = buildLibraryPagePath();
  const breadcrumbs = [
    {
      name: "Housiiトップ",
      path: "https://ieul.jp/buy/",
    },
    {
      name: "マンションライブラリー",
      path: buildLibraryPagePath(),
    },
  ];
  return (
    <Layout
      title="プレミアム中古マンションライブラリー"
      description="プレミアム中古マンションを探すための不動産ライブラリー・アーカイブならHousii。マンションの売却情報・価格推移、他マンションと比較ができます。あなたの住みたい中古マンションが見つかります。"
      mainClassName={styles.background}
      url={canonical}
    >
      <SearchConditionContextProvider searchCondition={{}}>
        <ToggleContextProvider>
          <WebSiteJsonLd />
          <section>
            <Fv
              breadcrumbs={breadcrumbs}
              data={data.prefectures}
              setTab={setTab}
            />
            <Register />
            <MembersCTA />
            <Columns data={data.prefectures} />
            <PopularTowns />
            <Brands />
            <Schools setTab={setTab} />
            <CommuteStations />
          </section>
          <SearchModal tab={tab} setTab={setTab} />
        </ToggleContextProvider>
      </SearchConditionContextProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({ query: IndexDocument });

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        data,
      },
    };
  } catch (err) {
    if (!isNotFoundError(err as GraphQLError)) throw err;
    return {
      notFound: true,
    };
  }
};

export default LibraryIndex;
