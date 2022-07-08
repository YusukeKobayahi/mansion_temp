import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  TownRankingsPageQuery,
  TownRankingsPageDocument,
} from "~/graphql/generated";

import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type TownRankigsPageProps = {
  data: TownRankingsPageQuery;
};
const TownRankigsPage: React.FC<TownRankigsPageProps> = ({
  data,
}: TownRankigsPageProps) => {
  const { town } = data;
  const { rankingMansions, city } = town;
  const { prefecture } = city;
  const isNoindex = false;
  const breadcrumbs = buildBasicBreadcrubms([
    {
      name: `${prefecture.name}のマンション一覧`,
      path: buildLibraryPagePath("prefectures", prefecture.jisCode),
    },
    {
      name: `${city.name}のマンション一覧`,
      path: buildLibraryPagePath("cities", city.jisCode),
    },
    {
      name: `${town.name}のマンション一覧`,
      path: buildLibraryPagePath("towns", town.id),
    },
    {
      name: `${town.name}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "towns", town.id),
    },
  ]);
  const area = {
    prefecture: data.town.city.prefecture,
    prefectures: data.prefectures,
  };
  return (
    <RankingPageTamplate
      subject={town.name}
      city={town.city}
      mansions={rankingMansions}
      isNoindex={isNoindex}
      breadcrums={breadcrumbs}
      area={area}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "tw",
  TownRankingsPageDocument
);
export default TownRankigsPage;
