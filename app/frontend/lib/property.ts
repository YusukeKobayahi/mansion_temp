import {
  ModelQueryVariables,
  SortQueryVariables,
  FilterQueryVariables,
  PaginationQueryVariables,
} from "./types";

export const ModelQueryKeys: (keyof ModelQueryVariables)[] = [
  // 優先順位
  "pf", // 1
  "ct", // 2
  "tw", // 3
  "st", // 4
  "ln", // 5
  "psc", // 6
  "brd", // 7
  "wd", // 8
];
export const SortQueryKeys: (keyof SortQueryVariables)[] = [
  "orud",
  "orpr",
  "orar",
  "orck",
  "ormd",
  "orap",
  "ortt",
  "ormn",
];
export const FilterQueryKeys: (keyof FilterQueryVariables)[] = [
  "md",
  "thb",
  "tht",
  "ckt",
  "utb",
  "eab",
  "eat",
  "prb",
  "prt",
  "gfb",
  "gft",
  "mnt",
  "trt",
  "apb",
  "apt",
];
export const PaginationQueryKeys: (keyof PaginationQueryVariables)[] = [
  "page",
  "per",
  "limit",
];
export const QueryKeys = [
  ...ModelQueryKeys,
  ...SortQueryKeys,
  ...FilterQueryKeys,
  ...PaginationQueryKeys,
];

// この配列は [...FilterQueryKeys, ...SortQueryKeys] で置き換えようかと思ったが、少し確認が必要だと判断したので今はこのまま
export const searchOptions: string[] = ["page", "per", ...SortQueryKeys];
