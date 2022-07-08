import styles from "~/components/organisms/SearchModal/index.module.scss";
import { useQuery } from "@apollo/client";
import { BrandListDocument, BrandListQuery } from "~/graphql/generated";
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
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import Tabs from "~/components/organisms/SearchModal/Tabs";
import React from "react";
import Alert from "~/components/commons/Alert";
import Radio from "~/components/commons/Radio";

type BrandListProps = {
  filterQueryParameters: FilterQueryParameters;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const BrandList: React.FC<BrandListProps> = ({
  filterQueryParameters,
  tab,
  setTab,
}: BrandListProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { brd, setBrd } = useSearchCondition();

  const { data, error, loading } = useQuery(BrandListDocument);

  const href = buildHrefByIsNoindex(
    buildLibraryPagePath("brands", brd[0]),
    getQueryVariables({
      filterQueryParameters,
      modelQueryParameters: {
        brd: brd.join(","),
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

  const brandData: BrandListQuery = data;
  const list = brandData
    ? brandData.brands.map(({ id, name, mansionCount }, i) => (
        <React.Fragment key={i}>
          {mansionCount !== 0 && (
            <Radio
              className={styles.radio}
              labelText={`${name}(${mansionCount})`}
              shape={"circle"}
              values={[id]}
              checked={brd.includes(id)}
              onChange={(e) => setBrd(xor(brd, [e.target.value]))}
            />
          )}
        </React.Fragment>
      ))
    : [];

  return (
    <BasicLayout title={"マンションブランドを変更"}>
      <Tabs setTab={setTab} tab={tab} className={"pcOnly"} />
      <div className={styles.block}>
        <div className={styles.content}>
          {data && list.length !== 0 && list}
          {data && list.length === 0 && (
            <Alert
              className="m_x_30px m_y_10px"
              text="指定された検索条件でマンションブランドが見つかりませんでした。"
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
            text="検索する"
            onClick={changeCondition}
            linkProps={{ href }}
            disabled={brd.length === 0}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default BrandList;
