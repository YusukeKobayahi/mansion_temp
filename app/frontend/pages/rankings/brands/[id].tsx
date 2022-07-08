import { GetServerSideProps } from "next";
import { buildBasicBreadcrubms, buildLibraryPagePath } from "~/lib/utils";
import {
  BrandRankingsPageQuery,
  BrandRankingsPageDocument,
} from "~/graphql/generated";
import Custom404 from "~/pages/404";
import RankingPageTamplate, {
  getServerSidePropsTamplate,
} from "~/components/templates/rankings";

type BrandRankingsPageProps = {
  data: BrandRankingsPageQuery;
};

const BrandRankingsPage: React.FC<BrandRankingsPageProps> = ({
  data,
}: BrandRankingsPageProps) => {
  if (!data.brands.length) return <Custom404 />;
  const brand = data.brands[0];

  const { rankingMansions } = brand;
  const breadcrumbs = buildBasicBreadcrubms([
    {
      name: `${brand.name}のマンション一覧`,
      path: buildLibraryPagePath("brands", brand.id),
    },
    {
      name: `${brand.name}の人気物件ランキング`,
      path: buildLibraryPagePath("rankings", "brands", brand.id),
    },
  ]);
  return (
    <RankingPageTamplate
      subject={brand.name}
      mansions={rankingMansions}
      isNoindex={false}
      breadcrums={breadcrumbs}
      area={data}
    />
  );
};

export const getServerSideProps: GetServerSideProps = getServerSidePropsTamplate(
  "brd",
  BrandRankingsPageDocument
);
export default BrandRankingsPage;
