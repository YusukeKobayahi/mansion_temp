import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import MiniSearch from "~/components/organisms/MiniSearch";

type FloatMiniSearchProps = React.ComponentProps<typeof MiniSearch> & {
  visible?: boolean;
};

const FloatMiniSearch: React.FC<FloatMiniSearchProps> = ({
  visible,
  page,
  currentMainSearchCondition,
  currentCitiesSearchCondition,
  searchCondition,
  setTab,
}: FloatMiniSearchProps) => {
  const [isVisible, setIsVisible] = useState(visible ? visible : false);
  const openMiniSearch = () => {
    setIsVisible(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <button
          className={isVisible ? styles.close : styles.open}
          onClick={isVisible ? () => setIsVisible(false) : openMiniSearch}
        >
          <Image
            src={`/ms-library/images/${isVisible ? "close" : "search"}.svg`}
            alt={"search"}
            width={20}
            height={20}
          />
        </button>
      </div>
      {isVisible && (
        <>
          <button
            className={styles.mask}
            onClick={() => setIsVisible(false)}
          ></button>
          <div className={styles.wrapper}>
            <MiniSearch
              page={page}
              currentMainSearchCondition={currentMainSearchCondition}
              currentCitiesSearchCondition={currentCitiesSearchCondition}
              searchCondition={searchCondition}
              setTab={setTab}
              setIsVisible={setIsVisible}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FloatMiniSearch;
