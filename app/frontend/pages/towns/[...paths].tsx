import { GetServerSideProps } from "next";
import {
  TownsQuery,
  TownsDocument,
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
import MainContent from "~/components/pages/towns/MainContent";
import MarketPrice from "~/components/pages/towns/MarketPrice";
import IndexedTowns from "~/components/pages/towns/IndexedTowns";
import TownInfoWriting from "~/components/pages/towns/Info/Writing";
import CityInfoAuto from "~/components/pages/cities/Info/Auto";
import CityInfoWriting from "~/components/pages/cities/Info/Writing";
import OtherCities from "~/components/pages/cities/OtherCities";
import CityInfo from "~/components/commons/CityInfo";
import LinkedStations from "~/components/pages/towns/LinkedStations";
import LinkedTowns from "~/components/pages/towns/LinkedTowns";
import LinkedBuildings from "~/components/pages/towns/LinkedBuildings";
import IncludedStations from "~/components/pages/cities/IncludedStations";
import NeighborCities from "~/components/pages/cities/NeighborCities";
import BackLink from "~/components/commons/BackLink";
import uniq from "lodash/uniq";
import uniqBy from "lodash/uniqBy";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MetaText from "~/lib/metaText";
import SpecificSearchConditionLinkGroup from "~/components/molecules/SpecificSearchConditionLinkGroup";

type TownsProps = {
  data: TownsQuery;
  mansionsData: MansionPaginationQuery;
  searchCondition: QueryVariables;
  canonicalUrl: string;
};

const Towns: React.FC<TownsProps> = ({
  data,
  mansionsData,
  searchCondition,
  canonicalUrl,
}: TownsProps) => {
  const towns = data.towns;
  const townPath = buildLibraryPagePath("towns", towns[0].id);
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
  const townNames = towns.map(({ name }) => name);
  const subject = getSubjectByList(townNames);
  const longTownNames = towns.map(
    ({ name, city }) => `${name}（${city.prefecture.name}${city.name})`
  );
  const longSubject = getSubjectByList(longTownNames);

  const { rankingMansions } = towns[0];
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
      name: `${towns[0].city?.prefecture.name}のマンション一覧`,
      path: buildLibraryPagePath(
        "prefectures",
        towns[0].city.prefecture.jisCode
      ),
    },
    uniq(towns.map((town) => town.city?.jisCode)).length == 1
      ? {
          name: `${towns[0].city?.name}のマンション一覧`,
          path: buildLibraryPagePath("cities", towns[0].city.jisCode),
        }
      : { name: "", path: "" },
    {
      name: `${subject}のマンション一覧`,
      path: buildLibraryPagePath("towns", towns[0].id),
    },
  ];

  const isNoindex = Boolean(mansionsData.mansionPagination.isNoindex);
  // indexさせるページの一時的な判定
  const isBuildMainText = detectNoindex(searchCondition, totalCount);

  const { mainText, areaText } = buildMainTexts({
    isBuildMainText,
    subject: longSubject,
    searchCondition,
  });
  const metaText = new MetaText({
    subject: towns[0].name,
    prefecture: towns[0].city?.prefecture,
    conditions: searchCondition,
  });
  const title = metaText.getBasicTitle();
  const description = metaText.getBasicDescription();

  const uniqCities = uniqBy(towns, (town) => town.city.jisCode);
  const indexedTowns = uniqCities.map((town, i) => (
    <IndexedTowns key={i} data={town.city} />
  ));

  const includedStations = uniqCities.map((town, i) => (
    <IncludedStations key={i} data={town.city} />
  ));

  const neighborCities = uniqCities.map((town, i) => (
    <NeighborCities key={i} data={town.city} />
  ));

  const linkedStations = towns.map((town, i) => (
    <LinkedStations key={i} data={town} />
  ));

  const linkedTowns = towns.map((town, i) => (
    <LinkedTowns key={i} data={town} />
  ));

  const linkedBuildings = towns.map((town, i) => (
    <LinkedBuildings key={i} data={town} />
  ));

  return (
    <Layout
      title={title}
      description={description}
      breadcrumbs={breadcrumbs}
      pages={"towns"}
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
            <Sort pathname={townPath} searchCondition={searchCondition} />
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
        pathname={townPath}
        totalCount={totalCount}
        searchCondition={searchCondition}
      />
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>
            {towns[0].city.prefecture.name}
            {towns[0].city.name}
            {towns[0].name}周辺のおすすめ物件
          </BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      {uniqCities.length === 1 && <MarketPrice data={towns[0]} />}
      {towns.length !== 0 && towns[0].writing ? (
        <TownInfoWriting data={towns[0]} />
      ) : uniqCities.length === 1 && towns[0].city.writing ? (
        <CityInfoWriting data={towns[0].city} />
      ) : uniqCities.length === 1 ? (
        <CityInfoAuto
          data={towns[0].city}
          citiesLength={towns[0].city.towns.length}
        />
      ) : null}
      {uniqCities.length === 1 && <CityInfo data={towns[0].city} />}
      {indexedTowns}
      {includedStations}
      {neighborCities}
      {linkedStations}
      {linkedTowns}
      <OtherCities data={towns[0].city} />
      {linkedBuildings}
      {towns.length === 1 && Object.keys(searchCondition).length > 1 && (
        <BackLink
          name={data.towns[0].name}
          page={"towns"}
          id={data.towns[0].id}
        />
      )}
      <SpecificSearchConditionLinkGroup
        title={`${towns[0].name}を条件で絞る`}
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
  const townId = paths[0];
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
  const searchQuery = Object.assign({}, query, pathQueries);

  insertSearchCondition(
    "tw",
    setQueryString(searchQuery?.tw ? searchQuery?.tw : townId),
    searchCondition
  );

  const stringKeys: (keyof QueryVariables)[] = [
    "st",
    "ln",
    "ct",
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

  const mainPath = buildLibraryPagePath("towns", townId);

  // ctが検索条件にある場合は、/cities/にリダイレクト
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["tw", "st", "ln", "psc", "wd", "brd"],
      "cities"
    );
  }

  // stが検索条件にある場合は、/stations/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "st",
      ["tw", "ln", "psc", "wd", "brd"],
      "lines"
    );
  }

  // lnが検索条件にある場合は、/lines/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["tw", "psc", "wd", "brd"],
      "lines"
    );
  }

  // pscが検索条件にある場合は、/schools/にリダイレクト
  if (searchCondition.psc) {
    return redirectByQuery(
      searchCondition,
      "psc",
      ["tw", "wd", "brd"],
      "schools"
    );
  }

  // brdが検索条件にある場合は、/brands/にリダイレクト
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["tw", "wd"], "brands");
  }

  // wdが検索条件にある場合は、/freeword/にリダイレクト
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["tw"], "freeword");
  }

  const exclude =
    String(searchCondition.tw).split(",").length === 1 ? ["tw"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  // pathが重複する場合、単一になるようにリダイレクト
  if (townId === searchQuery?.tw) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: TownsDocument,
      variables: { tw: searchCondition.tw },
    });

    if (data.towns.length === 0) {
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

export default Towns;
