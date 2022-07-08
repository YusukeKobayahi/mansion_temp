import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  SchoolRankingsPageQuery,
  SchoolRankingsPageDocument,
} from "~/graphql/generated";
import Custom404 from "~/pages/404";

import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type SchoolRankigsPageProps = {
  data: SchoolRankingsPageQuery;
};
const SchoolRankigsPage: React.FC<SchoolRankigsPageProps> = ({
  data,
}: SchoolRankigsPageProps) => {
  if (!data.primarySchools.length) return <Custom404 />;
  const school = data.primarySchools[0];

  const { rankingMansions } = school;
  const subject = `${school.name}区`;
  const isNoindex = false;
  const breadcrumbs = buildBasicBreadcrubms([
    {
      name: `${subject}のマンション一覧`,
      path: buildLibraryPagePath("schools", school.schoolId),
    },
    {
      name: `${subject}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "schools", school.schoolId),
    },
  ]);

  const area = {
    prefecture: school.city?.prefecture,
    prefectures: data.prefectures,
  };
  return (
    <RankingPageTamplate
      subject={subject}
      city={school.city || undefined}
      mansions={rankingMansions}
      isNoindex={isNoindex}
      breadcrums={breadcrumbs}
      area={area}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "psc",
  SchoolRankingsPageDocument
);
export default SchoolRankigsPage;
