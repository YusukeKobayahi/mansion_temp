import { GetServerSideProps } from "next";
import {
  LinesQuery,
  LinesDocument,
  MansionPaginationQuery,
  MansionPaginationDocument,
} from "~/graphql/generated";
import { initializeApollo } from "~/lib/graphql/apolloClient";
import styles from "~/pages/cities/index.module.scss";
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
import MainContent from "~/components/pages/lines/MainContent";
import OtherStations from "~/components/pages/lines/OtherStations";
import MarketPrice from "~/components/pages/lines/MarketPrice";
import PassedCities from "~/components/pages/lines/PassedCities";
import BackLink from "~/components/commons/BackLink";
import omitBy from "lodash/omitBy";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MetaText from "~/lib/metaText";
import SpecificSearchConditionLinkGroup from "~/components/molecules/SpecificSearchConditionLinkGroup";
import Writing from "~/components/pages/lines/Writing";

type LinesProps = {
  data: LinesQuery;
  mansionsData: MansionPaginationQuery;
  page: number;
  searchCondition: QueryVariables;
  canonicalQueryStringList: string[];
  canonicalUrl: string;
};

const Lines: React.FC<LinesProps> = ({
  data,
  mansionsData,
  searchCondition,
  canonicalUrl,
}: LinesProps) => {
  const lines = data.lines;
  const linePath = buildLibraryPagePath("lines", lines[0].id);
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
  const lineNames = lines.map(({ name }) => name);
  const subject = getSubjectByList(lineNames);

  const { rankingMansions } = lines[0];
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
      path: buildLibraryPagePath("lines", lines[0].id),
    },
  ];

  const isNoindex = Boolean(mansionsData.mansionPagination.isNoindex);
  // indexさせるページの一時的な判定
  const isBuildMainText = detectNoindex(searchCondition, totalCount);

  const { mainText, areaText } = buildMainTexts({
    isBuildMainText,
    subject,
    searchCondition,
  });
  const metaText = new MetaText({
    subject,
    conditions: searchCondition,
  });
  const title = metaText.getBasicTitle();
  const description = metaText.getBasicDescription();

  const passedCities = lines.map((line, i) => (
    <PassedCities key={i} data={line} />
  ));

  return (
    <Layout
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      pages={"lines"}
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
            <Sort pathname={linePath} searchCondition={searchCondition} />
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
        pathname={linePath}
        totalCount={totalCount}
        searchCondition={searchCondition}
      />
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>{lines[0].name}周辺のおすすめ物件</BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      {lines.length === 1 && <MarketPrice data={lines[0]} />}
      <Writing {...lines[0]} />
      {passedCities}
      <OtherStations data={data} />
      <SpecificSearchConditionLinkGroup
        title={`${lines[0].name}を条件で絞る`}
      />
      {lines.length === 1 && Object.keys(searchCondition).length > 1 && (
        <BackLink
          name={data.lines[0].name}
          page={"lines"}
          id={data.lines[0].id}
        />
      )}
      <FloatCTA page="msl_ichiran" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const paths = params?.paths as string[];
  const lineId = paths[0];
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
    "ln",
    setQueryString(searchQuery?.ln ? searchQuery?.ln : lineId),
    searchCondition
  );

  const stringKeys: (keyof QueryVariables)[] = [
    "st",
    "ct",
    "tw",
    "psc",
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

  const mainPath = buildLibraryPagePath("lines", lineId);

  // twが検索条件にある場合は、/towns/にリダイレクト
  if (searchCondition.tw) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["ct", "st", "ln", "psc", "brd", "wd"],
      "towns"
    );
  }

  // ctが検索条件にある場合は、/cities/にリダイレクト
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["st", "ln", "psc", "brd", "wd"],
      "cities"
    );
  }

  // stが検索条件にある場合は、/stations/にリダイレクト
  if (searchCondition.st) {
    return redirectByQuery(
      searchCondition,
      "st",
      ["ln", "psc", "brd", "wd"],
      "stations"
    );
  }

  // pscが検索条件にある場合は、/schools/にリダイレクト
  if (searchCondition.psc) {
    return redirectByQuery(
      searchCondition,
      "psc",
      ["ln", "wd", "brd"],
      "schools"
    );
  }

  // brdが検索条件にある場合は、/brands/にリダイレクト
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["ln", "wd"], "brands");
  }

  // wdが検索条件にある場合は、/freeword/にリダイレクト
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["ln"], "freeword");
  }

  const exclude =
    String(searchCondition.ln).split(",").length === 1 ? ["ln"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  // 検索key以外がquery,pathにある場合、除いたURLにリダイレクト
  if (detectUnnecessaryKeys(searchQuery)) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // pathが重複する場合、単一になるようにリダイレクト
  if (lineId === searchQuery?.ln) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: LinesDocument,
      variables: { ln: searchCondition.ln },
    });

    if (data.lines.length === 0) {
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
      },
    };
  } catch (err) {
    if (!isNotFoundError(err as GraphQLError)) throw err;
    return {
      notFound: true,
    };
  }
};

export default Lines;
