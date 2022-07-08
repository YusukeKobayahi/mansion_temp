import { GetServerSideProps } from "next";
import {
  StationsQuery,
  StationsDocument,
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
import MainContent from "~/components/pages/stations/MainContent";
import MarketPrice from "~/components/pages/stations/MarketPrice";
import IncludedStations from "~/components/pages/cities/IncludedStations";
import NeighborStations from "~/components/pages/stations/NeighborStations";
import IncludedCity from "~/components/pages/stations/IncludedCity";
import BackLink from "~/components/commons/BackLink";
import uniq from "lodash/uniq";
import omitBy from "lodash/omitBy";
import uniqBy from "lodash/uniqBy";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import StartStations from "~/components/pages/stations/StationInfo";
import MetaText from "~/lib/metaText";
import SpecificSearchConditionLinkGroup from "~/components/molecules/SpecificSearchConditionLinkGroup";

type StationsProps = {
  data: StationsQuery;
  mansionsData: MansionPaginationQuery;
  searchCondition: QueryVariables;
  canonicalUrl: string;
};

const Stations: React.FC<StationsProps> = ({
  data,
  mansionsData,
  searchCondition,
  canonicalUrl,
}: StationsProps) => {
  const stations = data.stations;
  const stationPath = buildLibraryPagePath("stations", stations[0].id);
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
  const stationNames = stations.map(({ name }) => `${name}駅`);
  const subject = getSubjectByList(stationNames);

  const { rankingMansions } = stations[0];
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
      name: `${stations[0].city?.prefecture.name}のマンション一覧`,
      path: buildLibraryPagePath(
        "prefectures",
        String(stations[0].city?.prefecture.jisCode)
      ),
    },
    uniq(stations.map((station) => station.city?.jisCode)).length == 1
      ? {
          name: `${stations[0].city?.name}のマンション一覧`,
          path: buildLibraryPagePath(
            "cities",
            String(stations[0].city?.jisCode)
          ),
        }
      : { name: "", path: "" },
    {
      name: `${subject}のマンション一覧`,
      path: buildLibraryPagePath("stations", stations[0].id),
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
    prefecture: stations[0].city?.prefecture,
    conditions: searchCondition,
  });
  const title = metaText.getBasicTitle();
  const description = metaText.getBasicDescription();
  const uniqCities = uniqBy(stations, (station) => station.city.jisCode);

  const includedStations = uniqCities.map((station, i) => (
    <IncludedStations key={i} data={station.city} />
  ));

  const neighborStations = stations.map((station, i) => (
    <NeighborStations key={i} data={station} />
  ));

  const includedCity = uniqCities.map((station, i) => (
    <IncludedCity
      key={i}
      station={station.name}
      name={station.city.name}
      jisCode={station.city.jisCode}
      mansionCount={station.city.mansionCount}
    />
  ));

  return (
    <Layout
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      pages={"stations"}
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
      {stations.length && (
        <StartStations
          title={`主要駅への通勤・通学圏内のおすすめ駅ランキング`}
          commuteStations={stations[0].commuteStations}
        />
      )}
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>{stations[0].name}駅周辺のおすすめ物件</BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      {stations.length === 1 && <MarketPrice data={stations[0]} />}
      {includedStations}
      {includedCity}
      {neighborStations}
      <SpecificSearchConditionLinkGroup
        title={`${stations[0].name}駅を条件で絞る`}
      />
      {stations.length === 1 && Object.keys(searchCondition).length > 1 && (
        <BackLink
          name={data.stations[0].name}
          page={"stations"}
          id={data.stations[0].id}
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
  const stationId = paths[0];
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
    "st",
    setQueryString(searchQuery?.st ? searchQuery?.st : stationId),
    searchCondition
  );

  const stringKeys: (keyof QueryVariables)[] = [
    "ln",
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

  const mainPath = buildLibraryPagePath("stations", stationId);

  // twが検索条件にある場合は、/towns/にリダイレクト
  if (searchCondition.tw) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["ct", "st", "ln", "psc", "wd", "brd"],
      "towns"
    );
  }

  // ctが検索条件にある場合は、/cities/にリダイレクト
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["st", "ln", "psc", "wd", "brd"],
      "cities"
    );
  }

  // lnが検索条件にある場合は、/lines/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["st", "psc", "wd", "brd"],
      "lines"
    );
  }

  // pscが検索条件にある場合は、/schools/にリダイレクト
  if (searchCondition.psc) {
    return redirectByQuery(
      searchCondition,
      "psc",
      ["st", "wd", "brd"],
      "schools"
    );
  }

  // brdが検索条件にある場合は、/brands/にリダイレクト
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["st", "wd"], "brands");
  }

  // wdが検索条件にある場合は、/freeword/にリダイレクト
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["st"], "freeword");
  }

  const exclude =
    String(searchCondition.st).split(",").length === 1 ? ["st"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  // 検索key以外がquery,pathにある場合、除いたURLにリダイレクト
  if (detectUnnecessaryKeys(searchQuery)) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // pathが重複する場合、単一になるようにリダイレクト
  if (stationId === searchQuery?.st) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: StationsDocument,
      variables: { st: searchCondition.st },
    });

    if (data.stations.length === 0) {
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

export default Stations;
