import { GetServerSideProps } from "next";
import {
  PrimarySchoolsQuery,
  PrimarySchoolsDocument,
  MansionPaginationQuery,
  MansionPaginationDocument,
} from "~/graphql/generated";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import styles from "~/pages/cities/index.module.scss";
import omitBy from "lodash/omitBy";
import {
  buildLibraryPagePath,
  buildCanonicalQueryStringList,
  insertSearchCondition,
  setQueryNumber,
  setQueryString,
  buildCanonical,
  redirectByQuery,
  checkRedirectPathsByIsNoindex,
  RedirectPathsByIsNoindex,
  checkRedirectQueryByIsNoindex,
  RedirectQueryByIsNoindex,
  detectNoindex,
  detectUnnecessaryKeys,
  getSubjectByList,
  buildMainTexts,
} from "~/lib/utils";
import { GraphQLError, isNotFoundError } from "~/lib/graphql/errors";
import Layout from "~/components/templates/Layout";
import BaseInfo from "~/components/commons/BaseInfo";
import MembersCTA from "~/components/commons/CTAs/MembersCTA";
import Sort from "~/components/commons/Sort";
import CurrentPageNumber from "~/components/commons/CurrentPageNumber";
import FloatCTA from "~/components/commons/CTAs/FloatCTA";
import MenuCTA from "~/components/commons/CTAs/MenuCTA";
import { QueryVariables } from "~/lib/types";
import MainContent from "~/components/pages/schools/MainContent";
import OtherSchools from "~/components/pages/schools/OtherSchools";
import SchoolInfo from "~/components/pages/schools/SchoolInfo";
import SchoolReviews from "~/components/pages/schools/SchoolReviews";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MetaText from "~/lib/metaText";
import SpecificSearchConditionLinkGroup from "~/components/molecules/SpecificSearchConditionLinkGroup";

type SchoolsProps = {
  data: PrimarySchoolsQuery;
  mansionsData: MansionPaginationQuery;
  searchCondition: QueryVariables;
  canonicalUrl: string;
  isNoindex: boolean;
};

const Schools: React.FC<SchoolsProps> = ({
  data,
  mansionsData,
  searchCondition,
  canonicalUrl,
  isNoindex,
}: SchoolsProps) => {
  const schools = data.primarySchools;
  const stationPath = buildLibraryPagePath("schools", schools[0].schoolId);
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
  const schoolNames = schools.map(({ name }) => `${name}区`);
  const subject = getSubjectByList(schoolNames);

  const { rankingMansions } = schools[0];
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
      name: `${subject}のマンション一覧`,
      path: buildLibraryPagePath("schools", schools[0].schoolId),
    },
  ];

  // indexさせるページの一時的な判定
  const isBuildMainText = detectNoindex(searchCondition, totalCount);

  const { mainText, areaText } = buildMainTexts({
    isBuildMainText,
    subject,
    searchCondition,
  });
  const metaText = new MetaText({
    subject: schools[0].name,
    prefecture: schools[0].city?.prefecture,
    conditions: searchCondition,
  });
  const title = metaText.getBasicTitle();
  const description = metaText.getBasicDescription();

  return (
    <Layout
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      pages={"schools"}
      url={canonicalUrl}
      isNoindex={isNoindex}
      mainClassName={styles.main}
    >
      <BaseInfo
        mainText={mainText}
        areaText={areaText}
        isNoindex={isBuildMainText}
        totalCount={totalCount}
      />
      <div className={styles.cityTop}>
        {totalCount !== 0 && (
          <>
            <CurrentPageNumber
              currentPage={currentPage}
              totalCount={totalCount}
            />
            <Sort pathname={stationPath} searchCondition={searchCondition} />
          </>
        )}
        <MenuCTA />
      </div>
      <MembersCTA name={subject} />
      <MainContent
        data={data}
        mansionsData={mansionsData}
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={stationPath}
        totalCount={totalCount}
        searchCondition={searchCondition}
      />
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>{schools[0].name}区のおすすめ物件</BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      {schools.length === 1 && (
        <>
          <SchoolInfo {...schools[0]} className={"m_y_50px"} />
          <SchoolReviews
            title={`${schools[0].name}区の評価`}
            data={schools[0]}
          />
        </>
      )}
      <OtherSchools data={schools[0]} schoolName={schools[0].name} />
      <SpecificSearchConditionLinkGroup
        title={`${schools[0].name}区を条件で絞る`}
      />
      <FloatCTA page="msl_ichiran" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const paths = params?.paths as string[];
  const schoolId = paths[0];
  // pathsの最初のstはpathQueriesに含めない
  const pathQueries = [...paths].splice(1).reduce((acc: any, value) => {
    try {
      const [key, val] = value.split("=");
      return Object.assign(acc, {
        [key]: val,
      });
    } catch {
      return acc;
    }
  }, {});
  const searchCondition: QueryVariables = {};
  const searchQuery = Object.assign(
    {},
    omitBy({ ...query }, (_, key) => key == "paths"),
    pathQueries
  );

  insertSearchCondition(
    "psc",
    setQueryString(searchQuery?.psc ? searchQuery?.psc : schoolId),
    searchCondition
  );

  const stringKeys: (keyof QueryVariables)[] = [
    "st",
    "ln",
    "ct",
    "tw",
    "brd",
    "wd",
    "md",
    "orud",
    "orpr",
    "orar",
    "orck",
    "ormd",
  ];
  const numberKeys: (keyof QueryVariables)[] = [
    "eab",
    "eat",
    "prb",
    "prt",
    "tht",
    "ckt",
    "utb",
    "gfb",
    "gft",
    "page",
    "per",
  ];

  stringKeys.forEach((el) => {
    insertSearchCondition(el, setQueryString(searchQuery[el]), searchCondition);
  });
  numberKeys.forEach((el) => {
    insertSearchCondition(el, setQueryNumber(searchQuery[el]), searchCondition);
  });

  const mainPath = buildLibraryPagePath("schools", schoolId);

  // twが検索条件にある場合は、/towns/にリダイレクト
  if (searchCondition.tw) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["psc", "ct", "st", "ln", "brd", "wd"],
      "towns"
    );
  }

  // ctが検索条件にある場合は、/cities/にリダイレクト
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["psc", "st", "ln", "brd", "wd"],
      "cities"
    );
  }

  // stが検索条件にある場合は、/stations/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "st",
      ["psc", "ln", "brd", "wd"],
      "stations"
    );
  }

  // lnが検索条件にある場合は、/lines/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["psc", "brd", "wd"],
      "lines"
    );
  }

  // brdが検索条件にある場合は、/brands/にリダイレクト
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["psc", "wd"], "brands");
  }

  // wdが検索条件にある場合は、/freeword/にリダイレクト
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["psc"], "freeword");
  }

  const exclude =
    String(searchCondition.psc).split(",").length === 1 ? ["psc"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  // 検索key以外がquery,pathにある場合、除いたURLにリダイレクト
  if (detectUnnecessaryKeys(searchQuery)) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // pathが重複する場合、単一になるようにリダイレクト
  if (schoolId === searchQuery?.st) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: PrimarySchoolsDocument,
      variables: { psc: searchCondition.psc },
    });

    if (data.primarySchools.length === 0) {
      return {
        notFound: true,
      };
    }

    // マンション情報取得
    const mansionsDataAll = await apolloClient.query({
      query: MansionPaginationDocument,
      variables: searchCondition,
    });

    const mansionsData = mansionsDataAll.data;

    const isNoindex = Boolean(mansionsData.mansionPagination.isNoindex);
    console.log(isNoindex);
    if (checkRedirectPathsByIsNoindex(isNoindex, params, query)) {
      return RedirectPathsByIsNoindex(
        searchCondition,
        canonicalQueryStringList,
        mainPath
      );
    }
    if (checkRedirectQueryByIsNoindex(isNoindex, paths)) {
      return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
    }

    const canonicalUrl = buildCanonical(
      mainPath,
      canonicalQueryStringList,
      isNoindex,
      searchCondition
    );

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        data,
        mansionsData,
        searchCondition,
        canonicalUrl,
        isNoindex,
      },
    };
  } catch (err) {
    if (!isNotFoundError(err as GraphQLError)) throw err;
    return {
      notFound: true,
    };
  }
};

export default Schools;
