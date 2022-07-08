import React from "react";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";
import prefecturesList from "~/components/molecules/Search/prefectureList.json";
import styles from "./index.module.scss";

type ExcludePrefectureType = "40000";
type PrefectureListProps = {
  excludes?: ExcludePrefectureType[]; //特殊、小学校はjisCode40000にあたる福岡県に存在しないため、除外する
};

const PrefectureList: React.FC<PrefectureListProps> = ({
  excludes,
}: PrefectureListProps) => {
  const { pf, setPf } = useSearchCondition();
  const prefectures = prefecturesList.prefectures;
  return (
    <div className={styles.prefectureList}>
      {prefectures.map(({ jisCode, name }, i) => (
        <React.Fragment key={i}>
          {!(
            excludes && excludes.includes(jisCode as ExcludePrefectureType)
          ) && (
            <span className={styles.prefectureItem} key={i}>
              <input
                type="radio"
                id={jisCode}
                value={jisCode}
                name="prefecture"
                checked={pf.includes(jisCode)}
                onChange={(e) => {
                  setPf([e.target.value]);
                }}
              />
              <label htmlFor={jisCode}>{name}</label>
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PrefectureList;
