import styles from "~/components/organisms/SearchModal/index.module.scss";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { LineListDocument, LineListQuery } from "~/graphql/generated";
import xor from "lodash/xor";
import {
  buildHrefByIsNoindex,
  buildLibraryPagePath,
  buildSearchUrlFromHref,
  getFilterQueryVariables,
  getQueryVariables,
  sumReducer,
} from "~/lib/utils";
import { FilterQueryParameters, ReactSetStateType } from "~/lib/types";
import PageLoading from "~/components/commons/PageLoading";
import { useToggles } from "~/components/Context/ToggleContext";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import ButtonRect from "~/components/commons/ButtonRect";
import PrefectureList from "~/components/organisms/SearchModal/PrefectureList";
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import Tabs from "~/components/organisms/SearchModal/Tabs";
import { event } from "~/lib/gtag";
import Alert from "~/components/commons/Alert";
import Radio from "~/components/commons/Radio";

type LineListProps = {
  jisCode: string;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
  filterQueryParameters: FilterQueryParameters;
};

const LineList: React.FC<LineListProps> = ({
  jisCode,
  tab,
  setTab,
  filterQueryParameters,
}: LineListProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { pf, ln, setPf, setLn } = useSearchCondition();

  useEffect(() => {
    setPf(jisCode.split(","));
  }, [jisCode]);

  const { data, error, loading } = useQuery(LineListDocument, {
    variables: {
      jisCode: pf.join(","),
      ...getFilterQueryVariables({ filterQueryParameters }),
    },
  });
  const href = buildHrefByIsNoindex(
    buildLibraryPagePath("lines", ln[0]),
    getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        ln: ln.join(","),
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

  const lineData: LineListQuery = data;
  const companies = lineData ? lineData.prefecture.companies : undefined;
  const list = companies
    ? companies.map(({ name, lines }, i) => {
        // 鉄道会社の総マンション数を取得
        const companyTotalCount = lines
          .map(({ mansionCount }) => mansionCount)
          .reduce(sumReducer);
        if (companyTotalCount == 0) return null;
        return (
          <div className={styles.group} key={i}>
            <p className={styles.groupName}>{name}</p>
            <div className={styles.content}>
              {lines.map(({ id, name, mansionCount }, i) => (
                <React.Fragment key={i}>
                  {mansionCount !== 0 && (
                    <Radio
                      className={styles.radio}
                      labelText={`${name}(${mansionCount})`}
                      shape={"circle"}
                      values={[id]}
                      checked={ln.includes(id)}
                      onChange={() => setLn(xor(ln, [id]))}
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
    <BasicLayout title={"沿線を変更"}>
      <Tabs setTab={setTab} tab={tab} className={"pcOnly"} />
      <PrefectureList />
      <div className={styles.block}>
        {data && list.length !== 0 && list}
        {data && list.length === 0 && (
          <Alert
            className="m_x_30px m_y_10px"
            text="指定された検索条件で路線が見つかりませんでした。"
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
            text="駅を選択する"
            outline={true}
            onClick={() => setTab("Station")}
            disabled={ln.length === 0}
          />
        </div>
        <div>
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="検索する"
            onClick={changeCondition}
            linkProps={{ href }}
            disabled={ln.length === 0}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default LineList;
