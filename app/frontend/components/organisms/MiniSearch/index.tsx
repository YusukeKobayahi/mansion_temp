import { useMemo } from "react";
import Image from "next/image";
import { buildCurrentConditionSP } from "~/lib/utils";
import styles from "./index.module.scss";
import { QueryVariables, ReactSetStateType, PageCategory } from "~/lib/types";
import { SearchModalTabType } from "~/components/organisms/SearchModal";
import { useToggles } from "~/components/Context/ToggleContext";
import { useSearchCondition } from "~/components/Context/SearchConditionContext";

type MiniSearchProps = {
  page: PageCategory;
  currentMainSearchCondition: string;
  currentCitiesSearchCondition?: string;
  searchCondition: QueryVariables;
  setIsVisible?: ReactSetStateType<boolean>;
  setTab: ReactSetStateType<SearchModalTabType>;
};

const MiniSearch: React.FC<MiniSearchProps> = ({
  page,
  currentMainSearchCondition,
  currentCitiesSearchCondition,
  searchCondition,
  setIsVisible,
  setTab,
}: MiniSearchProps) => {
  const { setToggle: setIsSearchModalOpen } = useToggles();
  const { ct } = useSearchCondition();
  const currentConditionSP = buildCurrentConditionSP(searchCondition);
  const citiesTextByPage = useMemo(() => {
    if (page === "cities") return currentMainSearchCondition;
    else if (page === "towns" && currentCitiesSearchCondition)
      return currentCitiesSearchCondition;
    else return "市区";
  }, [page]);

  const townsTextByPage = useMemo(() => {
    if (page === "towns") return currentMainSearchCondition;
    else return "町村";
  }, [page]);

  const railwaysTextByPage = useMemo(() => {
    if (["lines", "stations"].includes(page)) return currentMainSearchCondition;
    else return "駅/沿線";
  }, [page]);

  return (
    <div className={styles.boxes}>
      <div className={styles.box}>
        <button
          onClick={() => {
            setTab("City");
            setIsSearchModalOpen(true);
            if (setIsVisible) setIsVisible(false);
          }}
        ></button>
        <div className={styles.marker}>
          <Image
            src={"/ms-library/images/marker.svg"}
            alt={"/marker"}
            width={17}
            height={19}
          />
        </div>
        <div className={styles.condition}>
          <p>{citiesTextByPage}</p>
        </div>
        <p className={styles.change}>変更 ＞</p>
      </div>
      {ct.filter(Boolean).length > 0 && (
        <div className={styles.box}>
          <button
            onClick={() => {
              setTab("Town");
              setIsSearchModalOpen(true);
              if (setIsVisible) setIsVisible(false);
            }}
          ></button>
          <div className={styles.marker}>
            <Image
              src={"/ms-library/images/marker.svg"}
              alt={"/marker"}
              width={17}
              height={19}
            />
          </div>
          <div className={styles.condition}>
            <p>{townsTextByPage}</p>
          </div>
          <p className={styles.change}>変更 ＞</p>
        </div>
      )}
      <div className={styles.box}>
        <button
          onClick={() => {
            ["lines", "stations"].includes(page)
              ? setTab("Station")
              : setTab("Line");
            setIsSearchModalOpen(true);
            if (setIsVisible) setIsVisible(false);
          }}
        ></button>
        <div className={styles.marker}>
          <Image
            src={"/ms-library/images/train.svg"}
            alt={"train"}
            width={17}
            height={19}
          />
        </div>
        <div className={styles.condition}>
          <p>{railwaysTextByPage}</p>
        </div>
        <p className={styles.change}>変更 ＞</p>
      </div>
      {page === "schools" && (
        <div className={styles.box}>
          <button
            onClick={() => {
              setTab("PrimarySchool");
              setIsSearchModalOpen(true);
              if (setIsVisible) setIsVisible(false);
            }}
          ></button>
          <div className={styles.marker}>
            <Image
              src={"/ms-library/images/school.svg"}
              alt={"school"}
              width={17}
              height={19}
            />
          </div>
          <div className={styles.condition}>
            <p>{currentMainSearchCondition}</p>
          </div>
          <p className={styles.change}>変更 ＞</p>
        </div>
      )}
      <div className={styles.box}>
        <button
          onClick={() => {
            setTab("FilterSelection");
            setIsSearchModalOpen(true);
            if (setIsVisible) setIsVisible(false);
          }}
        ></button>
        <div className={styles.marker}>
          <Image
            src={"/ms-library/images/checkbox.svg"}
            alt={"marker"}
            width={17}
            height={19}
          />
        </div>
        <div className={styles.condition}>
          <p>{currentConditionSP}</p>
        </div>
        <p className={styles.change}>変更 ＞</p>
      </div>
    </div>
  );
};

export default MiniSearch;
