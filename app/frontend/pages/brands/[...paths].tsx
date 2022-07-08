import { GetServerSideProps } from "next";
import {
  BrandsQuery,
  BrandsDocument,
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
  redirect,
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
import MainContent from "~/components/pages/brands/MainContent";
import omitBy from "lodash/omitBy";
import MiniRankingSlider from "~/components/pages/rankings/MiniRankingSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import MetaText from "~/lib/metaText";
import redirectBrandsData from "~/public/json/redirectBrands.json";
import has from "lodash/has";
import SpecificSearchConditionLinkGroup from "~/components/molecules/SpecificSearchConditionLinkGroup";

type BrandsProps = {
  data: BrandsQuery;
  mansionsData: MansionPaginationQuery;
  page: number;
  searchCondition: QueryVariables;
  canonicalUrl: string;
};

const Brands: React.FC<BrandsProps> = ({
  data,
  mansionsData,
  searchCondition,
  canonicalUrl,
}: BrandsProps) => {
  const brands = data.brands;
  const brandPath = buildLibraryPagePath("brands", brands[0].id);
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
  const brandNames = brands.map(({ name }) => name);
  const subject = getSubjectByList(brandNames);

  const { rankingMansions } = brands[0];
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
      path: buildLibraryPagePath("brands", brands[0].id),
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

  return (
    <Layout
      title={metaText.getBasicTitle()}
      description={metaText.getBasicDescription()}
      breadcrumbs={breadcrumbs}
      pages={"brands"}
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
            <Sort pathname={brandPath} searchCondition={searchCondition} />
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
        pathname={brandPath}
        totalCount={totalCount}
        searchCondition={searchCondition}
      />
      {rankingMansions && (
        <div className={"m_y_30px"}>
          <BoxHeading>{brands[0].name}のおすすめ物件</BoxHeading>
          <MiniRankingSlider rankingData={rankingMansions} />
        </div>
      )}
      <SpecificSearchConditionLinkGroup
        title={`${brands[0].name}を条件で絞る`}
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
  const brandId = paths[0];
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
    "brd",
    setQueryString(searchQuery?.brd ? searchQuery?.brd : brandId),
    searchCondition
  );
  const stringKeys: (keyof QueryVariables)[] = [
    "ct",
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

  // ctが検索条件にある場合は、/cities/にリダイレクト（ct,ln両方ある場合は、ctを優先）
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["st", "ln", "psc", "wd", "brd"],
      "cities"
    );
  }

  // stが検索条件にある場合は、/stations/にリダイレクト
  if (searchCondition.st) {
    return redirectByQuery(
      searchCondition,
      "st",
      ["ln", "psc", "wd", "brd"],
      "stations"
    );
  }

  // lnが検索条件にある場合は、/lines/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["psc", "wd", "brd"],
      "lines"
    );
  }

  // pscが検索条件にある場合は、/schools/にリダイレクト
  if (searchCondition.psc) {
    return redirectByQuery(searchCondition, "psc", ["wd", "brd"], "schools");
  }

  // wdが検索条件にある場合は、/freeword/にリダイレクト
  if (searchCondition.wd) {
    return redirectByQuery(searchCondition, "wd", ["brd"], "freeword");
  }

  const exclude =
    String(searchCondition.brd).split(",").length === 1 ? ["brd"] : [""];
  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition,
    exclude
  );

  const mainPath = buildLibraryPagePath("brands", brandId);

  // 検索key以外がquery,pathにある場合、除いたURLにリダイレクト
  if (detectUnnecessaryKeys(searchQuery)) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // pathが重複する場合、単一になるようにリダイレクト
  if (brandId === searchQuery?.brd) {
    return RedirectQueryByIsNoindex(canonicalQueryStringList, mainPath);
  }

  // 同じブランドなのに違うidのブランドが存在するため。
  // 重複したブランドのリダイレクト処理
  const getRedirectId = (id: string) => {
    if (has(redirectBrandsData, id)) {
      const deplicatedBrandId = id as keyof typeof redirectBrandsData;
      return redirectBrandsData[deplicatedBrandId];
    }
    return id;
  };

  if (!searchCondition.brd) {
    if (has(redirectBrandsData, brandId)) {
      const location = buildLibraryPagePath("brands", getRedirectId(brandId));
      return redirect(location);
    }
  } else {
    const brandIds: string[] = searchCondition.brd.split(",");
    const hasDeplicatedId = brandIds.some((id) => has(redirectBrandsData, id));

    if (hasDeplicatedId) {
      const newBrandsIds = brandIds.map(getRedirectId);
      searchCondition.brd = newBrandsIds.join(",");
      const queryList = buildCanonicalQueryStringList(searchCondition);
      const path = buildLibraryPagePath("brands", newBrandsIds[0]);
      const location = `${path}${queryList.length ? "?" : ""}${queryList.join(
        ","
      )}`;
      return redirect(location);
    }
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: BrandsDocument,
      variables: { brd: searchCondition.brd },
    });

    if (data.brands.length === 0) {
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

export default Brands;
