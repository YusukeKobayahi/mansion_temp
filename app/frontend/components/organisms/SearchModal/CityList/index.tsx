import styles from "~/components/organisms/SearchModal/index.module.scss";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { CityListDocument, CityListQuery } from "~/graphql/generated";
import xor from "lodash/xor";
import PageLoading from "~/components/commons/PageLoading";
import { useToggles } from "~/components/Context/ToggleContext";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import ButtonRect from "~/components/commons/ButtonRect";
import { FilterQueryParameters, ReactSetStateType } from "~/lib/types";
import {
  buildHrefByIsNoindex,
  buildLibraryPagePath,
  buildSearchUrlFromHref,
  getQueryVariables,
} from "~/lib/utils";
import { event } from "~/lib/gtag";
import PrefectureList from "~/components/organisms/SearchModal/PrefectureList";
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import Tabs from "~/components/organisms/SearchModal/Tabs";
import Alert from "~/components/commons/Alert";
import dynamic from "next/dynamic";
const Radio = dynamic(() => import("~/components/commons/Radio"), {
  ssr: false,
});

type CityListProps = {
  jisCode: string;
  filterQueryParameters: FilterQueryParameters;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const CityList: React.FC<CityListProps> = ({
  jisCode,
  filterQueryParameters,
  tab,
  setTab,
}: CityListProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { pf, ct, tw, setPf, setCt, setTw } = useSearchCondition();

  useEffect(() => {
    setPf(jisCode.split(","));
  }, [jisCode]);

  const { data, error, loading } = useQuery(CityListDocument, {
    variables: { jisCode: pf.join(",") },
  });

  const href = buildHrefByIsNoindex(
    buildLibraryPagePath("cities", ct[0]),
    getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        ct: ct.join(","),
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

  const cityData: CityListQuery = data;
  const list = cityData
    ? cityData.prefecture.cities.map(
        ({ jisCode, name, mansionCount, towns }, i) => (
          <React.Fragment key={i}>
            {mansionCount !== 0 && (
              <Radio
                className={styles.radio}
                labelText={`${name}(${mansionCount})`}
                shape={"circle"}
                values={[jisCode]}
                checked={ct.includes(jisCode)}
                onChange={(e) => {
                  setCt(xor(ct, [e.target.value]));
                  // 町村検索条件の初期化
                  const townIdList = towns.map(({ id }) => id);
                  const filteredTw = [...tw].filter(
                    (el) => !townIdList.includes(el)
                  );
                  setTw(filteredTw);
                }}
              />
            )}
          </React.Fragment>
        )
      )
    : [];

  return (
    <BasicLayout title={"市区を変更"}>
      <Tabs setTab={setTab} tab={tab} className={"pcOnly"} />
      <PrefectureList />
      <div className={styles.block}>
        <div className={styles.content}>
          {data && list.length !== 0 && list}
          {data && list.length === 0 && (
            <Alert
              className="m_x_30px m_y_10px"
              text="指定された検索条件で市区が見つかりませんでした。"
              outline={true}
            />
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
            text="町村を選択する"
            outline={true}
            onClick={() => setTab("Town")}
            disabled={ct.length === 0}
          />
        </div>
        <div>
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="検索する"
            onClick={changeCondition}
            linkProps={{ href }}
            disabled={ct.length === 0}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default CityList;
