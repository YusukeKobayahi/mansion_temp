import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  LineRankingsPageQuery,
  LineRankingsPageDocument,
} from "~/graphql/generated";

import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type LineRankigsPageProps = {
  data: LineRankingsPageQuery;
};
const LineRankigsPage: React.FC<LineRankigsPageProps> = ({
  data,
}: LineRankigsPageProps) => {
  const { line } = data;
  const { rankingMansions } = line;
  const isNoindex = false;
  const breadcrumbs = buildBasicBreadcrubms([
    {
      name: `${line.name}のマンション一覧`,
      path: buildLibraryPagePath("lines", line.id),
    },
    {
      name: `${line.name}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "lines", line.id),
    },
  ]);
  return (
    <RankingPageTamplate
      subject={line.name}
      mansions={rankingMansions}
      isNoindex={isNoindex}
      breadcrums={breadcrumbs}
      area={data}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "ln",
  LineRankingsPageDocument
);
export default LineRankigsPage;
