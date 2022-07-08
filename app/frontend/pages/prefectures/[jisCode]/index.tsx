import { GetServerSideProps } from "next";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import { useRouter } from "next/router";
import { PrefectureDocument, PrefectureQuery } from "~/graphql/generated";
import { buildLibraryPagePath } from "~/lib/utils";
import { GraphQLError, isNotFoundError } from "~/lib/graphql/errors";

import styles from "~/pages/prefectures/[jisCode]/index.module.scss";
import Layout from "~/components/templates/Layout";
import UnderlineHeading from "~/components/commons/headings/UnderlineHeading";
import Cities from "~/components/pages/prefectures/Cities";
import Lines from "~/components/pages/prefectures/Lines";
import MembersCTA from "~/components/pages/prefectures/MembersCTA";
import FloatCTA from "~/components/commons/CTAs/FloatCTA";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import BottomCTA from "~/components/commons/CTAs/BottomCTA";

export interface PrefectureProps {
  data: PrefectureQuery;
}

const Prefecture: React.FC<PrefectureProps> = ({ data }) => {
  const router = useRouter();
  const jisCode = router.query.jisCode as string;
  const canonical = buildLibraryPagePath("prefectures", jisCode);
  const prefectureName = data.prefecture.name;
  const { rankingMansions } = data.prefecture;
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
      name: `${prefectureName}のマンションを探す`,
      path: "prefectures/[jisCode]",
      asLink: buildLibraryPagePath("prefectures", jisCode),
    },
  ];

  return (
    <Layout
      title={`${prefectureName}の中古マンションを探す`}
      description={`${prefectureName}のプレミアム中古マンションを探すならHousii。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションの売却情報・価格推移、他マンションとの比較情報などが満載。`}
      breadcrumbs={breadcrumbs}
      pages={"prefectures"}
      url={canonical}
    >
      <h1 className={styles.title}>
        <UnderlineHeading>{`${prefectureName}のマンションを探す`}</UnderlineHeading>
      </h1>
      <p className={styles.description}>
        {`${prefectureName}のマンションは`}
        <span
          className={styles.emphasisText}
        >{`${data.prefecture.mansionCount}件`}</span>
        掲載されています。
      </p>
      <p className={styles.description}>閲覧したいエリアを選択してください。</p>
      <MembersCTA position="top" subject={prefectureName} />
      <Cities data={data.prefecture} />
      <Lines data={data.prefecture} />
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>{prefectureName}のおすすめ物件</BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      <div className={styles.bottom_cta_container}>
        <BottomCTA />
      </div>
      <FloatCTA page={"msl_prefectures"} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const jisCode = params?.jisCode as string;

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: PrefectureDocument,
      variables: { jisCode },
    });

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

export default Prefecture;
