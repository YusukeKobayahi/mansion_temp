import { GetServerSideProps } from "next";
import {
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
} from "~/lib/utils";
import { GraphQLError, isNotFoundError } from "~/lib/graphql/errors";
import Layout from "~/components/templates/Layout";
import UnderlineHeading from "~/components/commons/headings/UnderlineHeading";
import Sort from "~/components/commons/Sort";
import CurrentPageNumber from "~/components/commons/CurrentPageNumber";
import FloatCTA from "~/components/commons/CTAs/FloatCTA";
import MenuCTA from "~/components/commons/CTAs/MenuCTA";
import { QueryVariables } from "~/lib/types";
import MainContent from "~/components/pages/freeword/MainContent";
import SearchBox from "~/components/pages/freeword/SearchBox";

type StationsProps = {
  mansionsData: MansionPaginationQuery;
  wd: string;
  page: number;
  searchCondition: QueryVariables;
  canonicalUrl: string;
};

const Stations: React.FC<StationsProps> = ({
  mansionsData,
  wd,
  page,
  searchCondition,
  canonicalUrl,
}: StationsProps) => {
  const pagepath = `${buildLibraryPagePath("freeword")}`;
  const currentPage = mansionsData.mansionPagination?.pagination.currentPage;
  const totalPages = mansionsData.mansionPagination?.pagination.totalPages;
  const totalCount = mansionsData.mansionPagination?.pagination.totalCount;
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
      name: `${wd}の検索結果`,
      path: `${pagepath}?wd=${wd}`,
    },
  ];

  const pageNumber = page ? `(${page}ページ)` : "";

  const isNoindex = true;

  const title = `${wd}の検索結果の中古マンションを探す${pageNumber}`;
  const description = `${wd}の検索結果のプレミアム中古マンションを探すならHousii。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションの売却情報・価格推移、他マンションとの比較情報などが満載。`;
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
      <h1 className={styles.title}>
        <UnderlineHeading>{wd}の検索結果</UnderlineHeading>
      </h1>
      <div className={styles.cityTop}>
        {totalCount !== 0 && (
          <>
            <CurrentPageNumber
              currentPage={currentPage}
              totalCount={totalCount}
            />
            <Sort pathname={pagepath} searchCondition={searchCondition} />
          </>
        )}
        <MenuCTA />
      </div>
      <SearchBox />
      <MainContent
        mansionsData={mansionsData}
        currentPage={currentPage}
        totalPages={totalPages}
        pathname={pagepath}
        totalCount={totalCount}
        searchCondition={searchCondition}
      />
      <FloatCTA page="msl_ichiran" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchCondition: QueryVariables = {};
  const searchQuery = query;

  const stringKeys: (keyof QueryVariables)[] = [
    "wd",
    "st",
    "ln",
    "ct",
    "tw",
    "brd",
    "psc",
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

  const wd = searchCondition.wd;

  const page = setQueryNumber(searchQuery?.page);

  // twが検索条件にある場合は、/towns/にリダイレクト
  if (searchCondition.tw) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["wd", "ct", "st", "ln"],
      "towns"
    );
  }

  // twが検索条件にある場合は、/towns/にリダイレクト
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "tw",
      ["wd", "ct", "st", "ln", "psc", "brd"],
      "towns"
    );
  }

  // ctが検索条件にある場合は、/cities/にリダイレクト
  if (searchCondition.ct) {
    return redirectByQuery(
      searchCondition,
      "ct",
      ["wd", "st", "ln", "psc", "brd"],
      "cities"
    );
  }

  // lnが検索条件にある場合は、/lines/にリダイレクト
  if (searchCondition.ln) {
    return redirectByQuery(
      searchCondition,
      "ln",
      ["wd", "st", "psc", "brd"],
      "lines"
    );
  }

  // stが検索条件にある場合は、/lines/にリダイレクト
  if (searchCondition.st) {
    return redirectByQuery(
      searchCondition,
      "st",
      ["wd", "psc", "brd"],
      "stations"
    );
  }

  // pscが検索条件にある場合は、/schools/にリダイレクト
  if (searchCondition.psc) {
    return redirectByQuery(searchCondition, "psc", ["wd", "brd"], "schools");
  }

  // brdが検索条件にある場合は、/brands/にリダイレクト
  if (searchCondition.brd) {
    return redirectByQuery(searchCondition, "brd", ["wd"], "brands");
  }

  // wdがない場合、404へ
  if (!wd) {
    return {
      notFound: true,
    };
  }

  const canonicalQueryStringList = buildCanonicalQueryStringList(
    searchCondition
  );

  const mainPath = buildLibraryPagePath("freeword");

  try {
    const apolloClient = initializeApollo();

    // マンション情報取得
    const mansionsDataAll = await apolloClient.query({
      query: MansionPaginationDocument,
      variables: searchCondition,
    });

    const mansionsData = mansionsDataAll.data;

    const isNoindex = true;

    const canonicalUrl = buildCanonical(
      mainPath,
      canonicalQueryStringList,
      isNoindex,
      searchCondition
    );

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        mansionsData,
        wd,
        page,
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
