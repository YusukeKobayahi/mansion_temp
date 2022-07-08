import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  CityRankingsPageQuery,
  CityRankingsPageDocument,
} from "~/graphql/generated";
import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type CityRankingsPageProps = {
  data: CityRankingsPageQuery;
};

const CityRankingsPage: React.FC<CityRankingsPageProps> = ({
  data,
}: CityRankingsPageProps) => {
  const { city } = data;
  const { rankingMansions, prefecture } = city;
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
      name: `${city.name}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "cities", city.jisCode),
    },
  ]);
  const area = {
    prefecture: prefecture,
    prefectures: data.prefectures,
  };
  return (
    <RankingPageTamplate
      subject={city.name}
      city={city}
      mansions={rankingMansions}
      isNoindex={false}
      breadcrums={breadcrumbs}
      area={area}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "jisCode",
  CityRankingsPageDocument
);
export default CityRankingsPage;
