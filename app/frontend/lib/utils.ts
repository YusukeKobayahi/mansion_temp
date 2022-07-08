import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import reduce from "lodash/reduce";
import union from "lodash/union";
import compact from "lodash/compact";
import map from "lodash/map";
import find from "lodash/find";
import omitBy from "lodash/omitBy";
import toPairs from "lodash/toPairs";
import sortBy from "lodash/sortBy";
import fromPairs from "lodash/fromPairs";
import includes from "lodash/includes";
import { format } from "date-fns";
import {
  QueryKeys,
  SortQueryKeys,
  searchOptions,
  ModelQueryKeys,
} from "~/lib/property";
import { KeyProps } from "~/components/commons/Chart/MarketPriceItem";
import searchData from "~/components/molecules/Search/searchData.json";
import allIndexedSituation from "~/public/json/allIndexedSituation.json";
import { event } from "~/lib/gtag";
import { MansionAccess, Maybe } from "~/graphql/generated";
import { BreadcrumbItemProps } from "~/components/commons/Breadcrumb";
import {
  FilterQueryParameters,
  FilterQueryVariables,
  Hash,
  ModelQueryParameters,
  ModelQueryVariables,
  QueryVariables,
  HrefProps,
  GoogleAnalyticsEvent,
  PathFormat,
  PathWithQueryFormat,
} from "./types";
import pick from "lodash/pick";

export const isSSR = (): boolean => typeof window === "undefined";

export const isNumericString = (value: string): boolean => {
  const numValue = Number(value);
  return !isNaN(numValue);
};

export const buildLibraryPagePath = (...args: string[]): PathFormat => {
  if (isEmpty(args)) return "/";
  const isNotBlank = (value: string) => value && value !== "";
  return `/${args.filter(isNotBlank).join("/")}/`;
};

const unitFormat = (num: number): string => {
  const val = String(Math.abs(num));
  const length = val.length;
  const digits = ["", "万", "億", "兆", "京", "垓"];
  let result = "";
  const results = [];

  for (let i = 0; i < Math.ceil(length / 4); i++) {
    results[i] = Number(val.substring(length - i * 4, length - (i + 1) * 4));
    if (results[i] !== 0)
      result =
        String(results[i]).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") +
        digits[i] +
        result;
  }
  return result;
};

export const yenFormat = (num: number): string => {
  return unitFormat(num) + "円";
};

export const populationFormat = (num: number): string => {
  return unitFormat(num) + "人";
};

export const isSP = (): boolean =>
  window.matchMedia("(max-width: 768px)").matches;

export const buildCanonicalQueryStringList = (
  conditions: QueryVariables,
  excludes: string[] = []
): string[] => {
  // 並び替えは並び替えなしにcanonicalする
  excludes = union(excludes, SortQueryKeys);

  const convert = (queryStringList: string[], _key: string) => {
    const key = _key as keyof QueryVariables;
    const value = conditions[key];
    if (
      value &&
      !excludes.includes(key) && //除外するkeyとしてexcludesに含まれているか
      !(key == "page" && value == 1) // 1ページ目はpageパラメータなしにcanonical
    )
      queryStringList.push(`${key}=${value}`);
    return queryStringList;
  };
  const canonicalQueryStringList = reduce(QueryKeys, convert, []);
  return canonicalQueryStringList;
};

export const sortObjectByKey = (obj: any): any =>
  fromPairs(sortBy(toPairs(obj), 0));

const transitionToMembersForm = (s: string): void => {
  const source = "utm_source=inno&ieul_source=inno";
  const medium = "utm_medium=ms-library&ieul_medium=ms-library";
  const campain = `utm_campaign=${s}&ieul_campaign=${s}`;
  const content = `utm_content=${location.href}&ieul_content=${location.href}`;
  location.href = `https://ieul.jp/buy/?${source}&${medium}&${campain}&${content}`;
};

export const clickMembers = (o: GoogleAnalyticsEvent): void => {
  event(o);
  if (o.label) transitionToMembersForm(o.label);
};

export const insertSearchCondition = (
  key: keyof QueryVariables,
  value: string | number,
  condition: Hash<string | number>
): void => {
  if (value) condition[key] = value;
};

export const setQueryNumber = (n: string | string[] | undefined): number =>
  n == undefined ? 0 : Number(n);

export const setQueryString = (s: string | string[] | undefined): string =>
  s == undefined ? "" : String(s);

export const buildCanonical = (
  path: string,
  canonicalList: string[],
  isNoindex: boolean,
  condition: QueryVariables
): string => {
  return (
    "https://ieul.jp/ms-library" +
    path +
    (isNoindex
      ? canonicalList.length == 0
        ? ""
        : "?" + canonicalList.join("&")
      : !condition["page"]
      ? canonicalList.join("/") + (canonicalList.length !== 0 ? "/" : "")
      : [...canonicalList].splice(1).join("/") +
        ([...canonicalList].splice(1).length !== 0 ? "/" : "") +
        "?" +
        canonicalList[0])
  );
};
export const splitOrEmpty = (str: string | undefined): string[] => {
  return str && str !== "" ? str.split(",") : [];
};

export const stringOrEmpty = (value: string | number | undefined): string => {
  return value ? String(value) : "";
};

export const setInitialStateNumber = (n?: Maybe<number>): string =>
  n ? String(n) : "";
export const SetInitialStateList = (s?: Maybe<string>): string[] =>
  s ? s.split(",") : [""];

export const buildCurrentConditionSP = (conditions: QueryVariables): string => {
  const currentCondition = compact(
    map(searchData, (value: { name: string; value: string }[], key) => {
      const searchConditionValue = conditions[key as keyof QueryVariables];
      if (searchConditionValue) {
        if (key == "md") {
          return (searchConditionValue as string)
            .split(",")
            .map((s) => find(searchData.md, ["value", `${s}`])?.name);
        } else {
          return find(value, ["value", `${searchConditionValue}`])?.name;
        }
      }
    })
  ).join("／");

  return currentCondition.length > 40
    ? currentCondition.slice(0, 39) + "..."
    : currentCondition.length == 0
    ? "絞り込み条件：未定"
    : currentCondition;
};

type RedirectProps = {
  redirect: {
    statusCode: 301 | 302 | 307 | 303 | 308;
    destination: string;
  };
};

export const redirect = (destination: string): RedirectProps => {
  return {
    redirect: {
      statusCode: 301,
      destination,
    },
  };
};

export const redirectByQuery = (
  conditions: QueryVariables,
  paramsKey: keyof QueryVariables,
  excludes: string[],
  path: string
): RedirectProps => {
  const redirectPathValueList = String(conditions[paramsKey]).split(",");
  const redirectQueryString = buildCanonicalQueryStringList(
    omitBy({ ...conditions }, (_, key) => excludes.includes(key))
  ).join("&");
  const destination =
    buildLibraryPagePath(path, redirectPathValueList[0]) +
    "?" +
    redirectQueryString;
  return redirect(destination);
};

export const checkRedirectPathsByIsNoindex = (
  isNoindex: boolean,
  params: { [key: string]: any } | undefined,
  query: { [key: string]: any }
): boolean => {
  return (
    !isNoindex &&
    JSON.stringify(sortObjectByKey({ ...params })) !==
      JSON.stringify(
        sortObjectByKey(omitBy({ ...query }, (_, key) => key == "page"))
      )
  ); // pageはindexされるが、/?page=とするため、比較対象から抜く
};

export const RedirectPathsByIsNoindex = (
  conditions: QueryVariables,
  redirectQueryStringList: string[],
  path: string
): RedirectProps => {
  const destination =
    path +
    (!conditions["page"]
      ? redirectQueryStringList.join("/") + "/"
      : [...redirectQueryStringList].splice(1).join("/") +
        "/?" +
        redirectQueryStringList[0]);
  return redirect(destination);
};

export const checkRedirectQueryByIsNoindex = (
  isNoindex: boolean,
  paths: string[]
): boolean => {
  return isNoindex && paths.length > 1;
};

export const RedirectQueryByIsNoindex = (
  redirectQueryStringList: string[],
  path: string
): RedirectProps => {
  const query = redirectQueryStringList.join("&");
  const suffix = query.length !== 0 ? `?${query}` : "";
  return redirect(`${path}${suffix}`);
};

export const detectNoindex = (
  conditions: QueryVariables,
  count?: number
): boolean => {
  // brd,psc,st,ln,twが2つ以上検索条件にある場合は、noindex
  if (
    String(conditions.brd).split(",").length > 1 ||
    String(conditions.psc).split(",").length > 1 ||
    String(conditions.st).split(",").length > 1 ||
    String(conditions.ln).split(",").length > 1 ||
    String(conditions.tw).split(",").length > 1
  )
    return true;
  // twを検索条件に含まず、ct2つ以上検索条件にある場合は、noindex
  if (!conditions.tw && String(conditions.ct).split(",").length > 1)
    return true;
  // 検索結果0はnoindex
  if (count !== null && count === 0) return true;
  // 並べ替えはnoindex
  if ([...SortQueryKeys].filter((key) => conditions[key]).length) return true;
  // 複数条件の際のnoindex判定が入る
  const currentSearchCondition = sortObjectByKey(
    omitBy(conditions, (_, key) =>
      [...searchOptions, "ct", "tw", "ln", "st", "psc", "brd"].includes(key)
    )
  );

  // 検索条件が3つ以上、すなわちrange検索も踏まえ、
  // 検索パラメータが4つより大きい時は、noindex
  if (Object.keys(currentSearchCondition).length > 4) return true;
  // 検索条件が1つ以上、4つ以下の時は、
  // 検索条件によりindex状態が変動
  else if (Object.keys(currentSearchCondition).length >= 1) {
    // lodashのisEqual関数を用いobjectの比較を行おうと考えたが、
    // 処理速度向上のため、文字列として比較を行う。
    // allIndexedSituation.jsonのjsonたちと比較
    // 合致した場合のみindexさせ、それ以外はnoindex
    for (const situation of allIndexedSituation)
      if (
        JSON.stringify(sortObjectByKey(situation)) ===
        JSON.stringify(currentSearchCondition)
      )
        return false;
    return true;
  }
  // 検索条件がない時はindex
  else return false;
};

// 検索key以外がquery,pathにあるか判定
export const detectUnnecessaryKeys = (query: QueryVariables): boolean => {
  return !Object.keys(query).every((el) => includes(QueryKeys, el));
};

export const getFilterQueryVariables = ({
  filterQueryParameters,
}: {
  filterQueryParameters: FilterQueryParameters;
}): FilterQueryVariables => {
  const format = (
    result: FilterQueryVariables,
    value: string | undefined,
    _key: string
  ) => {
    const key = _key as keyof FilterQueryVariables;
    if (!value || value === "" || !key) return result;
    // 現状mdのみがstring,他はnumberなので単純な条件分岐をしている。
    else if (key === "md") result[key] = value;
    else if (isNumericString(value)) result[key] = Number(value);
    else
      throw new Error(
        `key '${key}' has value '${value}', but value should be numeric string.`
      );
    return result;
  };
  return reduce(filterQueryParameters, format, {});
};
export const getModelQueryVariables = ({
  modelQueryParameters,
  priorityFilter = false,
}: {
  modelQueryParameters: ModelQueryParameters;
  priorityFilter?: boolean;
}): ModelQueryVariables => {
  const format = (
    result: ModelQueryVariables,
    value: string | undefined,
    _key: string
  ): ModelQueryVariables => {
    const key = _key as keyof ModelQueryVariables;
    if (!value || value === "" || !key) return result;
    else result[key] = value;
    return result;
  };
  const query = reduce(modelQueryParameters, format, {});

  if (priorityFilter) {
    // ModelQueryは複数存在することが許されていないため優先順位によってどのModelQueryを返すかを決める。
    // ModelQueryKeysは優先順にクエリを配置しているので使用できる。
    ModelQueryKeys.forEach((key) => {
      if (key in query) return pick(query, [key]);
    });
  }
  return query;
};

export const getQueryVariables = ({
  filterQueryParameters,
  modelQueryParameters,
  priorityFilter = false,
}: {
  filterQueryParameters: FilterQueryParameters;
  modelQueryParameters: ModelQueryParameters;
  priorityFilter?: boolean;
}): QueryVariables => {
  const filterQueryVariables = getFilterQueryVariables({
    filterQueryParameters,
  });
  const modelQueryVariables = getModelQueryVariables({
    modelQueryParameters,
    priorityFilter,
  });
  const query = {
    ...modelQueryVariables,
    ...filterQueryVariables,
  };
  return query;
};

export const pathFormat = (path: string): PathFormat => {
  const slash = "/";
  if (!path.length) return slash;

  const hasSlashAtFirst = path[0] === slash;
  const hasSlashAtLast = path[path.length - 1] === slash;
  if (path.length === 1 && hasSlashAtFirst) return path as PathFormat;

  let safePath = path;
  safePath = hasSlashAtFirst ? safePath : `/${safePath}`;
  safePath = hasSlashAtLast ? safePath : `${safePath}/`;
  return safePath as PathFormat;
};

export const buildHrefByIsNoindex = (
  path: string,
  query: QueryVariables
): HrefProps => {
  const safePath = pathFormat(path);
  if (detectNoindex(query) || query.page) {
    return {
      pathname: safePath,
      query: query,
    };
  } else {
    const queryPath = buildCanonicalQueryStringList(query).join("/");
    return {
      pathname: `${safePath}${queryPath}/`,
      query: {},
    };
  }
};

export const buildSearchUrlFromHref = ({
  pathname,
  query,
}: HrefProps): PathWithQueryFormat | PathFormat => {
  const isEmpty = (obj: QueryVariables) => Object.keys(obj).length === 0;
  return isEmpty(query)
    ? pathname
    : `${pathname}?${buildCanonicalQueryStringList(query).join("&")}`;
};

export const buildConstructedDate = (
  constructedIn: string,
  age: number
): string => {
  return `${format(Date.parse(constructedIn), "yyyy年MM月")} (築${age}年)`;
};

export const buildAccess = (access: MansionAccess[]): string => {
  return access
    .map((a) => {
      const accessBase = `${a.stationLineName}「${a.stationName}」`;
      return a.stationWalkingMinutes != null
        ? `${accessBase} 徒歩${a.stationWalkingMinutes}分`
        : accessBase;
    })
    .join("/");
};

// 配列の合計数を取得
export const sumReducer = (sum: number, currentValue: number): number =>
  sum + currentValue;

// keyの型を決定
export const createKey = (s: KeyProps): KeyProps => s;

// pricehubleのデータ型の今月を取得
export const createDayThisMonth = (): string => {
  const today = new Date();
  return (
    today.getFullYear() + "-" + zeroPadding(today.getMonth() + 1, 2) + "-01"
  );
};
export const createDayOneYearAndHalfMonthsAgo = (): string => {
  const today = new Date();
  const getdoubleDigestNumer = (n: number) => {
    return ("0" + n).slice(-2);
  };
  if (today.getMonth() - 5 < 1)
    return (
      today.getFullYear() -
      2 +
      "-" +
      getdoubleDigestNumer(7 + today.getMonth()) +
      "-01"
    );
  else
    return (
      today.getFullYear() -
      1 +
      "-" +
      getdoubleDigestNumer(today.getMonth() - 5) +
      "-01"
    );
};

// 数字から連番の配列を作成

export const buildArrayFromNumber = (n: number): number[] => {
  return Array.from(new Array(n)).map((_, i) => i);
};

export const zeroPadding = (n: number, length: number): string =>
  ("0".repeat(length) + n).slice(-length);

// テキストの作成
export const buildMainTexts = ({
  isBuildMainText,
  subject,
  searchCondition,
}: {
  isBuildMainText: boolean;
  subject: string;
  searchCondition: QueryVariables;
}): Hash<string> => {
  const searchTextItems = [subject];
  const conditionText = getConditionText({ conditions: searchCondition });
  if (!isBuildMainText) searchTextItems.push(conditionText);
  const mainText = compact(searchTextItems).join("の");
  const areaText = subject;
  return { mainText, areaText };
};

//パンくずリスト
export const buildBasicBreadcrubms = (
  breadcrumbItems: BreadcrumbItemProps[]
): BreadcrumbItemProps[] => {
  return [
    {
      name: "Housiiトップ",
      path: "https://ieul.jp/buy/",
    },
    {
      name: "マンションライブラリー",
      path: buildLibraryPagePath(),
    },
    ...breadcrumbItems,
  ];
};

/**
 * 以下の全てのパターンに対応しています。
 * - /ms-library/cities/13101/
 * - /ms-library/cities/13101/?md=0302
 * - /ms-library/cities/13101/prb=30000000/prt=40000000/
 * => /cities/13101/
 */
export const useCurrentPath = (): string => {
  const router = useRouter();
  if (!router) return "/";
  const pathname = router.pathname;
  const splittedPathname = pathname.split("/");
  const path = router.asPath;
  const splittedPath = path.split("/").map(decodeURI);
  const currentPath =
    splittedPath.slice(0, splittedPathname.length).join("/") + "/";
  return currentPath;
};

// この関数はsearchData.jsonに依存しています。
export const getConditionText = ({
  conditions,
  conditionFilter,
}: {
  conditions: QueryVariables;
  conditionFilter?: (keyof typeof searchData)[];
}): string => {
  const oneBreakLevel = 10000000;
  const { prb, prt } = conditions;
  const priceDiff = Number(prt) - Number(prb);
  const isOneBreakLevelDiff = priceDiff == oneBreakLevel;

  const format = (key: keyof typeof searchData, value: string) => {
    if (
      conditionFilter &&
      conditionFilter.length &&
      !conditionFilter.includes(key)
    )
      return;
    else if (isOneBreakLevelDiff) {
      if (key == "prb") return `${yenFormat(Number(value))}台`;
      if (key == "prt") return;
    } else if (key == "gfb" || key == "gft" || key == "utb") {
      const str = find(searchData[key], ["value", value])?.name;
      const indexEnd = str?.indexOf("(");
      return str?.substring(0, indexEnd);
    } else if (searchData[key]) {
      return value
        .split(",")
        .map((val) => find(searchData[key], ["value", val])?.name)
        .join(",");
    }
  };

  return Object.entries(conditions)
    .map(([key, value]) =>
      format(key as keyof typeof searchData, String(value))
    )
    .filter((str) => str && str !== "")
    .join("、");
};

export const getSubjectByList = (list: string[], threshold = 3): string => {
  const newList = list.slice(0, threshold);
  const additonalString = newList.length === threshold ? "他" : "";
  return newList.join(",") + additonalString;
};
