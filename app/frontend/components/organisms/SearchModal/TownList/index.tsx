import styles from "~/components/organisms/SearchModal/index.module.scss";
import { useQuery } from "@apollo/client";
import {
  TownListQuery,
  TownListDocument,
  TownsCityListDocument,
  TownsCityListQuery,
} from "~/graphql/generated";
import xor from "lodash/xor";
import compact from "lodash/compact";
import {
  buildHrefByIsNoindex,
  buildLibraryPagePath,
  buildSearchUrlFromHref,
  getQueryVariables,
  sumReducer,
} from "~/lib/utils";
import { FilterQueryParameters, ReactSetStateType } from "~/lib/types";
import PageLoading from "~/components/commons/PageLoading";
import { useToggles } from "~/components/Context/ToggleContext";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import ButtonRect from "~/components/commons/ButtonRect";
import { event } from "~/lib/gtag";
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import React, { useEffect } from "react";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import Alert from "~/components/commons/Alert";
import Radio from "~/components/commons/Radio";
import Tabs from "~/components/organisms/SearchModal/Tabs";

type TownListProps = {
  filterQueryParameters: FilterQueryParameters;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const TownList: React.FC<TownListProps> = ({
  filterQueryParameters,
  tab,
  setTab,
}: TownListProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { ct, tw, setCt, setTw } = useSearchCondition();

  /**
   * このコンポーネントがレンダリングされたとき、ctが空の場合、ctをもとにtownを取得できなくなってしまうため、できる限りの対策が必要
   * その対策が以下の記述
   * - twが存在する前提
   * - towns.city.jisCodeと辿ってctを作成
   * - ctをセット
   */
  const { data: townsCityData } = useQuery(TownsCityListDocument, {
    variables: getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        tw: tw.join(","),
      },
    }),
  });

  let cityIdList: string[] = [...ct];
  if (!ct.length && townsCityData) {
    const towns: TownsCityListQuery["towns"] = townsCityData.towns;
    cityIdList = compact(towns.map(({ city }) => city.jisCode));
  }

  useEffect(() => {
    setCt(cityIdList);
  }, [setCt]);

  /**
   * ctをもとにcities,townsをそれぞれ取得
   */
  const { data, error, loading } = useQuery(TownListDocument, {
    variables: getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        ct: ct.join(","),
        tw: tw.join(","),
      },
    }),
  });

  const href = buildHrefByIsNoindex(
    buildLibraryPagePath("towns", tw[0]),
    getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        tw: tw.join(","),
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

  const cityData: TownListQuery = { ...data };
  const list = cityData.cities
    ? cityData.cities.map(({ name, towns }, i) => {
        // 市区の総マンション数を取得
        const cityTotalCount = towns
          .map(({ mansionCount }) => mansionCount)
          .reduce(sumReducer);
        if (cityTotalCount == 0) return null;

        return (
          <div className={styles.group} key={i}>
            <p className={styles.groupName}>{name}</p>
            <div className={styles.content}>
              {towns.map(({ id, name, mansionCount }) => (
                <React.Fragment key={id}>
                  {mansionCount !== 0 && (
                    <Radio
                      className={styles.radio}
                      labelText={`${name}(${mansionCount})`}
                      shape={"circle"}
                      values={[id]}
                      checked={tw.includes(id)}
                      onChange={(e) => setTw(xor(tw, [e.target.value]))}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })
    : [];

  return (
    <BasicLayout title={"町村を変更"}>
      <Tabs setTab={setTab} tab={tab} className={"pcOnly"} />
      <div className={styles.block}>
        {data && list.length !== 0 && list}
        {data && list.length === 0 && (
          <Alert
            className="m_x_30px m_y_10px"
            text="指定された検索条件で町村が見つかりませんでした。"
            outline={true}
          />
        )}
        {!ct.length && !tw.length && (
          <Alert
            className="m_x_30px"
            text={"市区が選択されていません。市区を選択してください。"}
            outline={true}
            color={"brown"}
          >
            <div className="flex">
              <ButtonRect
                outerClassName={styles.btn_outer}
                className={"w_130px m_x_auto"}
                text="市区を選択する"
                outline={true}
                onClick={() => setTab("City")}
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
            text="市区選択に戻る"
            outline={true}
            onClick={() => setTab("City")}
          />
        </div>
        <div>
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="検索する"
            onClick={changeCondition}
            linkProps={{ href }}
            disabled={tw.length === 0}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default TownList;
