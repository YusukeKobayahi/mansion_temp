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
  const stationNames = stations.map(({ name }) => `${name}???`);
  const subject = getSubjectByList(stationNames);

  const { rankingMansions } = stations[0];
  const breadcrumbs = [
    {
      name: "Housii?????????",
      path: "https://ieul.jp/buy/",
    },
    {
      name: "?????????????????????????????????",
      path: buildLibraryPagePath(),
    },
    {
      name: `${stations[0].city?.prefecture.name}????????????????????????`,
      path: buildLibraryPagePath(
        "prefectures",
        String(stations[0].city?.prefecture.jisCode)
      ),
    },
    uniq(stations.map((station) => station.city?.jisCode)).length == 1
      ? {
          name: `${stations[0].city?.name}????????????????????????`,
          path: buildLibraryPagePath(
            "cities",
            String(stations[0].city?.jisCode)
          ),
        }
      : { name: "", path: "" },
    {
      name: `${subject}????????????????????????`,
      path: buildLibraryPagePath("stations", stations[0].id),
    },
  ];

  const isNoindex = Boolean(mansionsData.mansionPagination.isNoindex);
  // index???????????????????????????????????????
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
          title={`?????????????????????????????????????????????????????????????????????`}
          commuteStations={stations[0].commuteStations}
        />
      )}
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>{stations[0].name}??????????????????????????????</BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      {stations.length === 1 && <MarketPrice data={stations[0]} />}
      {includedStations}
      {includedCity}
      {neighborStations}
      <SpecificSearchConditionLinkGroup
        title={`${stations[0].name}?????????????????????`}
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
  // paths????????????st???pathQueries???????????????
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

  // tw????????????????????????????????????/towns/?????????????????????
  if (searchCondition.tw) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["ct", "st", "ln", "psc", "wd", "brd"],
      "towns"
    );
  }

  // ct????????????????????????????????????/cities/?????????????????????
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["st", "ln", "psc", "wd", "brd"],
      "cities"
    );
  }

  // ln????????????????????????????????????/lines/?????????????????????
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["st", "psc", "wd", "brd"],
      "lines"
    );
  }

  // psc????????????????????????????????????/schools/?????????????????????
  if (searchCondition.psc) {
    return redirectByQuery(
      searchCondition,
      "psc",
      ["st", "wd", "brd"],
      "schools"
    );
  }

  // brd????????????????????????????????????/brands/?????????????????????
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["st", "wd"], "brands");
  }

  // wd????????????????????????????????????/freeword/?????????????????????
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["st"], "freeword");
  }

  const exclude =
    String(searchCondition.st).split(",").length === 1 ? ["st"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  // ??????key?????????query,path???????????????????????????URL?????????????????????
  if (detectUnnecessaryKeys(searchQuery)) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // path??????????????????????????????????????????????????????????????????
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

    // ???????????????????????????
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
