import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  PrefectureRankingsPageQuery,
  PrefectureRankingsPageDocument,
} from "~/graphql/generated";

import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type PrefectureRankigsPageProps = {
  data: PrefectureRankingsPageQuery;
};
const PrefectureRankigsPage: React.FC<PrefectureRankigsPageProps> = ({
  data,
}: PrefectureRankigsPageProps) => {
  const { prefecture } = data;
  const { rankingMansions } = prefecture;
  const isNoindex = false;
  const breadcrumbs = buildBasicBreadcrubms([
    {
      name: `${prefecture.name}のマンション一覧`,
      path: buildLibraryPagePath("prefectures", prefecture.jisCode),
    },
    {
      name: `${prefecture.name}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "prefectures", prefecture.jisCode),
    },
  ]);
  return (
    <RankingPageTamplate
      subject={prefecture.name}
      mansions={rankingMansions}
      isNoindex={isNoindex}
      breadcrums={breadcrumbs}
      area={data}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "jisCode",
  PrefectureRankingsPageDocument
);
export default PrefectureRankigsPage;
