import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import omit from "lodash/omit";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import { isNotFoundError, GraphQLError } from "~/lib/graphql/errors";
import { DocumentNode } from "graphql";
import {
  insertSearchCondition,
  setQueryNumber,
  setQueryString,
  yenFormat,
  createDayThisMonth,
  createDayOneYearAndHalfMonthsAgo,
} from "~/lib/utils";
import { ModelQueryVariables, QueryVariables } from "~/lib/types";

import { BreadcrumbItemProps } from "~/components/commons/Breadcrumb";
import Layout from "~/components/templates/Layout";
import UnderlineHeading from "~/components/commons/headings/UnderlineHeading";
import InsertCTA from "~/components/commons/CTAs/InsertCTA";
import {
  MansionCardDataFragment,
  RankingCityInfoFragment,
} from "~/graphql/generated";
import Alert from "~/components/commons/Alert";
import styles from "./index.module.scss";
import AreaRankigLinks from "~/components/pages/rankings/AreaRankingLinks";
import { ComponentProps } from "react";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MansionCard from "~/components/molecules/MansionCard";
import classnames from "classnames";
import find from "lodash/find";

type RankingTamplateProps = {
  subject: string;
  city?: RankingCityInfoFragment;
  isNoindex: boolean;
  breadcrums: BreadcrumbItemProps[];
  mansions?: MansionCardDataFragment[] | null;
  children?: React.ReactNode;
  area?: ComponentProps<typeof AreaRankigLinks>;
};

const RankingTamplate: React.FC<RankingTamplateProps> = ({
  subject,
  city,
  isNoindex,
  breadcrums,
  mansions,
  children,
  area,
}: RankingTamplateProps) => {
  const title = `${subject}の人気中古マンションランキング`;
  const description = `${subject}からプレミアム中古マンションを探すならHousii。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションの売却情報・価格推移、他マンションとの比較情報などが満載。`;

  const areaDescription = (() => {
    if (!city) return "";
    const { name, prefecture, pricePredictions, info } = city;

    const dayThisMonth = createDayThisMonth();
    const dayOneYearAndHalfMonthsAgo = createDayOneYearAndHalfMonthsAgo();
    const todaySalePricePerSquare = find(pricePredictions.salePricePerSquare, [
      "date",
      dayThisMonth,
    ]);
    const oneYearAndHalfMonthsAgoSalePricePerSquare = find(
      pricePredictions.salePricePerSquare,
      ["date", dayOneYearAndHalfMonthsAgo]
    );
    const todayPrefectureSalePricePerSquare = find(
      prefecture.pricePredictions.salePricePerSquare,
      ["date", dayThisMonth]
    );
    const price = todaySalePricePerSquare
      ? Math.floor(Number(todaySalePricePerSquare["city"]))
      : undefined;
    const prefectureDiffPrice = (() => {
      if (!prefecture || !todayPrefectureSalePricePerSquare || !price) return 0;

      const originalPrice = price;
      const comparisonPrice = Number(
        todayPrefectureSalePricePerSquare["prefecture"]
      );

      return Math.floor(originalPrice - comparisonPrice);
    })();
    const changePrice = (() => {
      if (!price || !oneYearAndHalfMonthsAgoSalePricePerSquare) return 0;

      const originalPrice = price;
      const comparisonPrice = Number(
        oneYearAndHalfMonthsAgoSalePricePerSquare["city"]
      );

      return Math.floor(originalPrice - comparisonPrice);
    })();

    const kinfOfInfoText = (() => {
      if (!(info && info.age && info.income)) return "";
      const {
        age: { averageAge },
        income: { averageIncome },
      } = info;
      const income = Math.floor(averageIncome / 10000);

      if (income < 400 || !averageAge) return "一人暮らしに";
      else if (averageAge < 36) {
        if (income < 600) return "一人暮らしに";
        else return "一人暮らしにもファミリー層に";
      } else {
        if (income < 700) return "一人暮らしにもファミリー層にも";
        else return "ファミリー層に";
      }
    })();

    const kindOfPriceText = (() => {
      if (prefectureDiffPrice < 0) return "資産価値が上昇している";
      else return "購入しやすいタイミングの";
    })();

    return (
      <>
        {info && info.age && info.income && (
          <>
            {name}は平均年齢が{info.age.averageAge}歳、平均年収は
            {yenFormat(info.income.averageIncome)}で{kinfOfInfoText}
            おすすめのエリアです。
          </>
        )}
        {price && (
          <>
            {name}の平均相場は{yenFormat(price)}（㎡単価）であり、
            {prefecture.name}の平均に比べ、{yenFormat(prefectureDiffPrice)}
            {prefectureDiffPrice > 0 ? "高く" : "低く"}なっています。
            1年半前に比べ、{yenFormat(changePrice)}
            {changePrice > 0 ? "高く" : "低く"}なっているので、{kindOfPriceText}
            地域になっています。
          </>
        )}
      </>
    );
  })();

  return (
    <Layout
      title={title}
      description={description}
      isNoindex={isNoindex}
      breadcrumbs={breadcrums}
    >
      <h1 className={styles.title}>
        <UnderlineHeading>{title}</UnderlineHeading>
      </h1>
      <p className={classnames(styles.info)}>{areaDescription}</p>
      <div className={styles.main}>
        <div>
          {mansions && mansions.length ? (
            mansions.map((mansion, i) => (
              <div key={i} className={styles.item}>
                <BoxHeading>{i + 1}位</BoxHeading>
                <MansionCard
                  {...mansion}
                  writing={true}
                  eventParams={{
                    category: "msl_mansion_ranking",
                    action: "msl_cta_click",
                    label: "msl_lp_text",
                    value: 1,
                  }}
                />
                {i !== 0 && i % 5 === 0 && <InsertCTA />}
              </div>
            ))
          ) : (
            <Alert text="指定の検索条件でのマンションランキングが見つかりませんでした。" />
          )}
        </div>
        <div className="pcOnly">{area && <AreaRankigLinks {...area} />}</div>
      </div>
      {children}
    </Layout>
  );
};

export const getServerSidePropsTamplate = (
  key: keyof ModelQueryVariables,
  document: DocumentNode
): GetServerSideProps<{ [key: string]: any }, ParsedUrlQuery> => {
  return async ({ params, query }) => {
    const id = params?.id as string;
    const searchCondition: QueryVariables = {
      [key]: id,
      limit: 30,
    };
    const searchQuery = omit(query, ["paths"]);

    // strings
    insertSearchCondition(
      key,
      setQueryString(searchQuery[key]),
      searchCondition
    );
    // number
    insertSearchCondition(
      "limit",
      setQueryNumber(searchQuery["limit"]),
      searchCondition
    );

    try {
      const apolloClient = initializeApollo();
      const { data } = await apolloClient.query({
        query: document,
        variables: searchCondition,
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
};

export default RankingTamplate;
