import { GetServerSideProps } from "next";
import {
  CitiesQuery,
  CitiesDocument,
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
import CityInfo from "~/components/commons/CityInfo";
import MenuCTA from "~/components/commons/CTAs/MenuCTA";
import { QueryVariables } from "~/lib/types";
import MainContent from "~/components/pages/cities/MainContent";
import OtherCities from "~/components/pages/cities/OtherCities";
import MarketPrice from "~/components/pages/cities/MarketPrice";
import CityInfoAuto from "~/components/pages/cities/Info/Auto";
import CityInfoWriting from "~/components/pages/cities/Info/Writing";
import IndexedTowns from "~/components/pages/towns/IndexedTowns";
import IncludedStations from "~/components/pages/cities/IncludedStations";
import NeighborCities from "~/components/pages/cities/NeighborCities";
import BackLink from "~/components/commons/BackLink";
import omitBy from "lodash/omitBy";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MetaText from "~/lib/metaText";
import SpecificSearchConditionLinkGroup from "~/components/molecules/SpecificSearchConditionLinkGroup";

type CityProps = {
  data: CitiesQuery;
  mansionsData: MansionPaginationQuery;
  page: number;
  searchCondition: QueryVariables;
  canonicalUrl: string;
};

const City: React.FC<CityProps> = ({
  data,
  mansionsData,
  searchCondition,
  canonicalUrl,
}: CityProps) => {
  const cities = data.cities;
  const cityPath = buildLibraryPagePath("cities", cities[0].jisCode);
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
  const cityNames = cities.map(({ name }) => name);
  const subject = getSubjectByList(cityNames);
  const longCityNames = cities.map(
    ({ name, prefecture }) => `${prefecture.name}${name}`
  );
  const longSubject = getSubjectByList(longCityNames);

  const { rankingMansions } = cities[0];
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
      name: `${cities[0].prefecture.name}????????????????????????`,
      path: buildLibraryPagePath("prefectures", cities[0].prefecture.jisCode),
    },
    {
      name: `${subject}????????????????????????`,
      path: buildLibraryPagePath("towns", cities[0].jisCode),
    },
  ];

  const isNoindex = Boolean(mansionsData.mansionPagination?.isNoindex);
  // index???????????????????????????????????????
  const isBuildMainText = detectNoindex(searchCondition, totalCount);

  const { mainText, areaText } = buildMainTexts({
    isBuildMainText,
    subject: longSubject,
    searchCondition,
  });
  const metaText = new MetaText({
    subject,
    prefecture: cities[0].prefecture,
    conditions: searchCondition,
  });
  const title = metaText.getBasicTitle();
  const description = metaText.getBasicDescription();

  const indexedTowns = cities.map((city, i) => (
    <IndexedTowns key={i} data={city} />
  ));

  const includedStations = cities.map((city, i) => (
    <IncludedStations key={i} data={city} />
  ));

  const neighborCities = cities.map((city, i) => (
    <NeighborCities key={i} data={city} />
  ));

  return (
    <Layout
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      pages={"cities"}
      url={canonicalUrl}
      isNoindex={isNoindex}
      mainClassName={styles.main}
    >
      <BaseInfo
        mainText={mainText}
        areaText={areaText}
        isNoindex={isNoindex && isBuildMainText}
        totalCount={totalCount}
      />
      <div className={styles.cityTop}>
        {totalCount !== 0 && (
          <>
            <CurrentPageNumber
              currentPage={currentPage}
              totalCount={totalCount}
            />
            <Sort pathname={cityPath} searchCondition={searchCondition} />
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
        pathname={cityPath}
        totalCount={totalCount}
        searchCondition={searchCondition}
      />
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>
            {cities[0].prefecture.name}
            {cities[0].name}???????????????????????????
          </BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      {cities.length === 1 && <MarketPrice data={cities[0]} />}
      {cities.length === 1 && cities[0].writing ? (
        <CityInfoWriting data={cities[0]} />
      ) : cities.length === 1 ? (
        <CityInfoAuto data={cities[0]} citiesLength={cities[0].towns.length} />
      ) : null}
      {cities.length === 1 && <CityInfo data={cities[0]} />}
      {indexedTowns}
      {includedStations}
      {neighborCities}
      <OtherCities data={cities[0]} />
      <SpecificSearchConditionLinkGroup
        title={`${cities[0].name}??????????????????`}
      />
      {cities.length === 1 && Object.keys(searchCondition).length > 1 && (
        <BackLink
          name={data.cities[0].name}
          page={"cities"}
          id={data.cities[0].jisCode}
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
  const jisCode = paths[0];
  // paths????????????jisCode???pathQueries???????????????
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
    "ct",
    setQueryString(searchQuery?.ct ? searchQuery?.ct : jisCode),
    searchCondition
  );
  const stringKeys: (keyof QueryVariables)[] = [
    "tw",
    "st",
    "ln",
    "psc",
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

  const mainPath = buildLibraryPagePath("cities", jisCode);

  // tw????????????????????????????????????/towns/?????????????????????
  if (searchCondition.tw) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["ct", "st", "ln", "wd", "brd", "psc"],
      "towns"
    );
  }

  // st????????????????????????????????????/stations/?????????????????????
  if (searchCondition.st) {
    return redirectByQuery(
      searchCondition,
      "st",
      ["ct", "ln", "wd", "brd", "psc"],
      "stations"
    );
  }

  // ln????????????????????????????????????/lines/?????????????????????
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["ct", "wd", "brd", "psc"],
      "lines"
    );
  }

  // psc????????????????????????????????????/schools/?????????????????????
  if (searchCondition.psc) {
    return redirectByQuery(
      searchCondition,
      "psc",
      ["ct", "wd", "brd"],
      "schools"
    );
  }

  // brd????????????????????????????????????/brands/?????????????????????
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["ct", "wd"], "brands");
  }

  // wd????????????????????????????????????/freeword/?????????????????????
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["ct"], "freeword");
  }

  const exclude =
    String(searchCondition.ct).split(",").length === 1 ? ["ct"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  // ??????key?????????query,path???????????????????????????URL?????????????????????
  if (detectUnnecessaryKeys(searchQuery)) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // path??????????????????????????????????????????????????????????????????
  if (jisCode === searchQuery?.ct) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: CitiesDocument,
      variables: { ct: searchCondition.ct },
    });

    if (data.cities.length === 0) {
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

    const isNoindex = Boolean(mansionsData.mansionPagination?.isNoindex);

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

export default City;
