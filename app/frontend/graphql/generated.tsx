import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Represents non-fractional signed whole numeric values. Since the value may
   * exceed the size of a 32-bit integer, it's encoded as a string.
   */
  BigInt: any;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
};

export type Area = {
  __typename?: 'Area';
  activePrefectures: Array<Prefecture>;
  citiesCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type AveragePriceAboveFiveRoom = {
  __typename?: 'AveragePriceAboveFiveRoom';
  averagePrice: Scalars['Int'];
  averageSquarePrice: Scalars['Int'];
  averageTsuboPrice: Scalars['Int'];
  fullLayoutName: Scalars['String'];
  salesHistoriesCount: Scalars['Int'];
};

export type AveragePriceBase = {
  __typename?: 'AveragePriceBase';
  averagePrice: Scalars['Int'];
  averageSquarePrice: Scalars['Int'];
  averageTsuboPrice: Scalars['Int'];
  salesHistoriesCount: Scalars['Int'];
};

export type AveragePriceDate = {
  __typename?: 'AveragePriceDate';
  age: Scalars['Int'];
  averagePrice: Scalars['Int'];
  averageSquarePrice: Scalars['Int'];
  averageTsuboPrice: Scalars['Int'];
  salesHistoriesCount: Scalars['Int'];
};

export type AveragePriceLayout = {
  __typename?: 'AveragePriceLayout';
  averagePrice: Scalars['Int'];
  averageSquarePrice: Scalars['Int'];
  averageTsuboPrice: Scalars['Int'];
  fullLayoutName: Scalars['String'];
  layoutKindId: Scalars['ID'];
  numberOfRooms: Scalars['Int'];
  salesHistoriesCount: Scalars['Int'];
};


export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID'];
  /** N+1回避しつつ、Mansionをカウントするためのフィールド */
  mansionCount: Scalars['Int'];
  name: Scalars['String'];
  rankingMansions?: Maybe<Array<Mansion>>;
};


export type BrandRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type City = {
  __typename?: 'City';
  averagePrice: CityAveragePriceType;
  id: Scalars['ID'];
  indexedTowns?: Maybe<Array<Town>>;
  info: CityInfo;
  jisCode: Scalars['String'];
  /** N+1回避しつつ、Mansionをカウントするためのフィールド */
  mansionCount: Scalars['Int'];
  mansionPagination: MansionPagination;
  name: Scalars['String'];
  neighborCities?: Maybe<Array<City>>;
  prefecture: Prefecture;
  pricePredictions: Pricehubble;
  primarySchools?: Maybe<Array<PrimarySchool>>;
  rankingMansions?: Maybe<Array<Mansion>>;
  salesHistories: MansionSalesHistoryConnection;
  stations?: Maybe<Array<RailwayStation>>;
  towns: Array<Town>;
  writing?: Maybe<Writing>;
};


export type CityMansionPaginationArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};


export type CityRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type CitySalesHistoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SalesHistoryOrder>;
};

export type CityAveragePriceType = {
  __typename?: 'CityAveragePriceType';
  aboveFiveRooms?: Maybe<AveragePriceAboveFiveRoom>;
  activeLayouts: Array<AveragePriceLayout>;
  base: Array<AveragePriceBase>;
  date: Array<AveragePriceDate>;
  layout: Array<AveragePriceLayout>;
  layouts: Array<AveragePriceLayout>;
};


export type CityAveragePriceTypeLayoutArgs = {
  layoutKindId?: Maybe<Scalars['ID']>;
  numberOfRooms?: Maybe<Scalars['Int']>;
};

export type CityInfo = {
  __typename?: 'CityInfo';
  age?: Maybe<CityInfoAge>;
  birthrate?: Maybe<CityInfoBirthrate>;
  care?: Maybe<CityInfoCare>;
  crime?: Maybe<CityInfoCrime>;
  household?: Maybe<CityInfoHousehold>;
  income?: Maybe<CityInfoIncome>;
  medical?: Maybe<CityInfoMedical>;
  park?: Maybe<CityInfoPark>;
  population?: Maybe<CityInfoPopulation>;
  school?: Maybe<CityInfoSchool>;
  waitingChild?: Maybe<CityInfoWaitingChild>;
};

export type CityInfoAge = {
  __typename?: 'CityInfoAge';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  averageAge?: Maybe<Scalars['Float']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoBirthrate = {
  __typename?: 'CityInfoBirthrate';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  birthrate?: Maybe<Scalars['Float']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoCare = {
  __typename?: 'CityInfoCare';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  careHomes?: Maybe<Scalars['Float']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
  seniorPopulation?: Maybe<Scalars['BigInt']>;
};

export type CityInfoCrime = {
  __typename?: 'CityInfoCrime';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  crimeRatioPercentage?: Maybe<Scalars['Float']>;
  crimes?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoHousehold = {
  __typename?: 'CityInfoHousehold';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  capitalRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  households?: Maybe<Scalars['Int']>;
  ownedHouseholds?: Maybe<Scalars['Int']>;
  ownedPercentage?: Maybe<Scalars['Float']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoIncome = {
  __typename?: 'CityInfoIncome';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  averageIncome?: Maybe<Scalars['BigInt']>;
  capitalRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
  taxpayers?: Maybe<Scalars['BigInt']>;
  totalIncome?: Maybe<Scalars['BigInt']>;
};

export type CityInfoMedical = {
  __typename?: 'CityInfoMedical';
  bed?: Maybe<CityInfoMedicalBed>;
  hospitalClinic?: Maybe<CityInfoMedicalHospitalClinic>;
};

export type CityInfoMedicalBed = {
  __typename?: 'CityInfoMedicalBed';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  beds?: Maybe<Scalars['BigInt']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  perPopulation?: Maybe<Scalars['Float']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoMedicalHospitalClinic = {
  __typename?: 'CityInfoMedicalHospitalClinic';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  clinics?: Maybe<Scalars['BigInt']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  hospitals?: Maybe<Scalars['BigInt']>;
  perPopulation?: Maybe<Scalars['Float']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoPark = {
  __typename?: 'CityInfoPark';
  area?: Maybe<Area>;
  areaPerPerson?: Maybe<Scalars['Float']>;
  areaRank?: Maybe<Scalars['Int']>;
  capitalRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  parkArea?: Maybe<Scalars['BigInt']>;
  parks?: Maybe<Scalars['BigInt']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoPopulation = {
  __typename?: 'CityInfoPopulation';
  basic?: Maybe<CityInfoPopulationBasic>;
  density?: Maybe<CityInfoPopulationDensity>;
  growth?: Maybe<CityInfoPopulationGrowth>;
  underFifteen?: Maybe<CityInfoPopulationUnderFifteen>;
};

export type CityInfoPopulationBasic = {
  __typename?: 'CityInfoPopulationBasic';
  population?: Maybe<Scalars['Int']>;
};

export type CityInfoPopulationDensity = {
  __typename?: 'CityInfoPopulationDensity';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  populationDensity?: Maybe<Scalars['Float']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoPopulationGrowth = {
  __typename?: 'CityInfoPopulationGrowth';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  populationGrowthPercentage?: Maybe<Scalars['Float']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoPopulationUnderFifteen = {
  __typename?: 'CityInfoPopulationUnderFifteen';
  capitalRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
  underFifteenPopulation?: Maybe<Scalars['Int']>;
  underFifteenPopulationPercentage?: Maybe<Scalars['Float']>;
};

export type CityInfoSchool = {
  __typename?: 'CityInfoSchool';
  high?: Maybe<CityInfoSchoolHigh>;
  kindergarten?: Maybe<CityInfoSchoolKindergarten>;
  middle?: Maybe<CityInfoSchoolMiddle>;
  middleProceed?: Maybe<CityInfoSchoolMiddleProceed>;
  primary?: Maybe<CityInfoSchoolPrimary>;
};

export type CityInfoSchoolHigh = {
  __typename?: 'CityInfoSchoolHigh';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  highSchools?: Maybe<Scalars['BigInt']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoSchoolKindergarten = {
  __typename?: 'CityInfoSchoolKindergarten';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  kindergartens?: Maybe<Scalars['BigInt']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoSchoolMiddle = {
  __typename?: 'CityInfoSchoolMiddle';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  middleSchools?: Maybe<Scalars['BigInt']>;
  prefectureRank?: Maybe<Scalars['Int']>;
};

export type CityInfoSchoolMiddleProceed = {
  __typename?: 'CityInfoSchoolMiddleProceed';
  capitalRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  nationalSchoolProceed?: Maybe<Scalars['BigInt']>;
  prefectureRank?: Maybe<Scalars['Int']>;
  privateSchoolProceed?: Maybe<Scalars['BigInt']>;
  proceedRatioPercentage?: Maybe<Scalars['Float']>;
  schoolProceed?: Maybe<Scalars['BigInt']>;
};

export type CityInfoSchoolPrimary = {
  __typename?: 'CityInfoSchoolPrimary';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
  primarySchools?: Maybe<Scalars['BigInt']>;
};

export type CityInfoWaitingChild = {
  __typename?: 'CityInfoWaitingChild';
  area?: Maybe<Area>;
  areaRank?: Maybe<Scalars['Int']>;
  deviation?: Maybe<Scalars['Float']>;
  grade?: Maybe<Grade>;
  prefectureRank?: Maybe<Scalars['Int']>;
  underFourPopulation?: Maybe<Scalars['Int']>;
  waitingChilds?: Maybe<Scalars['Int']>;
  waitingChildsPerUnderFourPopulation?: Maybe<Scalars['Float']>;
};

export type Grade = {
  __typename?: 'Grade';
  id?: Maybe<Scalars['ID']>;
  typeName?: Maybe<Scalars['String']>;
};


export type IndexIeulColumnType = {
  __typename?: 'IndexIeulColumnType';
  description?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type IndexPath = {
  __typename?: 'IndexPath';
  path?: Maybe<Scalars['String']>;
};

export type IntRange = {
  from?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Int']>;
};

export type Mansion = {
  __typename?: 'Mansion';
  access: Array<MansionAccess>;
  age: Scalars['Int'];
  blockNumber?: Maybe<Scalars['String']>;
  brand?: Maybe<Brand>;
  city: City;
  constructCompany?: Maybe<Scalars['String']>;
  constructedIn: Scalars['ISO8601Date'];
  display: MansionDisplay;
  displays: Array<MansionDisplay>;
  groundFloor?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  landPrivilege?: Maybe<Scalars['String']>;
  landUseZones: Array<Scalars['String']>;
  layouts: Array<Scalars['String']>;
  managementCompany?: Maybe<Scalars['String']>;
  managementForm?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pageView: Scalars['Int'];
  parking?: Maybe<Scalars['String']>;
  prefecture: Prefecture;
  priceHubble?: Maybe<Pricehubble>;
  primarySchool?: Maybe<PrimarySchool>;
  salesHistories: MansionSalesHistoryConnection;
  salesHistorySummaries: Array<MansionSalesHistorySummary>;
  similarMansions: MansionConnection;
  street?: Maybe<Street>;
  structure: MansionStructure;
  town: Town;
  undergroundFloor?: Maybe<Scalars['Int']>;
  uniqueCode: Scalars['ID'];
  unitAmount?: Maybe<Scalars['Int']>;
  updatedDate: Scalars['ISO8601Date'];
  zipCode?: Maybe<Scalars['String']>;
};


export type MansionDisplayArgs = {
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
};


export type MansionDisplaysArgs = {
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
};


export type MansionSalesHistoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  exclusiveAreaRange?: Maybe<IntRange>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SalesHistoryOrder>;
};


export type MansionSimilarMansionsArgs = {
  after?: Maybe<Scalars['String']>;
  ageBeforeAndAfter?: Scalars['Int'];
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<SimilarMansionOrder>;
};

export type MansionAccess = {
  __typename?: 'MansionAccess';
  id: Scalars['ID'];
  lineId: Scalars['Int'];
  stationId: Scalars['Int'];
  stationLineName: Scalars['String'];
  stationName: Scalars['String'];
  stationWalkingMinutes?: Maybe<Scalars['Int']>;
};

/** The connection type for Mansion. */
export type MansionConnection = {
  __typename?: 'MansionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MansionEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Mansion>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type MansionDisplay = {
  __typename?: 'MansionDisplay';
  age: Scalars['Int'];
  constructedIn: Scalars['ISO8601Date'];
  id: Scalars['ID'];
  layoutName: Scalars['String'];
  maxExclusiveArea: Scalars['Float'];
  maxPrice: Scalars['Int'];
  minExclusiveArea: Scalars['Float'];
  minPrice: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  unitAmount?: Maybe<Scalars['Int']>;
};

/** An edge in a connection. */
export type MansionEdge = {
  __typename?: 'MansionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Mansion>;
};

export type MansionLayoutKind = {
  __typename?: 'MansionLayoutKind';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  sort: Scalars['Int'];
};

export enum MansionOrderField {
  /** 築年月日 */
  ConstructedIn = 'CONSTRUCTED_IN'
}

export type MansionPagination = {
  __typename?: 'MansionPagination';
  isNoindex?: Maybe<Scalars['Boolean']>;
  mansions: Array<Mansion>;
  pagination: Pagination;
};


export type MansionPaginationIsNoindexArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};

export type MansionSalesHistory = Node & {
  __typename?: 'MansionSalesHistory';
  exclusiveArea: Scalars['Float'];
  floorNumber?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  layout: Scalars['String'];
  mansion: Mansion;
  openingDirection?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  saleOn: Scalars['ISO8601Date'];
  squarePrice: Scalars['Int'];
};

/** The connection type for MansionSalesHistory. */
export type MansionSalesHistoryConnection = {
  __typename?: 'MansionSalesHistoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MansionSalesHistoryEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<MansionSalesHistory>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MansionSalesHistoryEdge = {
  __typename?: 'MansionSalesHistoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<MansionSalesHistory>;
};

export type MansionSalesHistorySummary = {
  __typename?: 'MansionSalesHistorySummary';
  exclusiveAreas: Array<Scalars['Float']>;
  layout: Scalars['String'];
  layoutKind: MansionLayoutKind;
  maxExclusiveArea: Scalars['Float'];
  maxPrice: Scalars['Int'];
  minExclusiveArea: Scalars['Float'];
  minPrice: Scalars['Int'];
  numberOfRooms: Scalars['Int'];
};

export type MansionStructure = {
  __typename?: 'MansionStructure';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String'];
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'];
};

export enum OrderDirection {
  /** 昇順 */
  Asc = 'ASC',
  /** 降順 */
  Desc = 'DESC'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PagePath = {
  __typename?: 'PagePath';
  value: Scalars['String'];
};

export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Int'];
  limitValue: Scalars['Int'];
  totalCount: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Param = {
  __typename?: 'Param';
  key: Scalars['String'];
  name: Scalars['String'];
  value: Scalars['String'];
};

export type Prefecture = {
  __typename?: 'Prefecture';
  averagePrice: PrefectureAveragePriceType;
  category?: Maybe<Array<IndexIeulColumnType>>;
  cities: Array<City>;
  citiesCount: Scalars['Int'];
  companies: Array<RailwayCompany>;
  id: Scalars['ID'];
  ids?: Maybe<Array<IndexIeulColumnType>>;
  jisCode: Scalars['String'];
  mansionCount: Scalars['Int'];
  mansionPagination: MansionPagination;
  name: Scalars['String'];
  pricePredictions: Pricehubble;
  rankingMansions?: Maybe<Array<Mansion>>;
};


export type PrefectureMansionCountArgs = {
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
};


export type PrefectureMansionPaginationArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};


export type PrefectureRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type PrefectureAveragePriceType = {
  __typename?: 'PrefectureAveragePriceType';
  base: Array<AveragePriceBase>;
  layout: Array<AveragePriceLayout>;
  layouts: Array<AveragePriceLayout>;
};


export type PrefectureAveragePriceTypeLayoutArgs = {
  layoutKindId?: Maybe<Scalars['ID']>;
  numberOfRooms?: Maybe<Scalars['Int']>;
};

export type Pricehubble = {
  __typename?: 'Pricehubble';
  salePricePerSquare: Array<PricehubbleType>;
  salePricePerTsubo: Array<PricehubbleType>;
};

export type PricehubbleType = {
  __typename?: 'PricehubbleType';
  building?: Maybe<Scalars['Float']>;
  city?: Maybe<Scalars['Float']>;
  date: Scalars['ISO8601Date'];
  line?: Maybe<Scalars['Float']>;
  prefecture?: Maybe<Scalars['Float']>;
  station?: Maybe<Scalars['Float']>;
  town?: Maybe<Scalars['Float']>;
};

export type PrimarySchool = {
  __typename?: 'PrimarySchool';
  averagePrice: PrimarySchoolAveragePriceType;
  city?: Maybe<City>;
  mansionCount: Scalars['Int'];
  name: Scalars['String'];
  nameKana: Scalars['String'];
  prefecture: Prefecture;
  rankingMansions?: Maybe<Array<Mansion>>;
  review?: Maybe<Array<PrimarySchoolReview>>;
  schoolId: Scalars['ID'];
};


export type PrimarySchoolMansionCountArgs = {
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
};


export type PrimarySchoolRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type PrimarySchoolAveragePriceType = {
  __typename?: 'PrimarySchoolAveragePriceType';
  base: Array<AveragePriceBase>;
  layout: Array<AveragePriceLayout>;
};


export type PrimarySchoolAveragePriceTypeLayoutArgs = {
  layoutKindId?: Maybe<Scalars['ID']>;
  numberOfRooms?: Maybe<Scalars['Int']>;
};

export type PrimarySchoolReview = {
  __typename?: 'PrimarySchoolReview';
  accessRate?: Maybe<Scalars['Int']>;
  accessText?: Maybe<Scalars['String']>;
  admmisionYear: Scalars['Int'];
  classRate?: Maybe<Scalars['Int']>;
  classText?: Maybe<Scalars['String']>;
  costText?: Maybe<Scalars['String']>;
  eventRate?: Maybe<Scalars['Int']>;
  eventText?: Maybe<Scalars['String']>;
  generalRate: Scalars['Int'];
  generalText: Scalars['String'];
  howGoText?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  institutionRate?: Maybe<Scalars['Int']>;
  institutionText?: Maybe<Scalars['String']>;
  lunchPresent?: Maybe<Scalars['Boolean']>;
  lunchText?: Maybe<Scalars['String']>;
  motivationText?: Maybe<Scalars['String']>;
  personGender: Scalars['String'];
  policyRate?: Maybe<Scalars['Int']>;
  policyText?: Maybe<Scalars['String']>;
  postMonth: Scalars['Int'];
  postYear: Scalars['Int'];
  proceedReasonText?: Maybe<Scalars['String']>;
  proceedText?: Maybe<Scalars['String']>;
  ptaRate?: Maybe<Scalars['Int']>;
  ptaText?: Maybe<Scalars['String']>;
  teacherRate?: Maybe<Scalars['Int']>;
  teacherText?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  uniformPresent?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  allIndexedBrands: Array<IndexPath>;
  allIndexedCities: Array<IndexPath>;
  allIndexedCitiesWithParams: Array<IndexPath>;
  allIndexedCommuteStations: Array<IndexPath>;
  allIndexedPrimarySchools: Array<IndexPath>;
  allIndexedStations: Array<IndexPath>;
  allIndexedTownWithParams: Array<IndexPath>;
  allIndexedTowns: Array<IndexPath>;
  brands: Array<Brand>;
  cities: Array<City>;
  city: City;
  freeWord: Array<SearchWord>;
  indexedLineIds: Array<IndexPath>;
  indexedSearchParams: Array<SearchParam>;
  libraryAreaPagePaths: Array<PagePath>;
  libraryMansionPagePaths: Array<PagePath>;
  line: RailwayLine;
  lines: Array<RailwayLine>;
  mansion: Mansion;
  mansionPagination: MansionPagination;
  prefecture: Prefecture;
  prefectures: Array<Prefecture>;
  primarySchools: Array<PrimarySchool>;
  station: RailwayStation;
  stations: Array<RailwayStation>;
  town: Town;
  towns: Array<Town>;
};


export type QueryBrandsArgs = {
  brd?: Maybe<Scalars['String']>;
};


export type QueryCitiesArgs = {
  ct?: Maybe<Scalars['String']>;
};


export type QueryCityArgs = {
  jisCode: Scalars['String'];
};


export type QueryFreeWordArgs = {
  limit?: Maybe<Scalars['Int']>;
  word: Scalars['String'];
};


export type QueryLineArgs = {
  ln: Scalars['String'];
};


export type QueryLinesArgs = {
  ln: Scalars['String'];
};


export type QueryMansionArgs = {
  historyCursor?: Maybe<Scalars['String']>;
  uniqueCode: Scalars['ID'];
};


export type QueryMansionPaginationArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};


export type QueryPrefectureArgs = {
  jisCode: Scalars['String'];
};


export type QueryPrimarySchoolsArgs = {
  psc?: Maybe<Scalars['String']>;
};


export type QueryStationArgs = {
  st: Scalars['String'];
};


export type QueryStationsArgs = {
  st: Scalars['String'];
};


export type QueryTownArgs = {
  tw?: Maybe<Scalars['String']>;
};


export type QueryTownsArgs = {
  tw?: Maybe<Scalars['String']>;
};

export type RailwayCompany = {
  __typename?: 'RailwayCompany';
  lines: Array<RailwayLine>;
  name: Scalars['String'];
};

export type RailwayLine = {
  __typename?: 'RailwayLine';
  cities: Array<City>;
  company: RailwayCompany;
  id: Scalars['ID'];
  mansionCount: Scalars['Int'];
  mansionPagination: MansionPagination;
  name: Scalars['String'];
  pricePredictions: Pricehubble;
  rankingMansions?: Maybe<Array<Mansion>>;
  stations: Array<RailwayStation>;
  writing?: Maybe<Writing>;
};


export type RailwayLineMansionCountArgs = {
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
};


export type RailwayLineMansionPaginationArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};


export type RailwayLineRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type RailwayStation = {
  __typename?: 'RailwayStation';
  averageMansionPrice?: Maybe<RailwayStationAverageMansionPrice>;
  city: City;
  commuteStations: Array<RailwayStationToStation>;
  groupCode: Scalars['ID'];
  id: Scalars['ID'];
  line: RailwayLine;
  mansionCount: Scalars['Int'];
  mansionPagination: MansionPagination;
  name: Scalars['String'];
  nextStations: Array<RailwayStation>;
  pricePredictions: Pricehubble;
  rankingMansions?: Maybe<Array<Mansion>>;
  sameStations: Array<RailwayStation>;
  stationToStations?: Maybe<Array<RailwayStationToStation>>;
  topPriorityStation: RailwayStation;
  writing?: Maybe<Writing>;
};


export type RailwayStationMansionCountArgs = {
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
};


export type RailwayStationMansionPaginationArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};


export type RailwayStationRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};


export type RailwayStationStationToStationsArgs = {
  apb?: Maybe<Scalars['Int']>;
  apt?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  mnt?: Maybe<Scalars['Int']>;
  orap?: Maybe<Scalars['String']>;
  ormn?: Maybe<Scalars['String']>;
  ortt?: Maybe<Scalars['String']>;
  trt?: Maybe<Scalars['Int']>;
};

export type RailwayStationAverageMansionPrice = {
  __typename?: 'RailwayStationAverageMansionPrice';
  averagePrice: Scalars['Int'];
  averageSquarePrice: Scalars['Int'];
  salesHistoriesCount: Scalars['Int'];
};

export type RailwayStationToStation = {
  __typename?: 'RailwayStationToStation';
  endStation?: Maybe<RailwayStation>;
  endStationGroupCode: Scalars['ID'];
  id: Scalars['ID'];
  minutes: Scalars['Int'];
  startStation?: Maybe<RailwayStation>;
  startStationGroupCode: Scalars['ID'];
  transferTime: Scalars['Int'];
};

export type SalesHistoryOrder = {
  /** 並び順 */
  direction?: Maybe<OrderDirection>;
  /** 並び替えの基準となるフィールド */
  field?: Maybe<SalesHistoryOrderField>;
};

export enum SalesHistoryOrderField {
  /** 売却価格 */
  Price = 'PRICE',
  /** 売却日 */
  SaleOn = 'SALE_ON',
  /** 平米単価 */
  SquarePrice = 'SQUARE_PRICE'
}

export type SearchParam = {
  __typename?: 'SearchParam';
  id: Scalars['ID'];
  param: Array<Param>;
};

export type SearchWord = {
  __typename?: 'SearchWord';
  buildingId: Scalars['ID'];
  value: Scalars['String'];
};

export type SimilarMansionOrder = {
  /** 並び順 */
  direction?: Maybe<OrderDirection>;
  /** 並び替えの基準となるフィールド */
  field?: Maybe<MansionOrderField>;
};

export type Street = {
  __typename?: 'Street';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Town = {
  __typename?: 'Town';
  city: City;
  id: Scalars['ID'];
  linkedBuildings?: Maybe<Array<Mansion>>;
  linkedSearchConditions?: Maybe<Array<Param>>;
  linkedStations?: Maybe<Array<RailwayStation>>;
  linkedTowns?: Maybe<Array<Town>>;
  /** N+1回避しつつ、Mansionをカウントするためのフィールド */
  mansionCount: Scalars['Int'];
  mansionPagination: MansionPagination;
  name: Scalars['String'];
  pricePredictions: Pricehubble;
  rankingMansions?: Maybe<Array<Mansion>>;
  writing?: Maybe<Writing>;
};


export type TownMansionCountArgs = {
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
};


export type TownMansionPaginationArgs = {
  brd?: Maybe<Scalars['String']>;
  ckt?: Maybe<Scalars['Int']>;
  ct?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orpr?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  psc?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  tw?: Maybe<Scalars['String']>;
  utb?: Maybe<Scalars['Int']>;
  wd?: Maybe<Scalars['String']>;
};


export type TownRankingMansionsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type Writing = {
  __typename?: 'Writing';
  introduce?: Maybe<Scalars['String']>;
  recommendArea?: Maybe<Scalars['String']>;
  recommendSpot?: Maybe<Scalars['String']>;
  tips?: Maybe<Scalars['String']>;
  traffic?: Maybe<Scalars['String']>;
};

export type MsLibraryCitiesCityInfoFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), info: (
    { __typename?: 'CityInfo' }
    & { crime?: Maybe<(
      { __typename?: 'CityInfoCrime' }
      & Pick<CityInfoCrime, 'crimes' | 'crimeRatioPercentage' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )>, area?: Maybe<(
        { __typename?: 'Area' }
        & Pick<Area, 'id' | 'name'>
      )> }
    )>, household?: Maybe<(
      { __typename?: 'CityInfoHousehold' }
      & Pick<CityInfoHousehold, 'households' | 'ownedHouseholds' | 'ownedPercentage' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )>, age?: Maybe<(
      { __typename?: 'CityInfoAge' }
      & Pick<CityInfoAge, 'averageAge' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )>, income?: Maybe<(
      { __typename?: 'CityInfoIncome' }
      & Pick<CityInfoIncome, 'taxpayers' | 'totalIncome' | 'averageIncome' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )>, medical?: Maybe<(
      { __typename?: 'CityInfoMedical' }
      & { hospitalClinic?: Maybe<(
        { __typename?: 'CityInfoMedicalHospitalClinic' }
        & Pick<CityInfoMedicalHospitalClinic, 'hospitals' | 'clinics' | 'perPopulation' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, bed?: Maybe<(
        { __typename?: 'CityInfoMedicalBed' }
        & Pick<CityInfoMedicalBed, 'beds' | 'perPopulation' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )> }
    )>, birthrate?: Maybe<(
      { __typename?: 'CityInfoBirthrate' }
      & Pick<CityInfoBirthrate, 'birthrate' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )>, care?: Maybe<(
      { __typename?: 'CityInfoCare' }
      & Pick<CityInfoCare, 'careHomes' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )>, park?: Maybe<(
      { __typename?: 'CityInfoPark' }
      & Pick<CityInfoPark, 'parks' | 'parkArea' | 'areaPerPerson' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )>, school?: Maybe<(
      { __typename?: 'CityInfoSchool' }
      & { middleProceed?: Maybe<(
        { __typename?: 'CityInfoSchoolMiddleProceed' }
        & Pick<CityInfoSchoolMiddleProceed, 'schoolProceed' | 'nationalSchoolProceed' | 'privateSchoolProceed' | 'proceedRatioPercentage' | 'prefectureRank' | 'capitalRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, kindergarten?: Maybe<(
        { __typename?: 'CityInfoSchoolKindergarten' }
        & Pick<CityInfoSchoolKindergarten, 'kindergartens' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, primary?: Maybe<(
        { __typename?: 'CityInfoSchoolPrimary' }
        & Pick<CityInfoSchoolPrimary, 'primarySchools' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, middle?: Maybe<(
        { __typename?: 'CityInfoSchoolMiddle' }
        & Pick<CityInfoSchoolMiddle, 'middleSchools' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, high?: Maybe<(
        { __typename?: 'CityInfoSchoolHigh' }
        & Pick<CityInfoSchoolHigh, 'highSchools' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )> }
    )>, population?: Maybe<(
      { __typename?: 'CityInfoPopulation' }
      & { growth?: Maybe<(
        { __typename?: 'CityInfoPopulationGrowth' }
        & Pick<CityInfoPopulationGrowth, 'populationGrowthPercentage' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, density?: Maybe<(
        { __typename?: 'CityInfoPopulationDensity' }
        & Pick<CityInfoPopulationDensity, 'populationDensity' | 'prefectureRank' | 'areaRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )>, underFifteen?: Maybe<(
        { __typename?: 'CityInfoPopulationUnderFifteen' }
        & Pick<CityInfoPopulationUnderFifteen, 'underFifteenPopulation' | 'underFifteenPopulationPercentage' | 'capitalRank' | 'prefectureRank' | 'deviation'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'id' | 'typeName'>
        )> }
      )> }
    )>, waitingChild?: Maybe<(
      { __typename?: 'CityInfoWaitingChild' }
      & Pick<CityInfoWaitingChild, 'waitingChilds' | 'waitingChildsPerUnderFourPopulation' | 'prefectureRank' | 'areaRank' | 'deviation'>
      & { grade?: Maybe<(
        { __typename?: 'Grade' }
        & Pick<Grade, 'id' | 'typeName'>
      )> }
    )> }
  ) }
);

export type MsLibraryMansionsProductJsonLdFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name' | 'age' | 'blockNumber' | 'managementCompany' | 'uniqueCode'>
  & { structure: (
    { __typename?: 'MansionStructure' }
    & Pick<MansionStructure, 'name'>
  ), prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'name'>
  ), street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'name'>
  )>, access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes'>
  )>, salesHistorySummaries: Array<(
    { __typename?: 'MansionSalesHistorySummary' }
    & Pick<MansionSalesHistorySummary, 'layout' | 'minPrice' | 'maxPrice' | 'minExclusiveArea' | 'maxExclusiveArea'>
  )> }
);

export type MansionCardDataFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'uniqueCode' | 'name' | 'age' | 'constructedIn' | 'unitAmount' | 'pageView' | 'blockNumber'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'name'>
  ), street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'name'>
  )>, display: (
    { __typename?: 'MansionDisplay' }
    & Pick<MansionDisplay, 'minPrice' | 'maxPrice' | 'minExclusiveArea' | 'maxExclusiveArea' | 'layoutName'>
  ), access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
  )> }
  & MsLibraryMansionsUnitSizeFragment
);

export type MansionPaginationQueryVariables = Exact<{
  brd?: Maybe<Scalars['String']>;
  psc?: Maybe<Scalars['String']>;
  wd?: Maybe<Scalars['String']>;
  ct?: Maybe<Scalars['String']>;
  tw?: Maybe<Scalars['String']>;
  st?: Maybe<Scalars['String']>;
  ln?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  thb?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  ckt?: Maybe<Scalars['Int']>;
  utb?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
  orpr?: Maybe<Scalars['String']>;
  orar?: Maybe<Scalars['String']>;
  orck?: Maybe<Scalars['String']>;
  ormd?: Maybe<Scalars['String']>;
  orud?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  per?: Maybe<Scalars['Int']>;
}>;


export type MansionPaginationQuery = (
  { __typename?: 'Query' }
  & { mansionPagination: (
    { __typename?: 'MansionPagination' }
    & Pick<MansionPagination, 'isNoindex'>
    & { mansions: Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>, pagination: (
      { __typename?: 'Pagination' }
      & Pick<Pagination, 'totalCount' | 'totalPages' | 'currentPage' | 'limitValue'>
    ) }
  ) }
);

export type BrandListQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandListQuery = (
  { __typename?: 'Query' }
  & { brands: Array<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'name' | 'mansionCount'>
  )> }
);

export type CityListQueryVariables = Exact<{
  jisCode: Scalars['String'];
}>;


export type CityListQuery = (
  { __typename?: 'Query' }
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & { cities: Array<(
      { __typename?: 'City' }
      & Pick<City, 'name' | 'jisCode' | 'mansionCount'>
      & { towns: Array<(
        { __typename?: 'Town' }
        & Pick<Town, 'id'>
      )> }
    )> }
  ) }
);

export type LineListQueryVariables = Exact<{
  jisCode: Scalars['String'];
  md?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  ckt?: Maybe<Scalars['Int']>;
  utb?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
}>;


export type LineListQuery = (
  { __typename?: 'Query' }
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & { companies: Array<(
      { __typename?: 'RailwayCompany' }
      & Pick<RailwayCompany, 'name'>
      & { lines: Array<(
        { __typename?: 'RailwayLine' }
        & Pick<RailwayLine, 'id' | 'name' | 'mansionCount'>
        & { stations: Array<(
          { __typename?: 'RailwayStation' }
          & Pick<RailwayStation, 'id' | 'name'>
        )> }
      )> }
    )> }
  ) }
);

export type PrimarySchoolsListQueryVariables = Exact<{
  jisCode: Scalars['String'];
}>;


export type PrimarySchoolsListQuery = (
  { __typename?: 'Query' }
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'jisCode'>
    & { cities: Array<(
      { __typename?: 'City' }
      & Pick<City, 'name' | 'id'>
      & { primarySchools?: Maybe<Array<(
        { __typename?: 'PrimarySchool' }
        & Pick<PrimarySchool, 'schoolId' | 'name' | 'mansionCount'>
      )>> }
    )> }
  ) }
);

export type StationListQueryVariables = Exact<{
  ln: Scalars['String'];
  tw?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  ckt?: Maybe<Scalars['Int']>;
  utb?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
}>;


export type StationListQuery = (
  { __typename?: 'Query' }
  & { lines: Array<(
    { __typename?: 'RailwayLine' }
    & Pick<RailwayLine, 'id' | 'name'>
    & { stations: Array<(
      { __typename?: 'RailwayStation' }
      & Pick<RailwayStation, 'name' | 'id' | 'mansionCount'>
    )> }
  )> }
);

export type StationsLineListQueryVariables = Exact<{
  st: Scalars['String'];
}>;


export type StationsLineListQuery = (
  { __typename?: 'Query' }
  & { stations: Array<(
    { __typename?: 'RailwayStation' }
    & { line: (
      { __typename?: 'RailwayLine' }
      & Pick<RailwayLine, 'id'>
    ) }
  )> }
);

export type TownListQueryVariables = Exact<{
  ct?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  ckt?: Maybe<Scalars['Int']>;
  utb?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
}>;


export type TownListQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { towns: Array<(
      { __typename?: 'Town' }
      & Pick<Town, 'id' | 'name' | 'mansionCount'>
    )> }
  )> }
);

export type TownsCityListQueryVariables = Exact<{
  tw?: Maybe<Scalars['String']>;
}>;


export type TownsCityListQuery = (
  { __typename?: 'Query' }
  & { towns: Array<(
    { __typename?: 'Town' }
    & { city: (
      { __typename?: 'City' }
      & Pick<City, 'jisCode'>
    ) }
  )> }
);

export type MsLibraryCityIncludedStationsFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), stations?: Maybe<Array<(
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name' | 'mansionCount'>
  )>> }
);

export type MsLibraryCitiesCityInfoAutoFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { towns: Array<(
    { __typename?: 'Town' }
    & Pick<Town, 'name'>
  )>, prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
    & { pricePredictions: (
      { __typename?: 'Pricehubble' }
      & { salePricePerTsubo: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'prefecture'>
      )> }
    ) }
  ), pricePredictions: (
    { __typename?: 'Pricehubble' }
    & { salePricePerTsubo: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'city'>
    )> }
  ), info: (
    { __typename?: 'CityInfo' }
    & { crime?: Maybe<(
      { __typename?: 'CityInfoCrime' }
      & Pick<CityInfoCrime, 'crimes' | 'prefectureRank' | 'deviation'>
    )>, income?: Maybe<(
      { __typename?: 'CityInfoIncome' }
      & Pick<CityInfoIncome, 'averageIncome' | 'prefectureRank'>
    )>, school?: Maybe<(
      { __typename?: 'CityInfoSchool' }
      & { kindergarten?: Maybe<(
        { __typename?: 'CityInfoSchoolKindergarten' }
        & Pick<CityInfoSchoolKindergarten, 'kindergartens' | 'prefectureRank' | 'deviation'>
      )> }
    )>, population?: Maybe<(
      { __typename?: 'CityInfoPopulation' }
      & { basic?: Maybe<(
        { __typename?: 'CityInfoPopulationBasic' }
        & Pick<CityInfoPopulationBasic, 'population'>
      )> }
    )> }
  ) }
);

export type MsLibraryCitiesCityInfoWritingFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), writing?: Maybe<(
    { __typename?: 'Writing' }
    & Pick<Writing, 'introduce' | 'tips' | 'recommendArea' | 'traffic' | 'recommendSpot'>
  )> }
);

export type MsLibraryCitiesMarketPriceFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
    & { pricePredictions: (
      { __typename?: 'Pricehubble' }
      & { salePricePerTsubo: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'prefecture'>
      )>, salePricePerSquare: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'prefecture'>
      )> }
    ) }
  ), pricePredictions: (
    { __typename?: 'Pricehubble' }
    & { salePricePerTsubo: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'city'>
    )>, salePricePerSquare: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'city'>
    )> }
  ) }
);

export type MsLibraryCityNeighborCitiesFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), neighborCities?: Maybe<Array<(
    { __typename?: 'City' }
    & Pick<City, 'jisCode' | 'name' | 'mansionCount'>
  )>> }
);

export type MsLibraryCitiesOtherCitiesFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'jisCode'>
    & { cities: Array<(
      { __typename?: 'City' }
      & Pick<City, 'name' | 'jisCode' | 'mansionCount'>
    )> }
  ) }
);

export type MsLibraryRailwayStationToStationItemFragment = (
  { __typename?: 'RailwayStationToStation' }
  & Pick<RailwayStationToStation, 'minutes' | 'transferTime'>
  & { endStation?: Maybe<(
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name' | 'groupCode' | 'mansionCount'>
    & { sameStations: Array<(
      { __typename?: 'RailwayStation' }
      & { line: (
        { __typename?: 'RailwayLine' }
        & Pick<RailwayLine, 'id' | 'name'>
      ) }
    )>, averageMansionPrice?: Maybe<(
      { __typename?: 'RailwayStationAverageMansionPrice' }
      & Pick<RailwayStationAverageMansionPrice, 'averageSquarePrice'>
    )>, city: (
      { __typename?: 'City' }
      & Pick<City, 'name'>
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & Pick<Prefecture, 'name'>
      ) }
    ) }
  )> }
);

export type MsLibraryIndexIeulColumnFragment = (
  { __typename?: 'Prefecture' }
  & { category?: Maybe<Array<(
    { __typename?: 'IndexIeulColumnType' }
    & Pick<IndexIeulColumnType, 'href' | 'title' | 'thumbnail' | 'description'>
  )>>, ids?: Maybe<Array<(
    { __typename?: 'IndexIeulColumnType' }
    & Pick<IndexIeulColumnType, 'href' | 'title' | 'thumbnail' | 'description'>
  )>> }
);

export type FreeWordQueryVariables = Exact<{
  word: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
}>;


export type FreeWordQuery = (
  { __typename?: 'Query' }
  & { freeWord: Array<(
    { __typename?: 'SearchWord' }
    & Pick<SearchWord, 'value'>
  )> }
);

export type MsLibraryIndexPrefectureFragment = (
  { __typename?: 'Prefecture' }
  & Pick<Prefecture, 'id' | 'name' | 'jisCode'>
);

export type MsLibraryLinesMarketPriceFragment = (
  { __typename?: 'RailwayLine' }
  & Pick<RailwayLine, 'name'>
  & { pricePredictions: (
    { __typename?: 'Pricehubble' }
    & { salePricePerTsubo: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'line'>
    )>, salePricePerSquare: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'line'>
    )> }
  ) }
);

export type MsLibraryRailwayLinePassedCitiesFragment = (
  { __typename?: 'RailwayLine' }
  & Pick<RailwayLine, 'name'>
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'jisCode' | 'name' | 'mansionCount'>
  )> }
);

export type LineWritingFragment = (
  { __typename?: 'RailwayLine' }
  & Pick<RailwayLine, 'name'>
  & { writing?: Maybe<(
    { __typename?: 'Writing' }
    & Pick<Writing, 'introduce' | 'recommendArea' | 'recommendSpot' | 'tips' | 'traffic'>
  )> }
);

export type MsLibraryMansionsAccessFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name' | 'blockNumber'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'jisCode'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name' | 'jisCode'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name'>
  ), street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'name'>
  )>, access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
  )> }
);

export type MsLibraryMansionsBaseInfoFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'uniqueCode' | 'name' | 'age' | 'constructedIn' | 'blockNumber'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'jisCode'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name' | 'jisCode'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name'>
  ), street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'name'>
  )>, access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
  )>, display: (
    { __typename?: 'MansionDisplay' }
    & Pick<MansionDisplay, 'minExclusiveArea' | 'maxExclusiveArea'>
  ) }
);

export type MsLibraryMansionsCitySummaryFragment = (
  { __typename?: 'Mansion' }
  & { city: (
    { __typename?: 'City' }
    & { averagePrice: (
      { __typename?: 'CityAveragePriceType' }
      & { layout: Array<(
        { __typename?: 'AveragePriceLayout' }
        & Pick<AveragePriceLayout, 'fullLayoutName' | 'averagePrice' | 'salesHistoriesCount'>
      )>, date: Array<(
        { __typename?: 'AveragePriceDate' }
        & Pick<AveragePriceDate, 'age' | 'averagePrice' | 'salesHistoriesCount'>
      )> }
    ) }
  ) }
);

export type MsLibraryMansionsDetailsFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name' | 'age' | 'constructedIn' | 'blockNumber' | 'groundFloor' | 'undergroundFloor' | 'unitAmount' | 'landPrivilege' | 'constructCompany' | 'managementForm' | 'managementCompany' | 'parking' | 'landUseZones' | 'layouts'>
  & { structure: (
    { __typename?: 'MansionStructure' }
    & Pick<MansionStructure, 'name'>
  ), prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'jisCode'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name' | 'jisCode'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name'>
  ), street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'name'>
  )>, access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
  )> }
);

export type MsLibraryMansionsMansionHistoryFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'uniqueCode' | 'name' | 'constructedIn' | 'age' | 'blockNumber'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'jisCode'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name' | 'jisCode'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'name'>
  ), street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'name'>
  )>, salesHistorySummaries: Array<(
    { __typename?: 'MansionSalesHistorySummary' }
    & Pick<MansionSalesHistorySummary, 'layout' | 'minPrice' | 'maxPrice'>
  )>, access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
  )> }
);

export type MsLibraryMansionsMarketPriceFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
  ), town: (
    { __typename?: 'Town' }
    & Pick<Town, 'name'>
  ), access: Array<(
    { __typename?: 'MansionAccess' }
    & Pick<MansionAccess, 'stationName'>
  )>, priceHubble?: Maybe<(
    { __typename?: 'Pricehubble' }
    & { salePricePerSquare: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'building' | 'station' | 'prefecture' | 'city' | 'town'>
    )>, salePricePerTsubo: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'building' | 'station' | 'prefecture' | 'city' | 'town'>
    )> }
  )> }
);

export type MsLibraryMansionsSalesCtaFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name' | 'blockNumber'>
  & { street?: Maybe<(
    { __typename?: 'Street' }
    & Pick<Street, 'id'>
  )> }
);

export type MsLibraryMansionsSalesHistoriesFragment = (
  { __typename?: 'Mansion' }
  & { salesHistories: (
    { __typename?: 'MansionSalesHistoryConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'MansionSalesHistoryEdge' }
      & { node?: Maybe<(
        { __typename?: 'MansionSalesHistory' }
        & Pick<MansionSalesHistory, 'id' | 'price' | 'squarePrice' | 'saleOn' | 'exclusiveArea' | 'floorNumber' | 'layout'>
      )> }
    )>>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'startCursor' | 'endCursor' | 'hasPreviousPage' | 'hasNextPage'>
    ) }
  ) }
);

export type MsLibraryMansionsSalesSummaryFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'constructedIn' | 'age' | 'name'>
  & { salesHistorySummaries: Array<(
    { __typename?: 'MansionSalesHistorySummary' }
    & Pick<MansionSalesHistorySummary, 'layout' | 'minPrice' | 'maxPrice' | 'minExclusiveArea' | 'maxExclusiveArea'>
  )> }
);

export type MsLibraryMansionsSeismicSafetyFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name' | 'age' | 'constructedIn'>
  & { structure: (
    { __typename?: 'MansionStructure' }
    & Pick<MansionStructure, 'name' | 'slug'>
  ) }
);

export type MsLibraryMansionsSimilarMansionsFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name'>
  & { city: (
    { __typename?: 'City' }
    & Pick<City, 'name' | 'jisCode'>
  ), similarMansions: (
    { __typename?: 'MansionConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'MansionEdge' }
      & { node?: Maybe<(
        { __typename?: 'Mansion' }
        & Pick<Mansion, 'uniqueCode' | 'name' | 'constructedIn' | 'age' | 'blockNumber'>
        & { prefecture: (
          { __typename?: 'Prefecture' }
          & Pick<Prefecture, 'name' | 'jisCode'>
        ), city: (
          { __typename?: 'City' }
          & Pick<City, 'name' | 'jisCode'>
        ), town: (
          { __typename?: 'Town' }
          & Pick<Town, 'name'>
        ), street?: Maybe<(
          { __typename?: 'Street' }
          & Pick<Street, 'name'>
        )>, salesHistorySummaries: Array<(
          { __typename?: 'MansionSalesHistorySummary' }
          & Pick<MansionSalesHistorySummary, 'layout' | 'minPrice' | 'maxPrice'>
        )>, access: Array<(
          { __typename?: 'MansionAccess' }
          & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
        )> }
      )> }
    )>>> }
  ) }
);

export type MsLibraryMansionsUnitSizeFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name'>
  & { salesHistorySummaries: Array<(
    { __typename?: 'MansionSalesHistorySummary' }
    & Pick<MansionSalesHistorySummary, 'layout' | 'numberOfRooms' | 'exclusiveAreas'>
    & { layoutKind: (
      { __typename?: 'MansionLayoutKind' }
      & Pick<MansionLayoutKind, 'slug' | 'sort'>
    ) }
  )> }
);

export type MsLibraryPrefecturesCitiesFragment = (
  { __typename?: 'Prefecture' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'name' | 'jisCode' | 'mansionCount'>
  )> }
);

export type MsLibraryPrefecturesLinesFragment = (
  { __typename?: 'Prefecture' }
  & { companies: Array<(
    { __typename?: 'RailwayCompany' }
    & Pick<RailwayCompany, 'name'>
    & { lines: Array<(
      { __typename?: 'RailwayLine' }
      & Pick<RailwayLine, 'id' | 'name' | 'mansionCount'>
      & { stations: Array<(
        { __typename?: 'RailwayStation' }
        & Pick<RailwayStation, 'id'>
      )> }
    )> }
  )> }
);

export type AreaRankingLinksDataFragment = (
  { __typename?: 'Prefecture' }
  & Pick<Prefecture, 'jisCode' | 'name'>
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'jisCode' | 'name'>
  )> }
);

export type MsLibraryMiniRankingMansionsFragment = (
  { __typename?: 'Mansion' }
  & Pick<Mansion, 'name' | 'pageView' | 'uniqueCode'>
);

export type MsLibraryPrimarySchoolOtherSchoolsFragment = (
  { __typename?: 'PrimarySchool' }
  & { city?: Maybe<(
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { primarySchools?: Maybe<Array<(
      { __typename?: 'PrimarySchool' }
      & Pick<PrimarySchool, 'schoolId' | 'name' | 'mansionCount'>
    )>> }
  )> }
);

export type SchoolInfoDataFragment = (
  { __typename?: 'PrimarySchool' }
  & Pick<PrimarySchool, 'name'>
  & { averagePrice: (
    { __typename?: 'PrimarySchoolAveragePriceType' }
    & { base: Array<(
      { __typename?: 'AveragePriceBase' }
      & Pick<AveragePriceBase, 'averageSquarePrice'>
    )>, layout: Array<(
      { __typename?: 'AveragePriceLayout' }
      & Pick<AveragePriceLayout, 'fullLayoutName' | 'averageSquarePrice'>
    )> }
  ), city?: Maybe<(
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { averagePrice: (
      { __typename?: 'CityAveragePriceType' }
      & { base: Array<(
        { __typename?: 'AveragePriceBase' }
        & Pick<AveragePriceBase, 'averageSquarePrice'>
      )>, layout: Array<(
        { __typename?: 'AveragePriceLayout' }
        & Pick<AveragePriceLayout, 'averageSquarePrice'>
      )> }
    ), info: (
      { __typename?: 'CityInfo' }
      & { crime?: Maybe<(
        { __typename?: 'CityInfoCrime' }
        & Pick<CityInfoCrime, 'crimes' | 'areaRank'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'typeName'>
        )>, area?: Maybe<(
          { __typename?: 'Area' }
          & Pick<Area, 'citiesCount'>
        )> }
      )>, park?: Maybe<(
        { __typename?: 'CityInfoPark' }
        & Pick<CityInfoPark, 'parks' | 'areaRank'>
        & { grade?: Maybe<(
          { __typename?: 'Grade' }
          & Pick<Grade, 'typeName'>
        )>, area?: Maybe<(
          { __typename?: 'Area' }
          & Pick<Area, 'citiesCount'>
        )> }
      )> }
    ) }
  )>, prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
    & { averagePrice: (
      { __typename?: 'PrefectureAveragePriceType' }
      & { base: Array<(
        { __typename?: 'AveragePriceBase' }
        & Pick<AveragePriceBase, 'averageSquarePrice'>
      )>, layout: Array<(
        { __typename?: 'AveragePriceLayout' }
        & Pick<AveragePriceLayout, 'averageSquarePrice'>
      )> }
    ) }
  ) }
);

export type SchoolReviewsDataFragment = (
  { __typename?: 'PrimarySchool' }
  & Pick<PrimarySchool, 'schoolId' | 'name' | 'nameKana'>
  & { review?: Maybe<Array<(
    { __typename?: 'PrimarySchoolReview' }
    & Pick<PrimarySchoolReview, 'id' | 'personGender' | 'title' | 'admmisionYear' | 'postYear' | 'postMonth' | 'generalRate' | 'generalText' | 'policyText' | 'policyRate' | 'classText' | 'classRate' | 'teacherText' | 'teacherRate' | 'institutionText' | 'institutionRate' | 'accessText' | 'accessRate' | 'ptaText' | 'ptaRate' | 'eventText' | 'eventRate' | 'howGoText' | 'uniformPresent' | 'lunchPresent' | 'lunchText' | 'costText' | 'motivationText' | 'proceedText' | 'proceedReasonText'>
  )>> }
);

export type MsLibraryStationsMarketPriceFragment = (
  { __typename?: 'RailwayStation' }
  & Pick<RailwayStation, 'name'>
  & { pricePredictions: (
    { __typename?: 'Pricehubble' }
    & { salePricePerTsubo: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'station'>
    )>, salePricePerSquare: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'station'>
    )> }
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { pricePredictions: (
      { __typename?: 'Pricehubble' }
      & { salePricePerTsubo: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'city'>
      )>, salePricePerSquare: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'city'>
      )> }
    ), prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name'>
      & { pricePredictions: (
        { __typename?: 'Pricehubble' }
        & { salePricePerTsubo: Array<(
          { __typename?: 'PricehubbleType' }
          & Pick<PricehubbleType, 'date' | 'prefecture'>
        )>, salePricePerSquare: Array<(
          { __typename?: 'PricehubbleType' }
          & Pick<PricehubbleType, 'date' | 'prefecture'>
        )> }
      ) }
    ) }
  ) }
);

export type MsLibraryRailwayStationNeighborStationsFragment = (
  { __typename?: 'RailwayStation' }
  & Pick<RailwayStation, 'name'>
  & { sameStations: Array<(
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'name'>
    & { line: (
      { __typename?: 'RailwayLine' }
      & Pick<RailwayLine, 'name'>
    ), nextStations: Array<(
      { __typename?: 'RailwayStation' }
      & Pick<RailwayStation, 'id' | 'name' | 'mansionCount'>
    )> }
  )> }
);

export type StationInfoFragment = (
  { __typename?: 'RailwayStationToStation' }
  & { startStation?: Maybe<(
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name'>
  )> }
);

export type MsLibraryCitiesIndexedTownsFragment = (
  { __typename?: 'City' }
  & Pick<City, 'name'>
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
  ), indexedTowns?: Maybe<Array<(
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name' | 'mansionCount'>
  )>> }
);

export type MsLibraryTownsInfoWritingFragment = (
  { __typename?: 'Town' }
  & Pick<Town, 'name'>
  & { city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name'>
    ) }
  ), writing?: Maybe<(
    { __typename?: 'Writing' }
    & Pick<Writing, 'introduce' | 'tips' | 'recommendArea' | 'traffic' | 'recommendSpot'>
  )> }
);

export type MsLibraryTownsLinkedBuildingsFragment = (
  { __typename?: 'Town' }
  & Pick<Town, 'name'>
  & { city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name'>
    ) }
  ), linkedBuildings?: Maybe<Array<(
    { __typename?: 'Mansion' }
    & Pick<Mansion, 'uniqueCode' | 'name' | 'constructedIn' | 'age' | 'blockNumber'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name' | 'jisCode'>
    ), city: (
      { __typename?: 'City' }
      & Pick<City, 'name' | 'jisCode'>
    ), town: (
      { __typename?: 'Town' }
      & Pick<Town, 'name'>
    ), street?: Maybe<(
      { __typename?: 'Street' }
      & Pick<Street, 'name'>
    )>, salesHistorySummaries: Array<(
      { __typename?: 'MansionSalesHistorySummary' }
      & Pick<MansionSalesHistorySummary, 'layout' | 'minPrice' | 'maxPrice'>
    )>, access: Array<(
      { __typename?: 'MansionAccess' }
      & Pick<MansionAccess, 'id' | 'stationId' | 'stationLineName' | 'stationName' | 'stationWalkingMinutes' | 'lineId'>
    )> }
  )>> }
);

export type MsLibraryTownsLinkedSearchConditionsFragment = (
  { __typename?: 'Town' }
  & { linkedSearchConditions?: Maybe<Array<(
    { __typename?: 'Param' }
    & Pick<Param, 'key' | 'value' | 'name'>
  )>> }
);

export type MsLibraryTownsLinkedStationsFragment = (
  { __typename?: 'Town' }
  & Pick<Town, 'name'>
  & { city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name'>
    ) }
  ), linkedStations?: Maybe<Array<(
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name' | 'mansionCount'>
  )>> }
);

export type MsLibraryTownsLinkedTownsFragment = (
  { __typename?: 'Town' }
  & Pick<Town, 'name'>
  & { city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name'>
    ) }
  ), linkedTowns?: Maybe<Array<(
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name' | 'mansionCount'>
  )>> }
);

export type MsLibraryTownsMarketPriceFragment = (
  { __typename?: 'Town' }
  & Pick<Town, 'name'>
  & { pricePredictions: (
    { __typename?: 'Pricehubble' }
    & { salePricePerTsubo: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'town'>
    )>, salePricePerSquare: Array<(
      { __typename?: 'PricehubbleType' }
      & Pick<PricehubbleType, 'date' | 'town'>
    )> }
  ), city: (
    { __typename?: 'City' }
    & Pick<City, 'name'>
    & { pricePredictions: (
      { __typename?: 'Pricehubble' }
      & { salePricePerTsubo: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'city'>
      )>, salePricePerSquare: Array<(
        { __typename?: 'PricehubbleType' }
        & Pick<PricehubbleType, 'date' | 'city'>
      )> }
    ), prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name'>
      & { pricePredictions: (
        { __typename?: 'Pricehubble' }
        & { salePricePerTsubo: Array<(
          { __typename?: 'PricehubbleType' }
          & Pick<PricehubbleType, 'date' | 'prefecture'>
        )>, salePricePerSquare: Array<(
          { __typename?: 'PricehubbleType' }
          & Pick<PricehubbleType, 'date' | 'prefecture'>
        )> }
      ) }
    ) }
  ) }
);

export type FindFromLinesQueryVariables = Exact<{
  jisCode: Scalars['String'];
}>;


export type FindFromLinesQuery = (
  { __typename?: 'Query' }
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & { companies: Array<(
      { __typename?: 'RailwayCompany' }
      & Pick<RailwayCompany, 'name'>
      & { lines: Array<(
        { __typename?: 'RailwayLine' }
        & Pick<RailwayLine, 'id' | 'name' | 'mansionCount'>
        & { stations: Array<(
          { __typename?: 'RailwayStation' }
          & Pick<RailwayStation, 'id' | 'name' | 'mansionCount'>
        )> }
      )> }
    )> }
  ) }
);

export type FindFromShoolsQueryVariables = Exact<{
  jisCode: Scalars['String'];
}>;


export type FindFromShoolsQuery = (
  { __typename?: 'Query' }
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & { cities: Array<(
      { __typename?: 'City' }
      & Pick<City, 'id' | 'name'>
      & { primarySchools?: Maybe<Array<(
        { __typename?: 'PrimarySchool' }
        & Pick<PrimarySchool, 'schoolId' | 'name' | 'mansionCount'>
      )>> }
    )> }
  ) }
);

export type RankingCityInfoFragment = (
  { __typename?: 'City' }
  & { info: (
    { __typename?: 'CityInfo' }
    & { age?: Maybe<(
      { __typename?: 'CityInfoAge' }
      & Pick<CityInfoAge, 'averageAge'>
    )>, income?: Maybe<(
      { __typename?: 'CityInfoIncome' }
      & Pick<CityInfoIncome, 'averageIncome'>
    )> }
  ) }
  & MsLibraryCitiesMarketPriceFragment
);

export type BrandsQueryVariables = Exact<{
  brd?: Maybe<Scalars['String']>;
}>;


export type BrandsQuery = (
  { __typename?: 'Query' }
  & { brands: Array<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'name' | 'mansionCount'>
    & { rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>> }
  )> }
);

export type CitiesQueryVariables = Exact<{
  ct: Scalars['String'];
}>;


export type CitiesQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'City' }
    & Pick<City, 'jisCode' | 'name' | 'mansionCount'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & Pick<Prefecture, 'name' | 'jisCode'>
    ), rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>> }
    & MsLibraryCitiesCityInfoFragment
    & MsLibraryCitiesIndexedTownsFragment
    & MsLibraryCitiesMarketPriceFragment
    & MsLibraryCitiesCityInfoAutoFragment
    & MsLibraryCitiesCityInfoWritingFragment
    & MsLibraryCitiesOtherCitiesFragment
    & MsLibraryCityIncludedStationsFragment
    & MsLibraryCityNeighborCitiesFragment
  )> }
);

export type CommuteStationsQueryVariables = Exact<{
  st: Scalars['String'];
  mnt?: Maybe<Scalars['Int']>;
  trt?: Maybe<Scalars['Int']>;
  apb?: Maybe<Scalars['Int']>;
  apt?: Maybe<Scalars['Int']>;
  orap?: Maybe<Scalars['String']>;
  ortt?: Maybe<Scalars['String']>;
  ormn?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type CommuteStationsQuery = (
  { __typename?: 'Query' }
  & { station: (
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name'>
    & { sameStations: Array<(
      { __typename?: 'RailwayStation' }
      & { line: (
        { __typename?: 'RailwayLine' }
        & Pick<RailwayLine, 'id' | 'name'>
      ) }
    )>, stationToStations?: Maybe<Array<(
      { __typename?: 'RailwayStationToStation' }
      & MsLibraryRailwayStationToStationItemFragment
    )>>, topPriorityStation: (
      { __typename?: 'RailwayStation' }
      & Pick<RailwayStation, 'id'>
    ) }
  ) }
);

export type IndexQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & MsLibraryIndexPrefectureFragment
    & MsLibraryIndexIeulColumnFragment
  )> }
);

export type LinesQueryVariables = Exact<{
  ln: Scalars['String'];
  tw?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  ckt?: Maybe<Scalars['Int']>;
  utb?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
}>;


export type LinesQuery = (
  { __typename?: 'Query' }
  & { lines: Array<(
    { __typename?: 'RailwayLine' }
    & Pick<RailwayLine, 'id' | 'name'>
    & { company: (
      { __typename?: 'RailwayCompany' }
      & Pick<RailwayCompany, 'name'>
    ), stations: Array<(
      { __typename?: 'RailwayStation' }
      & Pick<RailwayStation, 'name' | 'id' | 'mansionCount'>
      & { city: (
        { __typename?: 'City' }
        & Pick<City, 'name' | 'jisCode'>
        & { prefecture: (
          { __typename?: 'Prefecture' }
          & Pick<Prefecture, 'name' | 'jisCode'>
        ) }
      ) }
    )>, rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>> }
    & MsLibraryLinesMarketPriceFragment
    & MsLibraryRailwayLinePassedCitiesFragment
    & LineWritingFragment
  )> }
);

export type MansionQueryVariables = Exact<{
  uniqueCode: Scalars['ID'];
  historyCursor?: Maybe<Scalars['String']>;
}>;


export type MansionQuery = (
  { __typename?: 'Query' }
  & { mansion: (
    { __typename?: 'Mansion' }
    & Pick<Mansion, 'pageView'>
    & { primarySchool?: Maybe<(
      { __typename?: 'PrimarySchool' }
      & SchoolReviewsDataFragment
    )>, city: (
      { __typename?: 'City' }
      & MsLibraryCitiesCityInfoFragment
    ) }
    & MsLibraryMansionsBaseInfoFragment
    & MsLibraryMansionsDetailsFragment
    & MsLibraryMansionsSalesHistoriesFragment
    & MsLibraryMansionsSalesSummaryFragment
    & MsLibraryMansionsSeismicSafetyFragment
    & MsLibraryMansionsSimilarMansionsFragment
    & MsLibraryMansionsUnitSizeFragment
    & MsLibraryMansionsSalesCtaFragment
    & MsLibraryMansionsProductJsonLdFragment
    & MsLibraryMansionsMarketPriceFragment
    & MsLibraryMansionsMansionHistoryFragment
    & MsLibraryMansionsCitySummaryFragment
  ) }
);

export type PrefectureQueryVariables = Exact<{
  jisCode: Scalars['String'];
  md?: Maybe<Scalars['String']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  tht?: Maybe<Scalars['Int']>;
  ckt?: Maybe<Scalars['Int']>;
  utb?: Maybe<Scalars['Int']>;
  gfb?: Maybe<Scalars['Int']>;
  gft?: Maybe<Scalars['Int']>;
}>;


export type PrefectureQuery = (
  { __typename?: 'Query' }
  & { prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name' | 'mansionCount'>
    & { rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>> }
    & MsLibraryPrefecturesCitiesFragment
    & MsLibraryPrefecturesLinesFragment
  ) }
);

export type BrandRankingsPageQueryVariables = Exact<{
  brd?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type BrandRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, brands: Array<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'name' | 'mansionCount'>
    & { rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
  )> }
);

export type CityRankingsPageQueryVariables = Exact<{
  jisCode: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type CityRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, city: (
    { __typename?: 'City' }
    & Pick<City, 'jisCode' | 'name'>
    & { prefecture: (
      { __typename?: 'Prefecture' }
      & AreaRankingLinksDataFragment
    ), rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
    & RankingCityInfoFragment
  ) }
);

export type LineRankingsPageQueryVariables = Exact<{
  ln: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type LineRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, line: (
    { __typename?: 'RailwayLine' }
    & Pick<RailwayLine, 'id' | 'name'>
    & { rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
  ) }
);

export type PrefectureRankingsPageQueryVariables = Exact<{
  jisCode: Scalars['String'];
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type PrefectureRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, prefecture: (
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'name'>
    & { rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
    & AreaRankingLinksDataFragment
  ) }
);

export type SchoolRankingsPageQueryVariables = Exact<{
  psc: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type SchoolRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, primarySchools: Array<(
    { __typename?: 'PrimarySchool' }
    & Pick<PrimarySchool, 'schoolId' | 'name'>
    & { city?: Maybe<(
      { __typename?: 'City' }
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & AreaRankingLinksDataFragment
      ) }
      & RankingCityInfoFragment
    )>, rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
  )> }
);

export type StationRankingsPageQueryVariables = Exact<{
  st: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type StationRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, station: (
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name'>
    & { city: (
      { __typename?: 'City' }
      & Pick<City, 'name' | 'jisCode'>
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & AreaRankingLinksDataFragment
      ) }
      & RankingCityInfoFragment
    ), rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
  ) }
);

export type TownRankingsPageQueryVariables = Exact<{
  tw: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  md?: Maybe<Scalars['String']>;
  prb?: Maybe<Scalars['Int']>;
  prt?: Maybe<Scalars['Int']>;
  eab?: Maybe<Scalars['Int']>;
  eat?: Maybe<Scalars['Int']>;
}>;


export type TownRankingsPageQuery = (
  { __typename?: 'Query' }
  & { prefectures: Array<(
    { __typename?: 'Prefecture' }
    & Pick<Prefecture, 'jisCode' | 'name'>
  )>, town: (
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name'>
    & { city: (
      { __typename?: 'City' }
      & Pick<City, 'jisCode' | 'name'>
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & AreaRankingLinksDataFragment
      ) }
      & RankingCityInfoFragment
    ), rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MansionCardDataFragment
    )>> }
  ) }
);

export type PrimarySchoolsQueryVariables = Exact<{
  psc?: Maybe<Scalars['String']>;
  numberOfRooms?: Maybe<Scalars['Int']>;
  layoutKindId?: Maybe<Scalars['ID']>;
}>;


export type PrimarySchoolsQuery = (
  { __typename?: 'Query' }
  & { primarySchools: Array<(
    { __typename?: 'PrimarySchool' }
    & Pick<PrimarySchool, 'schoolId' | 'name' | 'nameKana'>
    & { city?: Maybe<(
      { __typename?: 'City' }
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & Pick<Prefecture, 'name' | 'jisCode'>
      ) }
    )>, rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>> }
    & MsLibraryPrimarySchoolOtherSchoolsFragment
    & SchoolReviewsDataFragment
    & SchoolInfoDataFragment
  )> }
);

export type StationsQueryVariables = Exact<{
  st: Scalars['String'];
}>;


export type StationsQuery = (
  { __typename?: 'Query' }
  & { stations: Array<(
    { __typename?: 'RailwayStation' }
    & Pick<RailwayStation, 'id' | 'name'>
    & { line: (
      { __typename?: 'RailwayLine' }
      & Pick<RailwayLine, 'id' | 'name'>
      & { stations: Array<(
        { __typename?: 'RailwayStation' }
        & Pick<RailwayStation, 'id'>
      )> }
    ), city: (
      { __typename?: 'City' }
      & Pick<City, 'jisCode' | 'name' | 'mansionCount'>
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & Pick<Prefecture, 'jisCode' | 'name'>
      ) }
      & MsLibraryCityIncludedStationsFragment
    ), rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>>, commuteStations: Array<(
      { __typename?: 'RailwayStationToStation' }
      & StationInfoFragment
    )> }
    & MsLibraryStationsMarketPriceFragment
    & MsLibraryRailwayStationNeighborStationsFragment
  )> }
);

export type TownsQueryVariables = Exact<{
  tw: Scalars['String'];
}>;


export type TownsQuery = (
  { __typename?: 'Query' }
  & { towns: Array<(
    { __typename?: 'Town' }
    & Pick<Town, 'id' | 'name'>
    & { city: (
      { __typename?: 'City' }
      & Pick<City, 'jisCode' | 'name'>
      & { prefecture: (
        { __typename?: 'Prefecture' }
        & Pick<Prefecture, 'jisCode' | 'name'>
      ) }
      & MsLibraryCitiesCityInfoFragment
      & MsLibraryCitiesCityInfoAutoFragment
      & MsLibraryCitiesCityInfoWritingFragment
      & MsLibraryCitiesIndexedTownsFragment
      & MsLibraryCitiesOtherCitiesFragment
      & MsLibraryCitiesCityInfoFragment
      & MsLibraryCityIncludedStationsFragment
      & MsLibraryCityNeighborCitiesFragment
    ), rankingMansions?: Maybe<Array<(
      { __typename?: 'Mansion' }
      & MsLibraryMiniRankingMansionsFragment
    )>> }
    & MsLibraryTownsMarketPriceFragment
    & MsLibraryTownsInfoWritingFragment
    & MsLibraryTownsLinkedTownsFragment
    & MsLibraryTownsLinkedStationsFragment
    & MsLibraryTownsLinkedBuildingsFragment
    & MsLibraryTownsLinkedSearchConditionsFragment
  )> }
);

export const MsLibraryCitiesCityInfoFragmentDoc = gql`
    fragment MsLibraryCitiesCityInfo on City {
  name
  prefecture {
    name
  }
  info {
    crime {
      crimes
      crimeRatioPercentage
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
      area {
        id
        name
      }
    }
    household {
      households
      ownedHouseholds
      ownedPercentage
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
    age {
      averageAge
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
    income {
      taxpayers
      totalIncome
      averageIncome
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
    medical {
      hospitalClinic {
        hospitals
        clinics
        perPopulation
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
      bed {
        beds
        perPopulation
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
    }
    birthrate {
      birthrate
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
    care {
      careHomes
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
    park {
      parks
      parkArea
      areaPerPerson
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
    school {
      middleProceed {
        schoolProceed
        nationalSchoolProceed
        privateSchoolProceed
        proceedRatioPercentage
        prefectureRank
        capitalRank
        deviation
        grade {
          id
          typeName
        }
      }
      kindergarten {
        kindergartens
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
      primary {
        primarySchools
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
      middle {
        middleSchools
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
      high {
        highSchools
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
    }
    population {
      growth {
        populationGrowthPercentage
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
      density {
        populationDensity
        prefectureRank
        areaRank
        deviation
        grade {
          id
          typeName
        }
      }
      underFifteen {
        underFifteenPopulation
        underFifteenPopulationPercentage
        capitalRank
        prefectureRank
        deviation
        grade {
          id
          typeName
        }
      }
    }
    waitingChild {
      waitingChilds
      waitingChildsPerUnderFourPopulation
      prefectureRank
      areaRank
      deviation
      grade {
        id
        typeName
      }
    }
  }
}
    `;
export const MsLibraryMansionsProductJsonLdFragmentDoc = gql`
    fragment MsLibraryMansionsProductJsonLd on Mansion {
  name
  age
  blockNumber
  managementCompany
  uniqueCode
  structure {
    name
  }
  prefecture {
    name
  }
  city {
    name
  }
  town {
    name
  }
  street {
    name
  }
  access {
    id
    stationId
    stationLineName
    stationName
    stationWalkingMinutes
  }
  salesHistorySummaries {
    layout
    minPrice
    maxPrice
    minExclusiveArea
    maxExclusiveArea
  }
}
    `;
export const MsLibraryMansionsUnitSizeFragmentDoc = gql`
    fragment MsLibraryMansionsUnitSize on Mansion {
  name
  salesHistorySummaries {
    layout
    numberOfRooms
    layoutKind {
      slug
      sort
    }
    exclusiveAreas
  }
}
    `;
export const MansionCardDataFragmentDoc = gql`
    fragment MansionCardData on Mansion {
  uniqueCode
  name
  age
  constructedIn
  unitAmount
  pageView
  prefecture {
    name
  }
  city {
    name
  }
  town {
    name
  }
  street {
    name
  }
  blockNumber
  display(md: $md, prb: $prb, prt: $prt, eab: $eab, eat: $eat) {
    minPrice
    maxPrice
    minExclusiveArea
    maxExclusiveArea
    layoutName
  }
  access {
    id
    stationId
    stationLineName
    stationName
    stationWalkingMinutes
    lineId
  }
  ...MsLibraryMansionsUnitSize
}
    ${MsLibraryMansionsUnitSizeFragmentDoc}`;
export const MsLibraryCityIncludedStationsFragmentDoc = gql`
    fragment MsLibraryCityIncludedStations on City {
  name
  prefecture {
    name
  }
  stations {
    id
    name
    mansionCount
  }
}
    `;
export const MsLibraryCitiesCityInfoAutoFragmentDoc = gql`
    fragment MsLibraryCitiesCityInfoAuto on City {
  name
  towns {
    name
  }
  prefecture {
    name
    pricePredictions {
      salePricePerTsubo {
        date
        prefecture
      }
    }
  }
  pricePredictions {
    salePricePerTsubo {
      date
      city
    }
  }
  info {
    crime {
      crimes
      prefectureRank
      deviation
    }
    income {
      averageIncome
      prefectureRank
    }
    school {
      kindergarten {
        kindergartens
        prefectureRank
        deviation
      }
    }
    population {
      basic {
        population
      }
    }
  }
}
    `;
export const MsLibraryCitiesCityInfoWritingFragmentDoc = gql`
    fragment MsLibraryCitiesCityInfoWriting on City {
  name
  prefecture {
    name
  }
  writing {
    introduce
    tips
    recommendArea
    traffic
    recommendSpot
  }
}
    `;
export const MsLibraryCityNeighborCitiesFragmentDoc = gql`
    fragment MsLibraryCityNeighborCities on City {
  name
  prefecture {
    name
  }
  neighborCities {
    jisCode
    name
    mansionCount
  }
}
    `;
export const MsLibraryCitiesOtherCitiesFragmentDoc = gql`
    fragment MsLibraryCitiesOtherCities on City {
  name
  prefecture {
    name
    jisCode
    cities {
      name
      jisCode
      mansionCount
    }
  }
}
    `;
export const MsLibraryRailwayStationToStationItemFragmentDoc = gql`
    fragment MsLibraryRailwayStationToStationItem on RailwayStationToStation {
  minutes
  transferTime
  endStation {
    id
    name
    groupCode
    mansionCount
    sameStations {
      line {
        id
        name
      }
    }
    averageMansionPrice {
      averageSquarePrice
    }
    city {
      name
      prefecture {
        name
      }
    }
  }
}
    `;
export const MsLibraryIndexIeulColumnFragmentDoc = gql`
    fragment MsLibraryIndexIeulColumn on Prefecture {
  category {
    href
    title
    thumbnail
    description
  }
  ids {
    href
    title
    thumbnail
    description
  }
}
    `;
export const MsLibraryIndexPrefectureFragmentDoc = gql`
    fragment MsLibraryIndexPrefecture on Prefecture {
  id
  name
  jisCode
}
    `;
export const MsLibraryLinesMarketPriceFragmentDoc = gql`
    fragment MsLibraryLinesMarketPrice on RailwayLine {
  name
  pricePredictions {
    salePricePerTsubo {
      date
      line
    }
    salePricePerSquare {
      date
      line
    }
  }
}
    `;
export const MsLibraryRailwayLinePassedCitiesFragmentDoc = gql`
    fragment MsLibraryRailwayLinePassedCities on RailwayLine {
  name
  cities {
    jisCode
    name
    mansionCount
  }
}
    `;
export const LineWritingFragmentDoc = gql`
    fragment LineWriting on RailwayLine {
  name
  writing {
    introduce
    recommendArea
    recommendSpot
    tips
    traffic
  }
}
    `;
export const MsLibraryMansionsAccessFragmentDoc = gql`
    fragment MsLibraryMansionsAccess on Mansion {
  name
  prefecture {
    name
    jisCode
  }
  city {
    name
    jisCode
  }
  town {
    id
    name
  }
  street {
    name
  }
  blockNumber
  access {
    id
    stationId
    stationLineName
    stationName
    stationWalkingMinutes
    lineId
  }
}
    `;
export const MsLibraryMansionsBaseInfoFragmentDoc = gql`
    fragment MsLibraryMansionsBaseInfo on Mansion {
  uniqueCode
  name
  prefecture {
    name
    jisCode
  }
  city {
    name
    jisCode
  }
  town {
    id
    name
  }
  street {
    name
  }
  age
  constructedIn
  blockNumber
  access {
    id
    stationId
    stationLineName
    stationName
    stationWalkingMinutes
    lineId
  }
  display {
    minExclusiveArea
    maxExclusiveArea
  }
}
    `;
export const MsLibraryMansionsCitySummaryFragmentDoc = gql`
    fragment MsLibraryMansionsCitySummary on Mansion {
  city {
    averagePrice {
      layout {
        fullLayoutName
        averagePrice
        salesHistoriesCount
      }
      date {
        age
        averagePrice
        salesHistoriesCount
      }
    }
  }
}
    `;
export const MsLibraryMansionsDetailsFragmentDoc = gql`
    fragment MsLibraryMansionsDetails on Mansion {
  name
  age
  constructedIn
  blockNumber
  groundFloor
  undergroundFloor
  unitAmount
  landPrivilege
  constructCompany
  managementForm
  managementCompany
  structure {
    name
  }
  prefecture {
    name
    jisCode
  }
  city {
    name
    jisCode
  }
  town {
    id
    name
  }
  street {
    name
  }
  access {
    id
    stationId
    stationLineName
    stationName
    stationWalkingMinutes
    lineId
  }
  parking
  landUseZones
  layouts
}
    `;
export const MsLibraryMansionsMansionHistoryFragmentDoc = gql`
    fragment MsLibraryMansionsMansionHistory on Mansion {
  uniqueCode
  name
  constructedIn
  age
  prefecture {
    name
    jisCode
  }
  city {
    name
    jisCode
  }
  town {
    name
  }
  street {
    name
  }
  blockNumber
  salesHistorySummaries {
    layout
    minPrice
    maxPrice
  }
  access {
    id
    stationId
    stationLineName
    stationName
    stationWalkingMinutes
    lineId
  }
}
    `;
export const MsLibraryMansionsMarketPriceFragmentDoc = gql`
    fragment MsLibraryMansionsMarketPrice on Mansion {
  name
  prefecture {
    name
  }
  city {
    name
  }
  town {
    name
  }
  access {
    stationName
  }
  priceHubble {
    salePricePerSquare {
      date
      building
      station
      prefecture
      city
      town
    }
    salePricePerTsubo {
      date
      building
      station
      prefecture
      city
      town
    }
  }
}
    `;
export const MsLibraryMansionsSalesCtaFragmentDoc = gql`
    fragment MsLibraryMansionsSalesCTA on Mansion {
  name
  street {
    id
  }
  blockNumber
}
    `;
export const MsLibraryMansionsSalesHistoriesFragmentDoc = gql`
    fragment MsLibraryMansionsSalesHistories on Mansion @argumentDefinitions(historyCursor: {type: "String", defaultValue: ""}) {
  salesHistories(first: 4, after: $historyCursor) {
    edges {
      node {
        id
        price
        squarePrice
        saleOn
        exclusiveArea
        floorNumber
        layout
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
  }
}
    `;
export const MsLibraryMansionsSalesSummaryFragmentDoc = gql`
    fragment MsLibraryMansionsSalesSummary on Mansion {
  constructedIn
  age
  name
  salesHistorySummaries {
    layout
    minPrice
    maxPrice
    minExclusiveArea
    maxExclusiveArea
  }
}
    `;
export const MsLibraryMansionsSeismicSafetyFragmentDoc = gql`
    fragment MsLibraryMansionsSeismicSafety on Mansion {
  name
  age
  constructedIn
  structure {
    name
    slug
  }
}
    `;
export const MsLibraryMansionsSimilarMansionsFragmentDoc = gql`
    fragment MsLibraryMansionsSimilarMansions on Mansion {
  name
  city {
    name
    jisCode
  }
  similarMansions(first: 9, orderBy: {field: CONSTRUCTED_IN, direction: DESC}) {
    edges {
      node {
        uniqueCode
        name
        constructedIn
        age
        prefecture {
          name
          jisCode
        }
        city {
          name
          jisCode
        }
        town {
          name
        }
        street {
          name
        }
        blockNumber
        salesHistorySummaries {
          layout
          minPrice
          maxPrice
        }
        access {
          id
          stationId
          stationLineName
          stationName
          stationWalkingMinutes
          lineId
        }
      }
    }
  }
}
    `;
export const MsLibraryPrefecturesCitiesFragmentDoc = gql`
    fragment MsLibraryPrefecturesCities on Prefecture {
  cities {
    name
    jisCode
    mansionCount
  }
}
    `;
export const MsLibraryPrefecturesLinesFragmentDoc = gql`
    fragment MsLibraryPrefecturesLines on Prefecture @argumentDefinitions(md: {type: "String"}, eab: {type: "Int"}, eat: {type: "Int"}, prb: {type: "Int"}, prt: {type: "Int"}, tht: {type: "Int"}, ckt: {type: "Int"}, utb: {type: "Int"}, gfb: {type: "Int"}, gft: {type: "Int"}) {
  companies {
    name
    lines {
      id
      name
      stations {
        id
      }
      mansionCount(
        md: $md
        eab: $eab
        eat: $eat
        prb: $prb
        prt: $prt
        tht: $tht
        ckt: $ckt
        utb: $utb
        gfb: $gfb
        gft: $gft
      )
    }
  }
}
    `;
export const AreaRankingLinksDataFragmentDoc = gql`
    fragment AreaRankingLinksData on Prefecture {
  jisCode
  name
  cities {
    jisCode
    name
  }
}
    `;
export const MsLibraryMiniRankingMansionsFragmentDoc = gql`
    fragment MsLibraryMiniRankingMansions on Mansion {
  name
  pageView
  uniqueCode
}
    `;
export const MsLibraryPrimarySchoolOtherSchoolsFragmentDoc = gql`
    fragment MsLibraryPrimarySchoolOtherSchools on PrimarySchool {
  city {
    name
    primarySchools {
      schoolId
      name
      mansionCount
    }
  }
}
    `;
export const SchoolInfoDataFragmentDoc = gql`
    fragment SchoolInfoData on PrimarySchool {
  name
  averagePrice {
    base {
      averageSquarePrice
    }
    layout(numberOfRooms: $numberOfRooms, layoutKindId: $layoutKindId) {
      fullLayoutName
      averageSquarePrice
    }
  }
  city {
    name
    averagePrice {
      base {
        averageSquarePrice
      }
      layout(numberOfRooms: $numberOfRooms, layoutKindId: $layoutKindId) {
        averageSquarePrice
      }
    }
    info {
      crime {
        crimes
        areaRank
        grade {
          typeName
        }
        area {
          citiesCount
        }
      }
      park {
        parks
        areaRank
        grade {
          typeName
        }
        area {
          citiesCount
        }
      }
    }
  }
  prefecture {
    name
    averagePrice {
      base {
        averageSquarePrice
      }
      layout(numberOfRooms: $numberOfRooms, layoutKindId: $layoutKindId) {
        averageSquarePrice
      }
    }
  }
}
    `;
export const SchoolReviewsDataFragmentDoc = gql`
    fragment SchoolReviewsData on PrimarySchool {
  schoolId
  name
  nameKana
  review {
    id
    personGender
    title
    admmisionYear
    postYear
    postMonth
    generalRate
    generalText
    policyText
    policyRate
    classText
    classRate
    teacherText
    teacherRate
    institutionText
    institutionRate
    accessText
    accessRate
    ptaText
    ptaRate
    eventText
    eventRate
    howGoText
    uniformPresent
    lunchPresent
    lunchText
    costText
    motivationText
    proceedText
    proceedReasonText
  }
}
    `;
export const MsLibraryStationsMarketPriceFragmentDoc = gql`
    fragment MsLibraryStationsMarketPrice on RailwayStation {
  name
  pricePredictions {
    salePricePerTsubo {
      date
      station
    }
    salePricePerSquare {
      date
      station
    }
  }
  city {
    name
    pricePredictions {
      salePricePerTsubo {
        date
        city
      }
      salePricePerSquare {
        date
        city
      }
    }
    prefecture {
      name
      pricePredictions {
        salePricePerTsubo {
          date
          prefecture
        }
        salePricePerSquare {
          date
          prefecture
        }
      }
    }
  }
}
    `;
export const MsLibraryRailwayStationNeighborStationsFragmentDoc = gql`
    fragment MsLibraryRailwayStationNeighborStations on RailwayStation {
  name
  sameStations {
    line {
      name
    }
    name
    nextStations {
      id
      name
      mansionCount
    }
  }
}
    `;
export const StationInfoFragmentDoc = gql`
    fragment StationInfo on RailwayStationToStation {
  startStation {
    id
    name
  }
}
    `;
export const MsLibraryCitiesIndexedTownsFragmentDoc = gql`
    fragment MsLibraryCitiesIndexedTowns on City {
  name
  prefecture {
    name
  }
  indexedTowns {
    id
    name
    mansionCount
  }
}
    `;
export const MsLibraryTownsInfoWritingFragmentDoc = gql`
    fragment MsLibraryTownsInfoWriting on Town {
  name
  city {
    name
    prefecture {
      name
    }
  }
  writing {
    introduce
    tips
    recommendArea
    traffic
    recommendSpot
  }
}
    `;
export const MsLibraryTownsLinkedBuildingsFragmentDoc = gql`
    fragment MsLibraryTownsLinkedBuildings on Town {
  name
  city {
    name
    prefecture {
      name
    }
  }
  linkedBuildings {
    uniqueCode
    name
    constructedIn
    age
    prefecture {
      name
      jisCode
    }
    city {
      name
      jisCode
    }
    town {
      name
    }
    street {
      name
    }
    blockNumber
    salesHistorySummaries {
      layout
      minPrice
      maxPrice
    }
    access {
      id
      stationId
      stationLineName
      stationName
      stationWalkingMinutes
      lineId
    }
  }
}
    `;
export const MsLibraryTownsLinkedSearchConditionsFragmentDoc = gql`
    fragment MsLibraryTownsLinkedSearchConditions on Town {
  linkedSearchConditions {
    key
    value
    name
  }
}
    `;
export const MsLibraryTownsLinkedStationsFragmentDoc = gql`
    fragment MsLibraryTownsLinkedStations on Town {
  name
  city {
    name
    prefecture {
      name
    }
  }
  linkedStations {
    id
    name
    mansionCount
  }
}
    `;
export const MsLibraryTownsLinkedTownsFragmentDoc = gql`
    fragment MsLibraryTownsLinkedTowns on Town {
  name
  city {
    name
    prefecture {
      name
    }
  }
  linkedTowns {
    id
    name
    mansionCount
  }
}
    `;
export const MsLibraryTownsMarketPriceFragmentDoc = gql`
    fragment MsLibraryTownsMarketPrice on Town {
  name
  pricePredictions {
    salePricePerTsubo {
      date
      town
    }
    salePricePerSquare {
      date
      town
    }
  }
  city {
    name
    pricePredictions {
      salePricePerTsubo {
        date
        city
      }
      salePricePerSquare {
        date
        city
      }
    }
    prefecture {
      name
      pricePredictions {
        salePricePerTsubo {
          date
          prefecture
        }
        salePricePerSquare {
          date
          prefecture
        }
      }
    }
  }
}
    `;
export const MsLibraryCitiesMarketPriceFragmentDoc = gql`
    fragment MsLibraryCitiesMarketPrice on City {
  name
  prefecture {
    name
    pricePredictions {
      salePricePerTsubo {
        date
        prefecture
      }
      salePricePerSquare {
        date
        prefecture
      }
    }
  }
  pricePredictions {
    salePricePerTsubo {
      date
      city
    }
    salePricePerSquare {
      date
      city
    }
  }
}
    `;
export const RankingCityInfoFragmentDoc = gql`
    fragment RankingCityInfo on City {
  ...MsLibraryCitiesMarketPrice
  info {
    age {
      averageAge
    }
    income {
      averageIncome
    }
  }
}
    ${MsLibraryCitiesMarketPriceFragmentDoc}`;
export const MansionPaginationDocument = gql`
    query mansionPagination($brd: String, $psc: String, $wd: String, $ct: String, $tw: String, $st: String, $ln: String, $md: String, $eab: Int, $eat: Int, $prb: Int, $prt: Int, $thb: Int, $tht: Int, $ckt: Int, $utb: Int, $gfb: Int, $gft: Int, $orpr: String, $orar: String, $orck: String, $ormd: String, $orud: String, $page: Int, $per: Int) {
  mansionPagination(
    brd: $brd
    psc: $psc
    wd: $wd
    ct: $ct
    tw: $tw
    st: $st
    ln: $ln
    md: $md
    eab: $eab
    eat: $eat
    prb: $prb
    prt: $prt
    thb: $thb
    tht: $tht
    ckt: $ckt
    utb: $utb
    gfb: $gfb
    gft: $gft
    orpr: $orpr
    orar: $orar
    orck: $orck
    ormd: $ormd
    orud: $orud
    page: $page
    per: $per
  ) {
    isNoindex(
      brd: $brd
      wd: $wd
      ct: $ct
      tw: $tw
      st: $st
      ln: $ln
      psc: $psc
      md: $md
      eab: $eab
      eat: $eat
      prb: $prb
      prt: $prt
      thb: $thb
      tht: $tht
      ckt: $ckt
      utb: $utb
      gfb: $gfb
      gft: $gft
      orpr: $orpr
      orar: $orar
      orck: $orck
      ormd: $ormd
      orud: $orud
    )
    mansions {
      ...MansionCardData
    }
    pagination {
      totalCount
      totalPages
      currentPage
      limitValue
    }
  }
}
    ${MansionCardDataFragmentDoc}`;

/**
 * __useMansionPaginationQuery__
 *
 * To run a query within a React component, call `useMansionPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useMansionPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMansionPaginationQuery({
 *   variables: {
 *      brd: // value for 'brd'
 *      psc: // value for 'psc'
 *      wd: // value for 'wd'
 *      ct: // value for 'ct'
 *      tw: // value for 'tw'
 *      st: // value for 'st'
 *      ln: // value for 'ln'
 *      md: // value for 'md'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      thb: // value for 'thb'
 *      tht: // value for 'tht'
 *      ckt: // value for 'ckt'
 *      utb: // value for 'utb'
 *      gfb: // value for 'gfb'
 *      gft: // value for 'gft'
 *      orpr: // value for 'orpr'
 *      orar: // value for 'orar'
 *      orck: // value for 'orck'
 *      ormd: // value for 'ormd'
 *      orud: // value for 'orud'
 *      page: // value for 'page'
 *      per: // value for 'per'
 *   },
 * });
 */
export function useMansionPaginationQuery(baseOptions?: Apollo.QueryHookOptions<MansionPaginationQuery, MansionPaginationQueryVariables>) {
        return Apollo.useQuery<MansionPaginationQuery, MansionPaginationQueryVariables>(MansionPaginationDocument, baseOptions);
      }
export function useMansionPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MansionPaginationQuery, MansionPaginationQueryVariables>) {
          return Apollo.useLazyQuery<MansionPaginationQuery, MansionPaginationQueryVariables>(MansionPaginationDocument, baseOptions);
        }
export type MansionPaginationQueryHookResult = ReturnType<typeof useMansionPaginationQuery>;
export type MansionPaginationLazyQueryHookResult = ReturnType<typeof useMansionPaginationLazyQuery>;
export type MansionPaginationQueryResult = Apollo.QueryResult<MansionPaginationQuery, MansionPaginationQueryVariables>;
export const BrandListDocument = gql`
    query BrandList {
  brands {
    id
    name
    mansionCount
  }
}
    `;

/**
 * __useBrandListQuery__
 *
 * To run a query within a React component, call `useBrandListQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandListQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandListQuery(baseOptions?: Apollo.QueryHookOptions<BrandListQuery, BrandListQueryVariables>) {
        return Apollo.useQuery<BrandListQuery, BrandListQueryVariables>(BrandListDocument, baseOptions);
      }
export function useBrandListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandListQuery, BrandListQueryVariables>) {
          return Apollo.useLazyQuery<BrandListQuery, BrandListQueryVariables>(BrandListDocument, baseOptions);
        }
export type BrandListQueryHookResult = ReturnType<typeof useBrandListQuery>;
export type BrandListLazyQueryHookResult = ReturnType<typeof useBrandListLazyQuery>;
export type BrandListQueryResult = Apollo.QueryResult<BrandListQuery, BrandListQueryVariables>;
export const CityListDocument = gql`
    query CityList($jisCode: String!) {
  prefecture(jisCode: $jisCode) {
    cities {
      name
      jisCode
      mansionCount
      towns {
        id
      }
    }
  }
}
    `;

/**
 * __useCityListQuery__
 *
 * To run a query within a React component, call `useCityListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityListQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *   },
 * });
 */
export function useCityListQuery(baseOptions: Apollo.QueryHookOptions<CityListQuery, CityListQueryVariables>) {
        return Apollo.useQuery<CityListQuery, CityListQueryVariables>(CityListDocument, baseOptions);
      }
export function useCityListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CityListQuery, CityListQueryVariables>) {
          return Apollo.useLazyQuery<CityListQuery, CityListQueryVariables>(CityListDocument, baseOptions);
        }
export type CityListQueryHookResult = ReturnType<typeof useCityListQuery>;
export type CityListLazyQueryHookResult = ReturnType<typeof useCityListLazyQuery>;
export type CityListQueryResult = Apollo.QueryResult<CityListQuery, CityListQueryVariables>;
export const LineListDocument = gql`
    query LineList($jisCode: String!, $md: String, $eab: Int, $eat: Int, $prb: Int, $prt: Int, $tht: Int, $ckt: Int, $utb: Int, $gfb: Int, $gft: Int) {
  prefecture(jisCode: $jisCode) {
    companies {
      name
      lines {
        id
        name
        stations {
          id
          name
        }
        mansionCount(
          md: $md
          eab: $eab
          eat: $eat
          prb: $prb
          prt: $prt
          tht: $tht
          ckt: $ckt
          utb: $utb
          gfb: $gfb
          gft: $gft
        )
      }
    }
  }
}
    `;

/**
 * __useLineListQuery__
 *
 * To run a query within a React component, call `useLineListQuery` and pass it any options that fit your needs.
 * When your component renders, `useLineListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLineListQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *      md: // value for 'md'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      tht: // value for 'tht'
 *      ckt: // value for 'ckt'
 *      utb: // value for 'utb'
 *      gfb: // value for 'gfb'
 *      gft: // value for 'gft'
 *   },
 * });
 */
export function useLineListQuery(baseOptions: Apollo.QueryHookOptions<LineListQuery, LineListQueryVariables>) {
        return Apollo.useQuery<LineListQuery, LineListQueryVariables>(LineListDocument, baseOptions);
      }
export function useLineListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LineListQuery, LineListQueryVariables>) {
          return Apollo.useLazyQuery<LineListQuery, LineListQueryVariables>(LineListDocument, baseOptions);
        }
export type LineListQueryHookResult = ReturnType<typeof useLineListQuery>;
export type LineListLazyQueryHookResult = ReturnType<typeof useLineListLazyQuery>;
export type LineListQueryResult = Apollo.QueryResult<LineListQuery, LineListQueryVariables>;
export const PrimarySchoolsListDocument = gql`
    query PrimarySchoolsList($jisCode: String!) {
  prefecture(jisCode: $jisCode) {
    name
    jisCode
    cities {
      name
      id
      primarySchools {
        schoolId
        name
        mansionCount
      }
    }
  }
}
    `;

/**
 * __usePrimarySchoolsListQuery__
 *
 * To run a query within a React component, call `usePrimarySchoolsListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimarySchoolsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimarySchoolsListQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *   },
 * });
 */
export function usePrimarySchoolsListQuery(baseOptions: Apollo.QueryHookOptions<PrimarySchoolsListQuery, PrimarySchoolsListQueryVariables>) {
        return Apollo.useQuery<PrimarySchoolsListQuery, PrimarySchoolsListQueryVariables>(PrimarySchoolsListDocument, baseOptions);
      }
export function usePrimarySchoolsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimarySchoolsListQuery, PrimarySchoolsListQueryVariables>) {
          return Apollo.useLazyQuery<PrimarySchoolsListQuery, PrimarySchoolsListQueryVariables>(PrimarySchoolsListDocument, baseOptions);
        }
export type PrimarySchoolsListQueryHookResult = ReturnType<typeof usePrimarySchoolsListQuery>;
export type PrimarySchoolsListLazyQueryHookResult = ReturnType<typeof usePrimarySchoolsListLazyQuery>;
export type PrimarySchoolsListQueryResult = Apollo.QueryResult<PrimarySchoolsListQuery, PrimarySchoolsListQueryVariables>;
export const StationListDocument = gql`
    query StationList($ln: String!, $tw: String, $md: String, $eab: Int, $eat: Int, $prb: Int, $prt: Int, $tht: Int, $ckt: Int, $utb: Int, $gfb: Int, $gft: Int) {
  lines(ln: $ln) {
    id
    name
    stations {
      name
      id
      mansionCount(
        ln: $ln
        tw: $tw
        md: $md
        eab: $eab
        eat: $eat
        prb: $prb
        prt: $prt
        tht: $tht
        ckt: $ckt
        utb: $utb
        gfb: $gfb
        gft: $gft
      )
    }
  }
}
    `;

/**
 * __useStationListQuery__
 *
 * To run a query within a React component, call `useStationListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationListQuery({
 *   variables: {
 *      ln: // value for 'ln'
 *      tw: // value for 'tw'
 *      md: // value for 'md'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      tht: // value for 'tht'
 *      ckt: // value for 'ckt'
 *      utb: // value for 'utb'
 *      gfb: // value for 'gfb'
 *      gft: // value for 'gft'
 *   },
 * });
 */
export function useStationListQuery(baseOptions: Apollo.QueryHookOptions<StationListQuery, StationListQueryVariables>) {
        return Apollo.useQuery<StationListQuery, StationListQueryVariables>(StationListDocument, baseOptions);
      }
export function useStationListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationListQuery, StationListQueryVariables>) {
          return Apollo.useLazyQuery<StationListQuery, StationListQueryVariables>(StationListDocument, baseOptions);
        }
export type StationListQueryHookResult = ReturnType<typeof useStationListQuery>;
export type StationListLazyQueryHookResult = ReturnType<typeof useStationListLazyQuery>;
export type StationListQueryResult = Apollo.QueryResult<StationListQuery, StationListQueryVariables>;
export const StationsLineListDocument = gql`
    query StationsLineList($st: String!) {
  stations(st: $st) {
    line {
      id
    }
  }
}
    `;

/**
 * __useStationsLineListQuery__
 *
 * To run a query within a React component, call `useStationsLineListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationsLineListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationsLineListQuery({
 *   variables: {
 *      st: // value for 'st'
 *   },
 * });
 */
export function useStationsLineListQuery(baseOptions: Apollo.QueryHookOptions<StationsLineListQuery, StationsLineListQueryVariables>) {
        return Apollo.useQuery<StationsLineListQuery, StationsLineListQueryVariables>(StationsLineListDocument, baseOptions);
      }
export function useStationsLineListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationsLineListQuery, StationsLineListQueryVariables>) {
          return Apollo.useLazyQuery<StationsLineListQuery, StationsLineListQueryVariables>(StationsLineListDocument, baseOptions);
        }
export type StationsLineListQueryHookResult = ReturnType<typeof useStationsLineListQuery>;
export type StationsLineListLazyQueryHookResult = ReturnType<typeof useStationsLineListLazyQuery>;
export type StationsLineListQueryResult = Apollo.QueryResult<StationsLineListQuery, StationsLineListQueryVariables>;
export const TownListDocument = gql`
    query TownList($ct: String, $md: String, $eab: Int, $eat: Int, $prb: Int, $prt: Int, $tht: Int, $ckt: Int, $utb: Int, $gfb: Int, $gft: Int) {
  cities(ct: $ct) {
    name
    towns {
      id
      name
      mansionCount(
        md: $md
        eab: $eab
        eat: $eat
        prb: $prb
        prt: $prt
        tht: $tht
        ckt: $ckt
        utb: $utb
        gfb: $gfb
        gft: $gft
      )
    }
  }
}
    `;

/**
 * __useTownListQuery__
 *
 * To run a query within a React component, call `useTownListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTownListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTownListQuery({
 *   variables: {
 *      ct: // value for 'ct'
 *      md: // value for 'md'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      tht: // value for 'tht'
 *      ckt: // value for 'ckt'
 *      utb: // value for 'utb'
 *      gfb: // value for 'gfb'
 *      gft: // value for 'gft'
 *   },
 * });
 */
export function useTownListQuery(baseOptions?: Apollo.QueryHookOptions<TownListQuery, TownListQueryVariables>) {
        return Apollo.useQuery<TownListQuery, TownListQueryVariables>(TownListDocument, baseOptions);
      }
export function useTownListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TownListQuery, TownListQueryVariables>) {
          return Apollo.useLazyQuery<TownListQuery, TownListQueryVariables>(TownListDocument, baseOptions);
        }
export type TownListQueryHookResult = ReturnType<typeof useTownListQuery>;
export type TownListLazyQueryHookResult = ReturnType<typeof useTownListLazyQuery>;
export type TownListQueryResult = Apollo.QueryResult<TownListQuery, TownListQueryVariables>;
export const TownsCityListDocument = gql`
    query TownsCityList($tw: String) {
  towns(tw: $tw) {
    city {
      jisCode
    }
  }
}
    `;

/**
 * __useTownsCityListQuery__
 *
 * To run a query within a React component, call `useTownsCityListQuery` and pass it any options that fit your needs.
 * When your component renders, `useTownsCityListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTownsCityListQuery({
 *   variables: {
 *      tw: // value for 'tw'
 *   },
 * });
 */
export function useTownsCityListQuery(baseOptions?: Apollo.QueryHookOptions<TownsCityListQuery, TownsCityListQueryVariables>) {
        return Apollo.useQuery<TownsCityListQuery, TownsCityListQueryVariables>(TownsCityListDocument, baseOptions);
      }
export function useTownsCityListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TownsCityListQuery, TownsCityListQueryVariables>) {
          return Apollo.useLazyQuery<TownsCityListQuery, TownsCityListQueryVariables>(TownsCityListDocument, baseOptions);
        }
export type TownsCityListQueryHookResult = ReturnType<typeof useTownsCityListQuery>;
export type TownsCityListLazyQueryHookResult = ReturnType<typeof useTownsCityListLazyQuery>;
export type TownsCityListQueryResult = Apollo.QueryResult<TownsCityListQuery, TownsCityListQueryVariables>;
export const FreeWordDocument = gql`
    query FreeWord($word: String!, $limit: Int) {
  freeWord(word: $word, limit: $limit) {
    value
  }
}
    `;

/**
 * __useFreeWordQuery__
 *
 * To run a query within a React component, call `useFreeWordQuery` and pass it any options that fit your needs.
 * When your component renders, `useFreeWordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFreeWordQuery({
 *   variables: {
 *      word: // value for 'word'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFreeWordQuery(baseOptions: Apollo.QueryHookOptions<FreeWordQuery, FreeWordQueryVariables>) {
        return Apollo.useQuery<FreeWordQuery, FreeWordQueryVariables>(FreeWordDocument, baseOptions);
      }
export function useFreeWordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FreeWordQuery, FreeWordQueryVariables>) {
          return Apollo.useLazyQuery<FreeWordQuery, FreeWordQueryVariables>(FreeWordDocument, baseOptions);
        }
export type FreeWordQueryHookResult = ReturnType<typeof useFreeWordQuery>;
export type FreeWordLazyQueryHookResult = ReturnType<typeof useFreeWordLazyQuery>;
export type FreeWordQueryResult = Apollo.QueryResult<FreeWordQuery, FreeWordQueryVariables>;
export const FindFromLinesDocument = gql`
    query FindFromLines($jisCode: String!) {
  prefecture(jisCode: $jisCode) {
    companies {
      name
      lines {
        id
        name
        mansionCount
        stations {
          id
          name
          mansionCount
        }
      }
    }
  }
}
    `;

/**
 * __useFindFromLinesQuery__
 *
 * To run a query within a React component, call `useFindFromLinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFromLinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFromLinesQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *   },
 * });
 */
export function useFindFromLinesQuery(baseOptions: Apollo.QueryHookOptions<FindFromLinesQuery, FindFromLinesQueryVariables>) {
        return Apollo.useQuery<FindFromLinesQuery, FindFromLinesQueryVariables>(FindFromLinesDocument, baseOptions);
      }
export function useFindFromLinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFromLinesQuery, FindFromLinesQueryVariables>) {
          return Apollo.useLazyQuery<FindFromLinesQuery, FindFromLinesQueryVariables>(FindFromLinesDocument, baseOptions);
        }
export type FindFromLinesQueryHookResult = ReturnType<typeof useFindFromLinesQuery>;
export type FindFromLinesLazyQueryHookResult = ReturnType<typeof useFindFromLinesLazyQuery>;
export type FindFromLinesQueryResult = Apollo.QueryResult<FindFromLinesQuery, FindFromLinesQueryVariables>;
export const FindFromShoolsDocument = gql`
    query FindFromShools($jisCode: String!) {
  prefecture(jisCode: $jisCode) {
    cities {
      id
      name
      primarySchools {
        schoolId
        name
        mansionCount
      }
    }
  }
}
    `;

/**
 * __useFindFromShoolsQuery__
 *
 * To run a query within a React component, call `useFindFromShoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFromShoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFromShoolsQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *   },
 * });
 */
export function useFindFromShoolsQuery(baseOptions: Apollo.QueryHookOptions<FindFromShoolsQuery, FindFromShoolsQueryVariables>) {
        return Apollo.useQuery<FindFromShoolsQuery, FindFromShoolsQueryVariables>(FindFromShoolsDocument, baseOptions);
      }
export function useFindFromShoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFromShoolsQuery, FindFromShoolsQueryVariables>) {
          return Apollo.useLazyQuery<FindFromShoolsQuery, FindFromShoolsQueryVariables>(FindFromShoolsDocument, baseOptions);
        }
export type FindFromShoolsQueryHookResult = ReturnType<typeof useFindFromShoolsQuery>;
export type FindFromShoolsLazyQueryHookResult = ReturnType<typeof useFindFromShoolsLazyQuery>;
export type FindFromShoolsQueryResult = Apollo.QueryResult<FindFromShoolsQuery, FindFromShoolsQueryVariables>;
export const BrandsDocument = gql`
    query brands($brd: String) {
  brands(brd: $brd) {
    id
    name
    mansionCount
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
  }
}
    ${MsLibraryMiniRankingMansionsFragmentDoc}`;

/**
 * __useBrandsQuery__
 *
 * To run a query within a React component, call `useBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandsQuery({
 *   variables: {
 *      brd: // value for 'brd'
 *   },
 * });
 */
export function useBrandsQuery(baseOptions?: Apollo.QueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
        return Apollo.useQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, baseOptions);
      }
export function useBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandsQuery, BrandsQueryVariables>) {
          return Apollo.useLazyQuery<BrandsQuery, BrandsQueryVariables>(BrandsDocument, baseOptions);
        }
export type BrandsQueryHookResult = ReturnType<typeof useBrandsQuery>;
export type BrandsLazyQueryHookResult = ReturnType<typeof useBrandsLazyQuery>;
export type BrandsQueryResult = Apollo.QueryResult<BrandsQuery, BrandsQueryVariables>;
export const CitiesDocument = gql`
    query cities($ct: String!) {
  cities(ct: $ct) {
    jisCode
    name
    mansionCount
    prefecture {
      name
      jisCode
    }
    ...MsLibraryCitiesCityInfo
    ...MsLibraryCitiesIndexedTowns
    ...MsLibraryCitiesMarketPrice
    ...MsLibraryCitiesCityInfoAuto
    ...MsLibraryCitiesCityInfoWriting
    ...MsLibraryCitiesOtherCities
    ...MsLibraryCityIncludedStations
    ...MsLibraryCityNeighborCities
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
  }
}
    ${MsLibraryCitiesCityInfoFragmentDoc}
${MsLibraryCitiesIndexedTownsFragmentDoc}
${MsLibraryCitiesMarketPriceFragmentDoc}
${MsLibraryCitiesCityInfoAutoFragmentDoc}
${MsLibraryCitiesCityInfoWritingFragmentDoc}
${MsLibraryCitiesOtherCitiesFragmentDoc}
${MsLibraryCityIncludedStationsFragmentDoc}
${MsLibraryCityNeighborCitiesFragmentDoc}
${MsLibraryMiniRankingMansionsFragmentDoc}`;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      ct: // value for 'ct'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, baseOptions);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, baseOptions);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const CommuteStationsDocument = gql`
    query commuteStations($st: String!, $mnt: Int, $trt: Int, $apb: Int, $apt: Int, $orap: String, $ortt: String, $ormn: String, $limit: Int) {
  station(st: $st) {
    id
    name
    sameStations {
      line {
        id
        name
      }
    }
    stationToStations(
      mnt: $mnt
      trt: $trt
      apb: $apb
      apt: $apt
      orap: $orap
      ortt: $ortt
      ormn: $ormn
      limit: $limit
    ) {
      ...MsLibraryRailwayStationToStationItem
    }
    topPriorityStation {
      id
    }
  }
}
    ${MsLibraryRailwayStationToStationItemFragmentDoc}`;

/**
 * __useCommuteStationsQuery__
 *
 * To run a query within a React component, call `useCommuteStationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommuteStationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommuteStationsQuery({
 *   variables: {
 *      st: // value for 'st'
 *      mnt: // value for 'mnt'
 *      trt: // value for 'trt'
 *      apb: // value for 'apb'
 *      apt: // value for 'apt'
 *      orap: // value for 'orap'
 *      ortt: // value for 'ortt'
 *      ormn: // value for 'ormn'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCommuteStationsQuery(baseOptions: Apollo.QueryHookOptions<CommuteStationsQuery, CommuteStationsQueryVariables>) {
        return Apollo.useQuery<CommuteStationsQuery, CommuteStationsQueryVariables>(CommuteStationsDocument, baseOptions);
      }
export function useCommuteStationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommuteStationsQuery, CommuteStationsQueryVariables>) {
          return Apollo.useLazyQuery<CommuteStationsQuery, CommuteStationsQueryVariables>(CommuteStationsDocument, baseOptions);
        }
export type CommuteStationsQueryHookResult = ReturnType<typeof useCommuteStationsQuery>;
export type CommuteStationsLazyQueryHookResult = ReturnType<typeof useCommuteStationsLazyQuery>;
export type CommuteStationsQueryResult = Apollo.QueryResult<CommuteStationsQuery, CommuteStationsQueryVariables>;
export const IndexDocument = gql`
    query Index {
  prefectures {
    ...MsLibraryIndexPrefecture
    ...MsLibraryIndexIeulColumn
  }
}
    ${MsLibraryIndexPrefectureFragmentDoc}
${MsLibraryIndexIeulColumnFragmentDoc}`;

/**
 * __useIndexQuery__
 *
 * To run a query within a React component, call `useIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexQuery(baseOptions?: Apollo.QueryHookOptions<IndexQuery, IndexQueryVariables>) {
        return Apollo.useQuery<IndexQuery, IndexQueryVariables>(IndexDocument, baseOptions);
      }
export function useIndexLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IndexQuery, IndexQueryVariables>) {
          return Apollo.useLazyQuery<IndexQuery, IndexQueryVariables>(IndexDocument, baseOptions);
        }
export type IndexQueryHookResult = ReturnType<typeof useIndexQuery>;
export type IndexLazyQueryHookResult = ReturnType<typeof useIndexLazyQuery>;
export type IndexQueryResult = Apollo.QueryResult<IndexQuery, IndexQueryVariables>;
export const LinesDocument = gql`
    query lines($ln: String!, $tw: String, $md: String, $eab: Int, $eat: Int, $prb: Int, $prt: Int, $tht: Int, $ckt: Int, $utb: Int, $gfb: Int, $gft: Int) {
  lines(ln: $ln) {
    id
    name
    company {
      name
    }
    ...MsLibraryLinesMarketPrice
    ...MsLibraryRailwayLinePassedCities
    stations {
      name
      id
      city {
        name
        jisCode
        prefecture {
          name
          jisCode
        }
      }
      mansionCount(
        ln: $ln
        tw: $tw
        md: $md
        eab: $eab
        eat: $eat
        prb: $prb
        prt: $prt
        tht: $tht
        ckt: $ckt
        utb: $utb
        gfb: $gfb
        gft: $gft
      )
    }
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
    ...LineWriting
  }
}
    ${MsLibraryLinesMarketPriceFragmentDoc}
${MsLibraryRailwayLinePassedCitiesFragmentDoc}
${MsLibraryMiniRankingMansionsFragmentDoc}
${LineWritingFragmentDoc}`;

/**
 * __useLinesQuery__
 *
 * To run a query within a React component, call `useLinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLinesQuery({
 *   variables: {
 *      ln: // value for 'ln'
 *      tw: // value for 'tw'
 *      md: // value for 'md'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      tht: // value for 'tht'
 *      ckt: // value for 'ckt'
 *      utb: // value for 'utb'
 *      gfb: // value for 'gfb'
 *      gft: // value for 'gft'
 *   },
 * });
 */
export function useLinesQuery(baseOptions: Apollo.QueryHookOptions<LinesQuery, LinesQueryVariables>) {
        return Apollo.useQuery<LinesQuery, LinesQueryVariables>(LinesDocument, baseOptions);
      }
export function useLinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinesQuery, LinesQueryVariables>) {
          return Apollo.useLazyQuery<LinesQuery, LinesQueryVariables>(LinesDocument, baseOptions);
        }
export type LinesQueryHookResult = ReturnType<typeof useLinesQuery>;
export type LinesLazyQueryHookResult = ReturnType<typeof useLinesLazyQuery>;
export type LinesQueryResult = Apollo.QueryResult<LinesQuery, LinesQueryVariables>;
export const MansionDocument = gql`
    query Mansion($uniqueCode: ID!, $historyCursor: String) {
  mansion(uniqueCode: $uniqueCode) {
    ...MsLibraryMansionsBaseInfo
    ...MsLibraryMansionsDetails
    ...MsLibraryMansionsSalesHistories @arguments(historyCursor: $historyCursor)
    ...MsLibraryMansionsSalesSummary
    ...MsLibraryMansionsSeismicSafety
    ...MsLibraryMansionsSimilarMansions
    ...MsLibraryMansionsUnitSize
    ...MsLibraryMansionsSalesCTA
    ...MsLibraryMansionsProductJsonLd
    ...MsLibraryMansionsMarketPrice
    ...MsLibraryMansionsMansionHistory
    ...MsLibraryMansionsCitySummary
    pageView
    primarySchool {
      ...SchoolReviewsData
    }
    city {
      ...MsLibraryCitiesCityInfo
    }
  }
}
    ${MsLibraryMansionsBaseInfoFragmentDoc}
${MsLibraryMansionsDetailsFragmentDoc}
${MsLibraryMansionsSalesHistoriesFragmentDoc}
${MsLibraryMansionsSalesSummaryFragmentDoc}
${MsLibraryMansionsSeismicSafetyFragmentDoc}
${MsLibraryMansionsSimilarMansionsFragmentDoc}
${MsLibraryMansionsUnitSizeFragmentDoc}
${MsLibraryMansionsSalesCtaFragmentDoc}
${MsLibraryMansionsProductJsonLdFragmentDoc}
${MsLibraryMansionsMarketPriceFragmentDoc}
${MsLibraryMansionsMansionHistoryFragmentDoc}
${MsLibraryMansionsCitySummaryFragmentDoc}
${SchoolReviewsDataFragmentDoc}
${MsLibraryCitiesCityInfoFragmentDoc}`;

/**
 * __useMansionQuery__
 *
 * To run a query within a React component, call `useMansionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMansionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMansionQuery({
 *   variables: {
 *      uniqueCode: // value for 'uniqueCode'
 *      historyCursor: // value for 'historyCursor'
 *   },
 * });
 */
export function useMansionQuery(baseOptions: Apollo.QueryHookOptions<MansionQuery, MansionQueryVariables>) {
        return Apollo.useQuery<MansionQuery, MansionQueryVariables>(MansionDocument, baseOptions);
      }
export function useMansionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MansionQuery, MansionQueryVariables>) {
          return Apollo.useLazyQuery<MansionQuery, MansionQueryVariables>(MansionDocument, baseOptions);
        }
export type MansionQueryHookResult = ReturnType<typeof useMansionQuery>;
export type MansionLazyQueryHookResult = ReturnType<typeof useMansionLazyQuery>;
export type MansionQueryResult = Apollo.QueryResult<MansionQuery, MansionQueryVariables>;
export const PrefectureDocument = gql`
    query Prefecture($jisCode: String!, $md: String, $eab: Int, $eat: Int, $prb: Int, $prt: Int, $tht: Int, $ckt: Int, $utb: Int, $gfb: Int, $gft: Int) {
  prefecture(jisCode: $jisCode) {
    name
    mansionCount
    ...MsLibraryPrefecturesCities
    ...MsLibraryPrefecturesLines @arguments(md: $md, eab: $eab, eat: $eat, prb: $prb, prt: $prt, tht: $tht, ckt: $ckt, utb: $utb, gfb: $gfb, gft: $gft)
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
  }
}
    ${MsLibraryPrefecturesCitiesFragmentDoc}
${MsLibraryPrefecturesLinesFragmentDoc}
${MsLibraryMiniRankingMansionsFragmentDoc}`;

/**
 * __usePrefectureQuery__
 *
 * To run a query within a React component, call `usePrefectureQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrefectureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrefectureQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *      md: // value for 'md'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      tht: // value for 'tht'
 *      ckt: // value for 'ckt'
 *      utb: // value for 'utb'
 *      gfb: // value for 'gfb'
 *      gft: // value for 'gft'
 *   },
 * });
 */
export function usePrefectureQuery(baseOptions: Apollo.QueryHookOptions<PrefectureQuery, PrefectureQueryVariables>) {
        return Apollo.useQuery<PrefectureQuery, PrefectureQueryVariables>(PrefectureDocument, baseOptions);
      }
export function usePrefectureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrefectureQuery, PrefectureQueryVariables>) {
          return Apollo.useLazyQuery<PrefectureQuery, PrefectureQueryVariables>(PrefectureDocument, baseOptions);
        }
export type PrefectureQueryHookResult = ReturnType<typeof usePrefectureQuery>;
export type PrefectureLazyQueryHookResult = ReturnType<typeof usePrefectureLazyQuery>;
export type PrefectureQueryResult = Apollo.QueryResult<PrefectureQuery, PrefectureQueryVariables>;
export const BrandRankingsPageDocument = gql`
    query BrandRankingsPage($brd: String, $limit: Int, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  brands(brd: $brd) {
    id
    name
    mansionCount
    rankingMansions(limit: $limit) {
      ...MansionCardData
    }
  }
}
    ${MansionCardDataFragmentDoc}`;

/**
 * __useBrandRankingsPageQuery__
 *
 * To run a query within a React component, call `useBrandRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandRankingsPageQuery({
 *   variables: {
 *      brd: // value for 'brd'
 *      limit: // value for 'limit'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function useBrandRankingsPageQuery(baseOptions?: Apollo.QueryHookOptions<BrandRankingsPageQuery, BrandRankingsPageQueryVariables>) {
        return Apollo.useQuery<BrandRankingsPageQuery, BrandRankingsPageQueryVariables>(BrandRankingsPageDocument, baseOptions);
      }
export function useBrandRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandRankingsPageQuery, BrandRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<BrandRankingsPageQuery, BrandRankingsPageQueryVariables>(BrandRankingsPageDocument, baseOptions);
        }
export type BrandRankingsPageQueryHookResult = ReturnType<typeof useBrandRankingsPageQuery>;
export type BrandRankingsPageLazyQueryHookResult = ReturnType<typeof useBrandRankingsPageLazyQuery>;
export type BrandRankingsPageQueryResult = Apollo.QueryResult<BrandRankingsPageQuery, BrandRankingsPageQueryVariables>;
export const CityRankingsPageDocument = gql`
    query CityRankingsPage($jisCode: String!, $limit: Int, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  city(jisCode: $jisCode) {
    jisCode
    name
    prefecture {
      ...AreaRankingLinksData
    }
    rankingMansions(limit: $limit) {
      ...MansionCardData
    }
    ...RankingCityInfo
  }
}
    ${AreaRankingLinksDataFragmentDoc}
${MansionCardDataFragmentDoc}
${RankingCityInfoFragmentDoc}`;

/**
 * __useCityRankingsPageQuery__
 *
 * To run a query within a React component, call `useCityRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityRankingsPageQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *      limit: // value for 'limit'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function useCityRankingsPageQuery(baseOptions: Apollo.QueryHookOptions<CityRankingsPageQuery, CityRankingsPageQueryVariables>) {
        return Apollo.useQuery<CityRankingsPageQuery, CityRankingsPageQueryVariables>(CityRankingsPageDocument, baseOptions);
      }
export function useCityRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CityRankingsPageQuery, CityRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<CityRankingsPageQuery, CityRankingsPageQueryVariables>(CityRankingsPageDocument, baseOptions);
        }
export type CityRankingsPageQueryHookResult = ReturnType<typeof useCityRankingsPageQuery>;
export type CityRankingsPageLazyQueryHookResult = ReturnType<typeof useCityRankingsPageLazyQuery>;
export type CityRankingsPageQueryResult = Apollo.QueryResult<CityRankingsPageQuery, CityRankingsPageQueryVariables>;
export const LineRankingsPageDocument = gql`
    query LineRankingsPage($ln: String!, $limit: Int, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  line(ln: $ln) {
    id
    name
    rankingMansions(limit: $limit) {
      ...MansionCardData
    }
  }
}
    ${MansionCardDataFragmentDoc}`;

/**
 * __useLineRankingsPageQuery__
 *
 * To run a query within a React component, call `useLineRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useLineRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLineRankingsPageQuery({
 *   variables: {
 *      ln: // value for 'ln'
 *      limit: // value for 'limit'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function useLineRankingsPageQuery(baseOptions: Apollo.QueryHookOptions<LineRankingsPageQuery, LineRankingsPageQueryVariables>) {
        return Apollo.useQuery<LineRankingsPageQuery, LineRankingsPageQueryVariables>(LineRankingsPageDocument, baseOptions);
      }
export function useLineRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LineRankingsPageQuery, LineRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<LineRankingsPageQuery, LineRankingsPageQueryVariables>(LineRankingsPageDocument, baseOptions);
        }
export type LineRankingsPageQueryHookResult = ReturnType<typeof useLineRankingsPageQuery>;
export type LineRankingsPageLazyQueryHookResult = ReturnType<typeof useLineRankingsPageLazyQuery>;
export type LineRankingsPageQueryResult = Apollo.QueryResult<LineRankingsPageQuery, LineRankingsPageQueryVariables>;
export const PrefectureRankingsPageDocument = gql`
    query PrefectureRankingsPage($jisCode: String!, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  prefecture(jisCode: $jisCode) {
    name
    ...AreaRankingLinksData
    rankingMansions {
      ...MansionCardData
    }
  }
}
    ${AreaRankingLinksDataFragmentDoc}
${MansionCardDataFragmentDoc}`;

/**
 * __usePrefectureRankingsPageQuery__
 *
 * To run a query within a React component, call `usePrefectureRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrefectureRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrefectureRankingsPageQuery({
 *   variables: {
 *      jisCode: // value for 'jisCode'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function usePrefectureRankingsPageQuery(baseOptions: Apollo.QueryHookOptions<PrefectureRankingsPageQuery, PrefectureRankingsPageQueryVariables>) {
        return Apollo.useQuery<PrefectureRankingsPageQuery, PrefectureRankingsPageQueryVariables>(PrefectureRankingsPageDocument, baseOptions);
      }
export function usePrefectureRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrefectureRankingsPageQuery, PrefectureRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<PrefectureRankingsPageQuery, PrefectureRankingsPageQueryVariables>(PrefectureRankingsPageDocument, baseOptions);
        }
export type PrefectureRankingsPageQueryHookResult = ReturnType<typeof usePrefectureRankingsPageQuery>;
export type PrefectureRankingsPageLazyQueryHookResult = ReturnType<typeof usePrefectureRankingsPageLazyQuery>;
export type PrefectureRankingsPageQueryResult = Apollo.QueryResult<PrefectureRankingsPageQuery, PrefectureRankingsPageQueryVariables>;
export const SchoolRankingsPageDocument = gql`
    query SchoolRankingsPage($psc: String!, $limit: Int, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  primarySchools(psc: $psc) {
    schoolId
    name
    city {
      prefecture {
        ...AreaRankingLinksData
      }
      ...RankingCityInfo
    }
    rankingMansions(limit: $limit) {
      ...MansionCardData
    }
  }
}
    ${AreaRankingLinksDataFragmentDoc}
${RankingCityInfoFragmentDoc}
${MansionCardDataFragmentDoc}`;

/**
 * __useSchoolRankingsPageQuery__
 *
 * To run a query within a React component, call `useSchoolRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolRankingsPageQuery({
 *   variables: {
 *      psc: // value for 'psc'
 *      limit: // value for 'limit'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function useSchoolRankingsPageQuery(baseOptions: Apollo.QueryHookOptions<SchoolRankingsPageQuery, SchoolRankingsPageQueryVariables>) {
        return Apollo.useQuery<SchoolRankingsPageQuery, SchoolRankingsPageQueryVariables>(SchoolRankingsPageDocument, baseOptions);
      }
export function useSchoolRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchoolRankingsPageQuery, SchoolRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<SchoolRankingsPageQuery, SchoolRankingsPageQueryVariables>(SchoolRankingsPageDocument, baseOptions);
        }
export type SchoolRankingsPageQueryHookResult = ReturnType<typeof useSchoolRankingsPageQuery>;
export type SchoolRankingsPageLazyQueryHookResult = ReturnType<typeof useSchoolRankingsPageLazyQuery>;
export type SchoolRankingsPageQueryResult = Apollo.QueryResult<SchoolRankingsPageQuery, SchoolRankingsPageQueryVariables>;
export const StationRankingsPageDocument = gql`
    query StationRankingsPage($st: String!, $limit: Int, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  station(st: $st) {
    id
    name
    city {
      name
      jisCode
      prefecture {
        ...AreaRankingLinksData
      }
      ...RankingCityInfo
    }
    rankingMansions(limit: $limit) {
      ...MansionCardData
    }
  }
}
    ${AreaRankingLinksDataFragmentDoc}
${RankingCityInfoFragmentDoc}
${MansionCardDataFragmentDoc}`;

/**
 * __useStationRankingsPageQuery__
 *
 * To run a query within a React component, call `useStationRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationRankingsPageQuery({
 *   variables: {
 *      st: // value for 'st'
 *      limit: // value for 'limit'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function useStationRankingsPageQuery(baseOptions: Apollo.QueryHookOptions<StationRankingsPageQuery, StationRankingsPageQueryVariables>) {
        return Apollo.useQuery<StationRankingsPageQuery, StationRankingsPageQueryVariables>(StationRankingsPageDocument, baseOptions);
      }
export function useStationRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationRankingsPageQuery, StationRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<StationRankingsPageQuery, StationRankingsPageQueryVariables>(StationRankingsPageDocument, baseOptions);
        }
export type StationRankingsPageQueryHookResult = ReturnType<typeof useStationRankingsPageQuery>;
export type StationRankingsPageLazyQueryHookResult = ReturnType<typeof useStationRankingsPageLazyQuery>;
export type StationRankingsPageQueryResult = Apollo.QueryResult<StationRankingsPageQuery, StationRankingsPageQueryVariables>;
export const TownRankingsPageDocument = gql`
    query TownRankingsPage($tw: String!, $limit: Int, $md: String = null, $prb: Int = null, $prt: Int = null, $eab: Int = null, $eat: Int = null) {
  prefectures {
    jisCode
    name
  }
  town(tw: $tw) {
    id
    name
    city {
      jisCode
      name
      prefecture {
        ...AreaRankingLinksData
      }
      ...RankingCityInfo
    }
    rankingMansions(limit: $limit) {
      ...MansionCardData
    }
  }
}
    ${AreaRankingLinksDataFragmentDoc}
${RankingCityInfoFragmentDoc}
${MansionCardDataFragmentDoc}`;

/**
 * __useTownRankingsPageQuery__
 *
 * To run a query within a React component, call `useTownRankingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTownRankingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTownRankingsPageQuery({
 *   variables: {
 *      tw: // value for 'tw'
 *      limit: // value for 'limit'
 *      md: // value for 'md'
 *      prb: // value for 'prb'
 *      prt: // value for 'prt'
 *      eab: // value for 'eab'
 *      eat: // value for 'eat'
 *   },
 * });
 */
export function useTownRankingsPageQuery(baseOptions: Apollo.QueryHookOptions<TownRankingsPageQuery, TownRankingsPageQueryVariables>) {
        return Apollo.useQuery<TownRankingsPageQuery, TownRankingsPageQueryVariables>(TownRankingsPageDocument, baseOptions);
      }
export function useTownRankingsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TownRankingsPageQuery, TownRankingsPageQueryVariables>) {
          return Apollo.useLazyQuery<TownRankingsPageQuery, TownRankingsPageQueryVariables>(TownRankingsPageDocument, baseOptions);
        }
export type TownRankingsPageQueryHookResult = ReturnType<typeof useTownRankingsPageQuery>;
export type TownRankingsPageLazyQueryHookResult = ReturnType<typeof useTownRankingsPageLazyQuery>;
export type TownRankingsPageQueryResult = Apollo.QueryResult<TownRankingsPageQuery, TownRankingsPageQueryVariables>;
export const PrimarySchoolsDocument = gql`
    query primarySchools($psc: String, $numberOfRooms: Int, $layoutKindId: ID) {
  primarySchools(psc: $psc) {
    schoolId
    name
    nameKana
    ...MsLibraryPrimarySchoolOtherSchools
    ...SchoolReviewsData
    ...SchoolInfoData
    city {
      prefecture {
        name
        jisCode
      }
    }
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
  }
}
    ${MsLibraryPrimarySchoolOtherSchoolsFragmentDoc}
${SchoolReviewsDataFragmentDoc}
${SchoolInfoDataFragmentDoc}
${MsLibraryMiniRankingMansionsFragmentDoc}`;

/**
 * __usePrimarySchoolsQuery__
 *
 * To run a query within a React component, call `usePrimarySchoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimarySchoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimarySchoolsQuery({
 *   variables: {
 *      psc: // value for 'psc'
 *      numberOfRooms: // value for 'numberOfRooms'
 *      layoutKindId: // value for 'layoutKindId'
 *   },
 * });
 */
export function usePrimarySchoolsQuery(baseOptions?: Apollo.QueryHookOptions<PrimarySchoolsQuery, PrimarySchoolsQueryVariables>) {
        return Apollo.useQuery<PrimarySchoolsQuery, PrimarySchoolsQueryVariables>(PrimarySchoolsDocument, baseOptions);
      }
export function usePrimarySchoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimarySchoolsQuery, PrimarySchoolsQueryVariables>) {
          return Apollo.useLazyQuery<PrimarySchoolsQuery, PrimarySchoolsQueryVariables>(PrimarySchoolsDocument, baseOptions);
        }
export type PrimarySchoolsQueryHookResult = ReturnType<typeof usePrimarySchoolsQuery>;
export type PrimarySchoolsLazyQueryHookResult = ReturnType<typeof usePrimarySchoolsLazyQuery>;
export type PrimarySchoolsQueryResult = Apollo.QueryResult<PrimarySchoolsQuery, PrimarySchoolsQueryVariables>;
export const StationsDocument = gql`
    query stations($st: String!) {
  stations(st: $st) {
    id
    name
    ...MsLibraryStationsMarketPrice
    ...MsLibraryRailwayStationNeighborStations
    line {
      id
      name
      stations {
        id
      }
    }
    city {
      jisCode
      name
      mansionCount
      ...MsLibraryCityIncludedStations
      prefecture {
        jisCode
        name
      }
    }
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
    commuteStations {
      ...StationInfo
    }
  }
}
    ${MsLibraryStationsMarketPriceFragmentDoc}
${MsLibraryRailwayStationNeighborStationsFragmentDoc}
${MsLibraryCityIncludedStationsFragmentDoc}
${MsLibraryMiniRankingMansionsFragmentDoc}
${StationInfoFragmentDoc}`;

/**
 * __useStationsQuery__
 *
 * To run a query within a React component, call `useStationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationsQuery({
 *   variables: {
 *      st: // value for 'st'
 *   },
 * });
 */
export function useStationsQuery(baseOptions: Apollo.QueryHookOptions<StationsQuery, StationsQueryVariables>) {
        return Apollo.useQuery<StationsQuery, StationsQueryVariables>(StationsDocument, baseOptions);
      }
export function useStationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationsQuery, StationsQueryVariables>) {
          return Apollo.useLazyQuery<StationsQuery, StationsQueryVariables>(StationsDocument, baseOptions);
        }
export type StationsQueryHookResult = ReturnType<typeof useStationsQuery>;
export type StationsLazyQueryHookResult = ReturnType<typeof useStationsLazyQuery>;
export type StationsQueryResult = Apollo.QueryResult<StationsQuery, StationsQueryVariables>;
export const TownsDocument = gql`
    query towns($tw: String!) {
  towns(tw: $tw) {
    id
    name
    ...MsLibraryTownsMarketPrice
    ...MsLibraryTownsInfoWriting
    ...MsLibraryTownsLinkedTowns
    ...MsLibraryTownsLinkedStations
    ...MsLibraryTownsLinkedBuildings
    ...MsLibraryTownsLinkedSearchConditions
    city {
      jisCode
      name
      ...MsLibraryCitiesCityInfo
      ...MsLibraryCitiesCityInfoAuto
      ...MsLibraryCitiesCityInfoWriting
      ...MsLibraryCitiesIndexedTowns
      ...MsLibraryCitiesOtherCities
      ...MsLibraryCitiesCityInfo
      ...MsLibraryCityIncludedStations
      ...MsLibraryCityNeighborCities
      prefecture {
        jisCode
        name
      }
    }
    rankingMansions {
      ...MsLibraryMiniRankingMansions
    }
  }
}
    ${MsLibraryTownsMarketPriceFragmentDoc}
${MsLibraryTownsInfoWritingFragmentDoc}
${MsLibraryTownsLinkedTownsFragmentDoc}
${MsLibraryTownsLinkedStationsFragmentDoc}
${MsLibraryTownsLinkedBuildingsFragmentDoc}
${MsLibraryTownsLinkedSearchConditionsFragmentDoc}
${MsLibraryCitiesCityInfoFragmentDoc}
${MsLibraryCitiesCityInfoAutoFragmentDoc}
${MsLibraryCitiesCityInfoWritingFragmentDoc}
${MsLibraryCitiesIndexedTownsFragmentDoc}
${MsLibraryCitiesOtherCitiesFragmentDoc}
${MsLibraryCityIncludedStationsFragmentDoc}
${MsLibraryCityNeighborCitiesFragmentDoc}
${MsLibraryMiniRankingMansionsFragmentDoc}`;

/**
 * __useTownsQuery__
 *
 * To run a query within a React component, call `useTownsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTownsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTownsQuery({
 *   variables: {
 *      tw: // value for 'tw'
 *   },
 * });
 */
export function useTownsQuery(baseOptions: Apollo.QueryHookOptions<TownsQuery, TownsQueryVariables>) {
        return Apollo.useQuery<TownsQuery, TownsQueryVariables>(TownsDocument, baseOptions);
      }
export function useTownsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TownsQuery, TownsQueryVariables>) {
          return Apollo.useLazyQuery<TownsQuery, TownsQueryVariables>(TownsDocument, baseOptions);
        }
export type TownsQueryHookResult = ReturnType<typeof useTownsQuery>;
export type TownsLazyQueryHookResult = ReturnType<typeof useTownsLazyQuery>;
export type TownsQueryResult = Apollo.QueryResult<TownsQuery, TownsQueryVariables>;