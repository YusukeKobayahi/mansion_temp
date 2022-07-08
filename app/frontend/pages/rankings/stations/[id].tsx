import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  StationRankingsPageQuery,
  StationRankingsPageDocument,
} from "~/graphql/generated";

import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type TownRankigsPageProps = {
  data: StationRankingsPageQuery;
};
const TownRankigsPage: React.FC<TownRankigsPageProps> = ({
  data,
}: TownRankigsPageProps) => {
  const { station } = data;
  const { rankingMansions, city } = station;
  const { prefecture } = city;
  const subject = `${station.name}駅`;
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
      name: `${subject}のマンション一覧`,
      path: buildLibraryPagePath("stations", station.id),
    },
    {
      name: `${subject}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "stations", station.id),
    },
  ]);
  const area = {
    prefecture: prefecture,
    prefectures: data.prefectures,
  };
  return (
    <RankingPageTamplate
      subject={subject}
      city={station.city}
      mansions={rankingMansions}
      isNoindex={isNoindex}
      breadcrums={breadcrumbs}
      area={area}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "st",
  StationRankingsPageDocument
);
export default TownRankigsPage;
