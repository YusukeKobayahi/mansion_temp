import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  QueryVariables,
  ModelQueryParameters,
  FilterQueryParameters,
  SortQueryParameters,
  PaginationQueryParameters,
  ReactSetStateDispatcher,
  ChangeType,
} from "~/lib/types";
import { QueryKeys } from "~/lib/property";
import capitalize from "lodash/capitalize";
import { splitOrEmpty, stringOrEmpty } from "~/lib/utils";

/**
 * ModelQueryConditionTypeの定義
 * wdとjisCode以外はstring[]にしたい
 */

type StringModelQueryConditionType = Required<
  Pick<ModelQueryParameters, "wd" | "jisCode">
>;
type StringArrayModelQueryConditionType = ChangeType<
  Required<Omit<ModelQueryParameters, "wd" | "jisCode">>,
  string[]
>;

// prettier-ignore
type ModelQueryConditionType = (
  & StringModelQueryConditionType 
  & StringArrayModelQueryConditionType 
  & ReactSetStateDispatcher<StringModelQueryConditionType> 
  & ReactSetStateDispatcher<StringArrayModelQueryConditionType>
);

/**
 * FilterQueryConditionTypeの定義
 * mdのみstring[]にしたい
 */
type StringFilterQueryConditionType = Required<
  Omit<FilterQueryParameters, "md">
>;
type StringArrayFilterQueryConditionType = ChangeType<
  Required<Pick<FilterQueryParameters, "md">>,
  string[]
>;
// prettier-ignore
type FilterQueryConditionType = (
  & StringFilterQueryConditionType 
  & StringArrayFilterQueryConditionType 
  & ReactSetStateDispatcher<StringFilterQueryConditionType> 
  & ReactSetStateDispatcher<StringArrayFilterQueryConditionType>
);

/**
 * SortQueryConditionTypeの作成
 * 特別な処理はない
 */
// prettier-ignore
type SortQueryConditionType = (
  & Required<SortQueryParameters>
  & ReactSetStateDispatcher<Required<SortQueryParameters>> 
)

/**
 * PaginationQueryConditionTypeの作成
 * 特別な処理はない
 */
// prettier-ignore
type PaginationQueryConditionType = (
  & Required<PaginationQueryParameters> 
  & ReactSetStateDispatcher<Required<PaginationQueryParameters>>
)

/**
 * 上記の型をまとめて定義する。
 * 将来的にFilter,Modelなどと型を分けているようにProviderも分ける可能性あり。
 */
// prettier-ignore
type SearchConditionContextProps = (
  & ModelQueryConditionType 
  & FilterQueryConditionType 
  & SortQueryConditionType
  & PaginationQueryConditionType
)

export const SearchConditionContext = createContext(
  {} as SearchConditionContextProps
);

type ToggleContextPropviderProps = {
  children?: ReactNode;
  searchCondition: QueryVariables;
};

const SearchConditionContextProvider: React.FC<ToggleContextPropviderProps> = ({
  children,
  searchCondition,
}: ToggleContextPropviderProps) => {
  /**
   * Stateの作成
   * type.tsでQueryを追加した場合はstateの追加が必要になる。
   * さらに下のuseEffectの追加, valueの追加も同様。
   */
  const [pf, setPf] = useState<string[]>(splitOrEmpty(searchCondition.pf));
  const [jisCode, setJisCode] = useState<string>(
    stringOrEmpty(searchCondition.jisCode)
  );
  const [ct, setCt] = useState<string[]>(splitOrEmpty(searchCondition.ct));
  const [tw, setTw] = useState<string[]>(splitOrEmpty(searchCondition.tw));
  const [st, setSt] = useState<string[]>(splitOrEmpty(searchCondition.st));
  const [ln, setLn] = useState<string[]>(splitOrEmpty(searchCondition.ln));
  const [psc, setPsc] = useState<string[]>(splitOrEmpty(searchCondition.psc));
  const [wd, setWd] = useState<string>(stringOrEmpty(searchCondition.wd));
  const [brd, setBrd] = useState<string[]>(splitOrEmpty(searchCondition.brd));
  const [orud, setOrud] = useState<string>(stringOrEmpty(searchCondition.orud));
  const [orpr, setOrpr] = useState<string>(stringOrEmpty(searchCondition.orpr));
  const [orar, setOrar] = useState<string>(stringOrEmpty(searchCondition.orar));
  const [orck, setOrck] = useState<string>(stringOrEmpty(searchCondition.orck));
  const [ormd, setOrmd] = useState<string>(stringOrEmpty(searchCondition.ormd));
  const [orap, setOrap] = useState<string>(stringOrEmpty(searchCondition.orap));
  const [ortt, setOrtt] = useState<string>(stringOrEmpty(searchCondition.ortt));
  const [ormn, setOrmn] = useState<string>(stringOrEmpty(searchCondition.ormn));
  const [md, setMd] = useState<string[]>(splitOrEmpty(searchCondition.md));
  const [thb, setThb] = useState<string>(stringOrEmpty(searchCondition.thb));
  const [tht, setTht] = useState<string>(stringOrEmpty(searchCondition.tht));
  const [ckt, setCkt] = useState<string>(stringOrEmpty(searchCondition.ckt));
  const [utb, setUtb] = useState<string>(stringOrEmpty(searchCondition.utb));
  const [eab, setEab] = useState<string>(stringOrEmpty(searchCondition.eab));
  const [eat, setEat] = useState<string>(stringOrEmpty(searchCondition.eat));
  const [prb, setPrb] = useState<string>(stringOrEmpty(searchCondition.prb));
  const [prt, setPrt] = useState<string>(stringOrEmpty(searchCondition.prt));
  const [gfb, setGfb] = useState<string>(stringOrEmpty(searchCondition.gfb));
  const [gft, setGft] = useState<string>(stringOrEmpty(searchCondition.gft));
  const [mnt, setMnt] = useState<string>(stringOrEmpty(searchCondition.mnt));
  const [trt, setTrt] = useState<string>(stringOrEmpty(searchCondition.trt));
  const [apb, setApb] = useState<string>(stringOrEmpty(searchCondition.apb));
  const [apt, setApt] = useState<string>(stringOrEmpty(searchCondition.apt));
  const [page, setPage] = useState<string>(stringOrEmpty(searchCondition.page));
  const [per, setPer] = useState<string>(stringOrEmpty(searchCondition.per));
  const [limit, setLimit] = useState<string>(
    stringOrEmpty(searchCondition.limit)
  );

  /**
   * Queryが変更された時の自動更新。違う見方をすると初期化
   * 主にページ遷移などの際にurlをもとに渡されるQueryが変わった際に再レンダリングを促すきっかけになる。
   * 自動アップデートは副作用にもなりうるため、将来的にこの自動アップデートを必要とするかどうかのオプションをつけるかもしれない。
   */
  useEffect(() => setPf(splitOrEmpty(searchCondition.pf)), [
    searchCondition.pf,
  ]);
  useEffect(() => setCt(splitOrEmpty(searchCondition.ct)), [
    searchCondition.ct,
  ]);
  useEffect(() => setTw(splitOrEmpty(searchCondition.tw)), [
    searchCondition.tw,
  ]);
  useEffect(() => setSt(splitOrEmpty(searchCondition.st)), [
    searchCondition.st,
  ]);
  useEffect(() => setLn(splitOrEmpty(searchCondition.ln)), [
    searchCondition.ln,
  ]);
  useEffect(() => setPsc(splitOrEmpty(searchCondition.psc)), [
    searchCondition.psc,
  ]);
  useEffect(() => setWd(stringOrEmpty(searchCondition.wd)), [
    searchCondition.wd,
  ]);
  useEffect(() => setBrd(splitOrEmpty(searchCondition.brd)), [
    searchCondition.brd,
  ]);
  useEffect(() => setOrud(stringOrEmpty(searchCondition.orud)), [
    searchCondition.orud,
  ]);
  useEffect(() => setOrpr(stringOrEmpty(searchCondition.orpr)), [
    searchCondition.orpr,
  ]);
  useEffect(() => setOrar(stringOrEmpty(searchCondition.orar)), [
    searchCondition.orar,
  ]);
  useEffect(() => setOrck(stringOrEmpty(searchCondition.orck)), [
    searchCondition.orck,
  ]);
  useEffect(() => setOrmd(stringOrEmpty(searchCondition.ormd)), [
    searchCondition.ormd,
  ]);
  useEffect(() => setOrap(stringOrEmpty(searchCondition.orap)), [
    searchCondition.orap,
  ]);
  useEffect(() => setOrtt(stringOrEmpty(searchCondition.ortt)), [
    searchCondition.ortt,
  ]);
  useEffect(() => setOrmn(stringOrEmpty(searchCondition.ormn)), [
    searchCondition.ormn,
  ]);
  useEffect(() => setMd(splitOrEmpty(searchCondition.md)), [
    searchCondition.md,
  ]);
  useEffect(() => setThb(stringOrEmpty(searchCondition.thb)), [
    searchCondition.thb,
  ]);
  useEffect(() => setTht(stringOrEmpty(searchCondition.tht)), [
    searchCondition.tht,
  ]);
  useEffect(() => setCkt(stringOrEmpty(searchCondition.ckt)), [
    searchCondition.ckt,
  ]);
  useEffect(() => setUtb(stringOrEmpty(searchCondition.utb)), [
    searchCondition.utb,
  ]);
  useEffect(() => setEab(stringOrEmpty(searchCondition.eab)), [
    searchCondition.eab,
  ]);
  useEffect(() => setEat(stringOrEmpty(searchCondition.eat)), [
    searchCondition.eat,
  ]);
  useEffect(() => setPrb(stringOrEmpty(searchCondition.prb)), [
    searchCondition.prb,
  ]);
  useEffect(() => setPrt(stringOrEmpty(searchCondition.prt)), [
    searchCondition.prt,
  ]);
  useEffect(() => setGfb(stringOrEmpty(searchCondition.gfb)), [
    searchCondition.gfb,
  ]);
  useEffect(() => setGft(stringOrEmpty(searchCondition.gft)), [
    searchCondition.gft,
  ]);
  useEffect(() => setMnt(stringOrEmpty(searchCondition.mnt)), [
    searchCondition.mnt,
  ]);
  useEffect(() => setTrt(stringOrEmpty(searchCondition.trt)), [
    searchCondition.trt,
  ]);
  useEffect(() => setApb(stringOrEmpty(searchCondition.apb)), [
    searchCondition.apb,
  ]);
  useEffect(() => setApt(stringOrEmpty(searchCondition.apt)), [
    searchCondition.apt,
  ]);
  useEffect(() => setPage(stringOrEmpty(searchCondition.page)), [
    searchCondition.page,
  ]);
  useEffect(() => setPer(stringOrEmpty(searchCondition.per)), [
    searchCondition.per,
  ]);
  useEffect(() => setLimit(stringOrEmpty(searchCondition.limit)), [
    searchCondition.limit,
  ]);
  useEffect(() => setJisCode(stringOrEmpty(searchCondition.jisCode)), [
    searchCondition.jisCode,
  ]);

  /**
   * Contextのvalue
   */
  const value: SearchConditionContextProps = {
    jisCode,
    pf,
    ct,
    tw,
    st,
    ln,
    psc,
    wd,
    brd,
    orud,
    orpr,
    orar,
    orck,
    ormd,
    orap,
    ortt,
    ormn,
    md,
    thb,
    tht,
    ckt,
    utb,
    eab,
    eat,
    prb,
    prt,
    gfb,
    gft,
    mnt,
    trt,
    apb,
    apt,
    page,
    per,
    limit,
    setJisCode,
    setPf,
    setCt,
    setTw,
    setSt,
    setLn,
    setPsc,
    setWd,
    setBrd,
    setOrud,
    setOrpr,
    setOrar,
    setOrck,
    setOrmd,
    setOrap,
    setOrtt,
    setOrmn,
    setMd,
    setThb,
    setTht,
    setCkt,
    setUtb,
    setPrt,
    setPrb,
    setEab,
    setEat,
    setGfb,
    setGft,
    setMnt,
    setTrt,
    setApb,
    setApt,
    setPage,
    setPer,
    setLimit,
  };
  return (
    <SearchConditionContext.Provider value={value}>
      {children}
    </SearchConditionContext.Provider>
  );
};

const validation = (context: SearchConditionContextProps) => {
  // ここでQueryKeysを使うことでQueryKeysとContextがお互いに整合性があるかをチェックすることができる。
  // 両方に必要なkeyがない場合はそもそもそのkeyを使った実装ができない。
  QueryKeys.forEach((key) => {
    if (!(key in context))
      throw new Error(`[SearchConditionContext] '${key}' has no value`);
  });
  QueryKeys.forEach((key) => {
    const capKey = `set${capitalize(key)}`;
    if (!(capKey in context))
      throw new Error(`[SearchConditionContext] '${capKey}' has no value`);
  });
};

type UseSearchConditionProps = SearchConditionContextProps & {
  filterQueryParameters: FilterQueryParameters;
  modelQueryParameters: ModelQueryParameters;
};

export const useSearchCondition = (): UseSearchConditionProps => {
  const context = useContext(SearchConditionContext);
  validation(context);

  const filterQueryParameters: Required<FilterQueryParameters> = {
    md: context.md.join(","),
    thb: context.thb,
    tht: context.tht,
    ckt: context.ckt,
    utb: context.utb,
    eab: context.eab,
    eat: context.eat,
    prb: context.prb,
    prt: context.prt,
    gfb: context.gfb,
    gft: context.gft,
    mnt: context.mnt,
    trt: context.trt,
    apb: context.apb,
    apt: context.apt,
  };
  const modelQueryParameters: Required<ModelQueryParameters> = {
    jisCode: context.jisCode,
    pf: context.pf.join(","),
    ct: context.ct.join(","),
    tw: context.tw.join(","),
    st: context.st.join(","),
    ln: context.ln.join(","),
    psc: context.psc.join(","),
    wd: context.wd,
    brd: context.brd.join(","),
  };
  return { ...context, filterQueryParameters, modelQueryParameters };
};

export default SearchConditionContextProvider;
