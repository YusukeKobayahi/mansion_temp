import { Dispatch, SetStateAction } from "react";

export type Hash<T> = {
  [key: string]: T;
};

export type PathFormat = `/${string}/` | `/`;
export type PathWithQueryFormat = `${PathFormat}?${string}`;
export type StringType<T> = { [P in keyof T]: string };
export type ChangeType<T, U> = { [P in keyof T]: U };
export type ReactSetStateType<T> = Dispatch<SetStateAction<T>>;
export type ReactSetStateDispatcher<T> = {
  [P in keyof T & string as `set${Capitalize<P>}`]: ReactSetStateType<T[P]>;
};

/**************************************************
 * Queryを追加、削除した場合は以下の編集を忘れずに行うこと
 * - ./property.ts
 * - components/Context/SearchConditionContext.tsx
 **************************************************/

/**
 * モデルのクエリ型、モデルの定義はcore側でモデルとして定義されているかどうか。
 */
export type ModelQueryVariables = {
  pf?: string; // prefecture
  ct?: string; // city
  tw?: string; // town
  st?: string; // station
  ln?: string; // line
  psc?: string; // primary school
  wd?: string; // word
  brd?: string; // brand

  // jisCodeは少し特殊でpf,ctとほぼ同じ、違いはprefecture単体,city単体のデータのリクエストの際の引数というもの。
  // 開発初期の頃の名残なので将来的に削除される可能性あり。
  jisCode?: string;
};
/**
 * ソートのクエリ型
 * 「or(order) + 条件」で構成されている。
 */
export type SortValue = "ASC" | "DESC";
export type SortQueryVariables = {
  orud?: SortValue; // 更新 新しい順 or 古い順
  orpr?: SortValue; // 価格 高い or 安い順順
  orar?: SortValue; // 占有面積 広い順 or 狭い順
  orck?: SortValue; // 築年月 新しい順 or 古い順
  ormd?: SortValue; // 間取り 多い順 or 少ない順
  orap?: SortValue; // 平均相場 高い順 or 安い順
  ortt?: SortValue; // 乗り換え回数 多い順 or 少ない順
  ormn?: SortValue; // 〇〇までの時間 多い順 or 少ない順
};
/**
 * 検索結果にフィルターをかけるための検索条件のクエリ型
 * 「b(bottom)」=> 下限
 * 「t(top)」=> 上限
 * 「条件 + (b | t)?」で構成されている。
 */
export type FilterQueryVariables = {
  // マンション
  md?: string; // 間取り
  thb?: number; // 最寄りの駅までの徒歩距離(分)
  tht?: number; // 最寄りの駅までの徒歩距離(分)
  ckt?: number; // 築年数
  eab?: number; // 占有面積(㎡)
  eat?: number; // 占有面積(㎡)
  prb?: number; // 価格(円)
  prt?: number; // 価格(円)
  utb?: number; // 戸数
  gfb?: number; // 階数
  gft?: number; // 階数
  // 通勤/駅
  mnt?: number; // 駅から駅までの徒歩距離(分)
  trt?: number; // 乗り換え階数
  apb?: number; // 駅圏内のマンションの平均相場価格(円)
  apt?: number; // 駅圏内のマンションの平均相場価格(円)
};

/**
 * ページネーションに関するクエリ型
 */
export type PaginationQueryVariables = {
  page?: number; // ページ数
  per?: number; // １ページごとのデータの数。
  limit?: number; // 受け取るデータの上限
};

// prettier-ignore
export type QueryVariables = (
  & ModelQueryVariables
  & SortQueryVariables
  & FilterQueryVariables
  & PaginationQueryVariables
);

export type ModelQueryParameters = StringType<ModelQueryVariables>;
export type SortQueryParameters = StringType<SortQueryVariables>;
export type FilterQueryParameters = StringType<FilterQueryVariables>;
export type PaginationQueryParameters = StringType<PaginationQueryVariables>;
export type QueryParameters = StringType<QueryVariables>;

/**
 * next/linkのLinkProps["href"]を想定してLinkのhrefに注入されることを前提とした型
 * この型に依存した関数など存在している。
 */
export type HrefProps = {
  pathname: PathFormat;
  query: QueryVariables;
};

export type PageCategory =
  | "mansions"
  | "prefectures"
  | "cities"
  | "towns"
  | "lines"
  | "stations"
  | "schools"
  | "brands"
  | "commute"
  | "freeword"
  | "rankings";

export type GoogleAnalyticsEvent = {
  category:
    | "msl_top"
    | "msl_footer"
    | "msl_popup"
    | "msl_ichiran"
    | "msl_shosai"
    | "msl_tokusyu"
    | "msl_prefectures"
    | "msl_hamburger"
    | "msl_mansion_ranking";
  action:
    | "msl_cta_click"
    | "msl_content_click"
    | "msl_link_click"
    | "msl_area_click"
    | "msl_page_click"
    | "msl_buy_click";
  label?:
    | "msl_area_change"
    | "msl_banner"
    | "msl_brand"
    | "msl_brands"
    | "msl_buy_naiken"
    | "msl_buy_shosai"
    | "msl_buy_want"
    | "msl_city"
    | "msl_column"
    | "msl_column_category"
    | "msl_commute_station"
    | "msl_direct"
    | "msl_erea_change"
    | "msl_flooting_left"
    | "msl_flooting_right"
    | "msl_freetext"
    | "msl_history_bukken"
    | "msl_indexed_towns"
    | "msl_jyoken"
    | "msl_kanren_site"
    | "msl_kuchikomi_area"
    | "msl_kuchikomi_mansion"
    | "msl_kuchikomi_school"
    | "msl_line"
    | "msl_linked_cities"
    | "msl_linked_stations"
    | "msl_linked_towns"
    | "msl_lp"
    | "msl_lp-bottom"
    | "msl_lp_bottom_old"
    | "msl_lp_center"
    | "msl_lp_flooting"
    | "msl_lp_flooting_left"
    | "msl_lp_flooting_right"
    | "msl_lp_gensen"
    | "msl_lp_goikenban"
    | "msl_lp_kuchikomi_area"
    | "msl_lp_kuchikomi_mansion"
    | "msl_lp_left"
    | "msl_lp_mansion"
    | "msl_lp_mikokai"
    | "msl_lp_right"
    | "msl_lp_souba"
    | "msl_lp_souba_left"
    | "msl_lp_souba_right"
    | "msl_lp_syokai"
    | "msl_lp_syuhen"
    | "msl_lp_text"
    | "msl_lp_top"
    | "msl_lp_top_old"
    | "msl_mansion_buy"
    | "msl_mansion_shosai"
    | "msl_mansion_title"
    | "msl_mikokai"
    | "msl_msl_pref"
    | "msl_near_bukken"
    | "msl_pagenation"
    | "msl_pagination"
    | "msl_pop_bottom"
    | "msl_pop_top"
    | "msl_popup_button"
    | "msl_pref"
    | "msl_ranking"
    | "msl_rosen"
    | "msl_satei"
    | "msl_school"
    | "msl_station"
    | "msl_syuhen"
    | "msl_tokusyu"
    | "msl_town"
    | "msl_towns_searchcondition"
    | PathFormat
    | PathWithQueryFormat;
  value?: 1;
};
