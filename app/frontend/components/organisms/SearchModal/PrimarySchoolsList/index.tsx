import styles from "~/components/organisms/SearchModal/index.module.scss";
import { useQuery } from "@apollo/client";
import {
  PrimarySchoolsListDocument,
  PrimarySchoolsListQuery,
} from "~/graphql/generated";
import xor from "lodash/xor";
import {
  buildHrefByIsNoindex,
  buildLibraryPagePath,
  buildSearchUrlFromHref,
  getQueryVariables,
  sumReducer,
} from "~/lib/utils";
import PageLoading from "~/components/commons/PageLoading";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import { useToggles } from "~/components/Context/ToggleContext";
import ButtonRect from "~/components/commons/ButtonRect";
import { event } from "~/lib/gtag";
import { FilterQueryParameters, ReactSetStateType } from "~/lib/types";
import PrefectureList from "~/components/organisms/SearchModal/PrefectureList";
import BasicLayout from "~/components/organisms/SearchModal/BasicLayout";
import React, { useEffect } from "react";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import Tabs from "~/components/organisms/SearchModal/Tabs";
import Alert from "~/components/commons/Alert";
import Radio from "~/components/commons/Radio";

type Props = {
  jisCode: string;
  filterQueryParameters: FilterQueryParameters;
  tab: SearchModalTabType;
  setTab: ReactSetStateType<SearchModalTabType>;
};
const PrimarySchoolsList: React.FC<Props> = ({
  jisCode,
  filterQueryParameters,
  tab,
  setTab,
}: Props) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { pf, psc, setPsc, setPf } = useSearchCondition();

  useEffect(() => {
    setPf(jisCode.split(","));
  }, [jisCode]);

  const { data, error, loading } = useQuery(PrimarySchoolsListDocument, {
    variables: { jisCode: pf.join(",") },
  });

  const query = getQueryVariables({
    filterQueryParameters,
    modelQueryParameters: {
      psc: psc.join(","),
    },
  });
  const href = buildHrefByIsNoindex(
    buildLibraryPagePath("schools", psc[0]),
    query
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

  const schoolsData: PrimarySchoolsListQuery = { ...data };
  const list =
    schoolsData && schoolsData.prefecture
      ? schoolsData.prefecture.cities?.map(({ primarySchools, name }, i) => {
          if (!primarySchools) return null;
          // ????????????????????????????????????????????????????????????
          const schoolsTotalCount = primarySchools
            .map(({ mansionCount }) => mansionCount)
            .reduce(sumReducer, 0);
          if (schoolsTotalCount == 0) return null;

          return (
            <div className={styles.group} key={i}>
              <p className={styles.groupName}>{name}</p>
              <div className={styles.content}>
                {primarySchools.map(({ schoolId, name, mansionCount }) => (
                  <React.Fragment key={schoolId}>
                    {mansionCount !== 0 && (
                      <Radio
                        className={styles.radio}
                        labelText={`${name}???(${mansionCount})`}
                        shape={"circle"}
                        values={[schoolId]}
                        checked={psc.includes(schoolId)}
                        onChange={(e) => setPsc(xor(psc, [e.target.value]))}
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
    <BasicLayout title={"?????????????????????"}>
      <Tabs setTab={setTab} tab={tab} className={"pcOnly"} />
      <PrefectureList excludes={["40000"]} />
      <div className={styles.block}>
        {data && list.length !== 0 && list}
        {data && list.length === 0 && (
          <Alert
            className="m_x_30px m_y_10px"
            text="??????????????????????????????????????????????????????????????????????????????"
            outline={true}
          />
        )}
        {error && (
          <Alert
            className="m_x_30px"
            text="?????????????????????????????????????????????????????????????????????????????????????????????"
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
            text="?????????"
            outline={true}
            onClick={() => setIsSearchModalOpen(false)}
          />
          <ButtonRect
            outerClassName={styles.btn_outer}
            className={styles.btn}
            text="????????????"
            onClick={changeCondition}
            linkProps={{ href }}
            disabled={psc.length === 0}
          />
        </div>
      </div>
    </BasicLayout>
  );
};

export default PrimarySchoolsList;
