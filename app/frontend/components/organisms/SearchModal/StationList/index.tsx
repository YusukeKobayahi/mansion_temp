import styles from "~/components/organisms/SearchModal/index.module.scss";
import { useQuery } from "@apollo/client";
import {
  StationListDocument,
  StationListQuery,
  StationsLineListDocument,
  StationsLineListQuery,
} from "~/graphql/generated";
import xor from "lodash/xor";
import compact from "lodash/compact";
import { FilterQueryParameters, ReactSetStateType } from "~/lib/types";
import PageLoading from "~/components/commons/PageLoading";
import { useToggles } from "~/components/Context/ToggleContext";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import ButtonRect from "~/components/commons/ButtonRect";
import { event } from "~/lib/gtag";
import {
  getQueryVariables,
  buildHrefByIsNoindex,
  buildLibraryPagePath,
  buildSearchUrlFromHref,
} from "~/lib/utils";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import React, { useEffect, useMemo, useState } from "react";
import Alert from "~/components/commons/Alert";
import Radio from "~/components/commons/Radio";
import Tabs from "~/components/organisms/SearchModal/Tabs";
import difference from "lodash/difference";
import union from "lodash/union";
import uniq from "lodash/uniq";
import without from "lodash/without";
import flatten from "lodash/flatten";

type StationListProps = {
  filterQueryParameters: FilterQueryParameters;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const StationList: React.FC<StationListProps> = ({
  filterQueryParameters,
  tab,
  setTab,
}: StationListProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { ln, st, setLn, setSt } = useSearchCondition();
  const [selectedLn, setSelectedLn] = useState<string[]>([]);
  const [selectedLnsStIds, setSelectedLnsStIds] = useState<string[]>([]);

  /**
   * このコンポーネントがレンダリングされたとき、lnが空の場合、lnをもとにstationを取得できなくなってしまうため、できる限りの対策が必要
   * その対策が以下の記述
   * - stが存在する前提
   * - stations.line.jisCodeと辿ってlnを作成
   * - lnをセット
   */
  const { data: stationsLineData } = useQuery(StationsLineListDocument, {
    variables: getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        st: st.join(","),
      },
    }),
  });

  let lineIdList: string[] = [...ln];
  if (!ln.length && stationsLineData) {
    const stations: StationsLineListQuery["stations"] =
      stationsLineData.stations;
    lineIdList = compact(stations.map(({ line }) => line.id));
  }

  useEffect(() => {
    setLn(lineIdList);
  }, [setLn]);

  /**
   * lnをもとにlines,stationsをそれぞれ取得
   */
  const { data, error, loading } = useQuery(StationListDocument, {
    variables: getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        ln: ln.join(","),
      },
    }),
  });
  const stationData: StationListQuery = useMemo(() => data, [data]);

  /**
   * 選択した路線内以外の駅のidをstが持っている可能性があるので、フィルターをかけておく必要がある。
   */
  useEffect(() => {
    if (stationData) {
      const getStationIds = ({
        stations,
      }: StationListQuery["lines"][number]) => {
        return stations.map(({ id }) => id);
      };
      const stationIds = flatten(stationData.lines.map(getStationIds));
      const filteredSt = st.filter((id) => stationIds.includes(id));
      setSt(filteredSt);
    }
  }, [stationData]);

  /**
   * チェックボックスの処理ではlnの代わりにselectedLnを使う。
   * 路線選択で使用したlnを初期化して空にしてしまうことは副作用につながるため。
   * チェックボックスの処理では以下の三つのStateを使用する
   * - `st` このコンポーネントのメインとなるState。
   * - `selectedLn` 選択された路線(「路線ごと選択されたstたち」が正しい考え方)
   * - `selectedLnsStIds` 後にstと比べるために使用される「駅id」の塊。「路線がもつ路線内の全てのid」単位で追加・削除される
   */
  const addSelectedLine = (id: string, stationIdList: string[]) => {
    setSelectedLn(union(selectedLn, [id]));
    setSelectedLnsStIds(union(selectedLnsStIds, stationIdList));
  };

  const removeSelectedLine = (id: string, stationIdList: string[]) => {
    setSelectedLn(without(selectedLn, id));
    setSelectedLnsStIds(without(selectedLnsStIds, ...stationIdList));
  };

  const updateSelectedLineState = (
    stationIdList: string[],
    st: string[],
    lineId: string
  ) => {
    const isAllChecked = stationIdList.every((stationId) =>
      st.includes(stationId)
    );
    if (isAllChecked) {
      addSelectedLine(lineId, stationIdList);
    } else if (selectedLn.includes(lineId)) {
      removeSelectedLine(lineId, stationIdList);
    }
  };

  /**
   * selectedLnの初期化。
   * 駅を全て選択済みの場合はSelectedLnに追加しておく必要がある。
   */
  useEffect(() => {
    if (stationData) {
      stationData.lines.forEach(({ id: lineId, stations }) => {
        const stationIdList = stations
          .filter(({ mansionCount }) => mansionCount !== 0)
          .map(({ id }) => id);
        updateSelectedLineState(stationIdList, st, lineId);
      });
    }
  }, [stationData]);

  const changeLine = (stationIdList: string[], id: string) => {
    const goingToCheck = !selectedLn.includes(id);
    if (goingToCheck) {
      addSelectedLine(id, stationIdList);
      setSt(union(st, stationIdList));
    } else {
      removeSelectedLine(id, stationIdList);
      setSt(without(st, ...stationIdList));
    }
  };

  const changeStation = (
    stationIdList: string[],
    id: string,
    lineId: string
  ) => {
    setSt((st) => {
      const newSt = xor(st, [id]);
      updateSelectedLineState(stationIdList, newSt, lineId);
      return newSt;
    });
  };

  /**
   * lineページへのリダイレクト条件
   * - [...全てのln.st[]] == st[]
   */
  const didSelectOnlyLines =
    selectedLnsStIds.length !== 0 &&
    st.length !== 0 &&
    difference(uniq(selectedLnsStIds), uniq(st)).length == 0;
  const href = didSelectOnlyLines
    ? buildHrefByIsNoindex(
        buildLibraryPagePath("lines", selectedLn[0]),
        getQueryVariables({
          filterQueryParameters,
          modelQueryParameters: {
            ln: selectedLn.join(","),
          },
        })
      )
    : buildHrefByIsNoindex(
        buildLibraryPagePath("stations", st[0]),
        getQueryVariables({
          filterQueryParameters,
          modelQueryParameters: {
            st: st.join(","),
          },
        })
      );

  const changeCondition = () => {
    event({
      action: "msl_link_click",
      category: "msl_ichiran",
      label: buildSearchUrlFromHref(href),
      value: 1,
    });
    setIsSearchModalOpen(false);
  };

  const list =
    stationData && stationData.lines
      ? stationData.lines.map(({ id: lineId, name, stations }, i) => {
          const stationIdList = stations
            .filter(({ mansionCount }) => mansionCount !== 0)
            .map(({ id }) => id);

          return (
            <React.Fragment key={i}>
              {stationIdList.length !== 0 && (
                <div className={styles.group} key={lineId}>
                  <span className={styles.bigRadio}>
                    <input
                      type="checkbox"
                      id={lineId}
                      checked={selectedLn.includes(lineId)}
                      onChange={() => changeLine(stationIdList, lineId)}
                    />
                    <label htmlFor={lineId}>{name}</label>
                  </span>
                  <div className={styles.content}>
                    {stations.map(({ id, name, mansionCount }, i) => (
                      <React.Fragment key={i}>
                        {mansionCount !== 0 && (
                          <Radio
                            className={styles.radio}
                            labelText={`${name}(${mansionCount})`}
                            shape={"circle"}
                            values={[id]}
                            checked={st.includes(id)}
                            onChange={(e) =>
                              changeStation(
                                stationIdList,
                                e.target.value,
                                lineId
                              )
                            }
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })
      : [];

  return (
    <BasicLayout title={"駅を変更"}>
      <Tabs setTab={setTab} tab={tab} className={"pcOnly"} />
      <div className={styles.block}>
        {data && list.length !== 0 && list}
        {data && list.length === 0 && (
          <Alert
            className="m_x_30px m_y_10px"
            text="指定された検索条件で駅が見つかりませんでした。"
            outline={true}
          />
        )}
        {!ln.length && !st.length && (
          <Alert
            className="m_x_30px"
            text={"路線が選択されていません。路線を選択してください。"}
            outline={true}
            color={"brown"}
          >
            <div className="flex">
              <ButtonRect
                outerClassName={styles.btn_outer}
                className={"w_130px m_x_auto"}
                text="路線を選択する"
                outline={true}
                onClick={() => setTab("Line")}
              />
            </div>
          </Alert>
        )}
        {error && (
          <Alert
            className="m_x_30px"
            text="検索中に問題がありました。しばらくしてから再度お試しください。"
            outline={true}
          />
        )}
        {loading && <PageLoading />}
      </div>
      <div className={styles.btn_container}>
        <div className={styles.btn_inner}>
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="閉じる"
            outline={true}
            onClick={() => setIsSearchModalOpen(false)}
          />
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="沿線選択に戻る"
            outline={true}
            onClick={() => setTab("Line")}
          />
        </div>
        <div>
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="検索する"
            onClick={changeCondition}
            linkProps={{ href }}
            disabled={st.length === 0}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default StationList;
