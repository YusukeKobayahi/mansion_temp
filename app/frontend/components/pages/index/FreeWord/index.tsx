import { useState } from "react";
import Link from "next/link";
import { buildLibraryPagePath } from "~/lib/utils";
import { event } from "~/lib/gtag";
import townList from "~/components/pages/index/PopularTowns/townList.json";
import styles from "./index.module.scss";
import Suggestion from "~/components/pages/index/FreeWord/Suggestion";
import { TownListProps } from "~/components/pages/index/PopularTowns";

const FreeWord: React.FC = () => {
  const [word, setWord] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const actionUrl = "/ms-library/freeword/";

  const updateWord = (s: string) => {
    setWord(s);
    if (s.length > 2) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const filteredTownList: TownListProps[] = townList.towns;
  const clickTown = () => {
    event({
      action: "msl_area_click",
      category: "msl_top",
      label: "msl_town",
      value: 1,
    });
  };

  return (
    <section className={styles.container}>
      <p className={styles.title}>マンション名から探す</p>
      <form
        action={actionUrl}
        method="GET"
        className={styles.form}
        onSubmit={(e) => {
          if (word.length < 2) e.preventDefault();
        }}
      >
        <input
          name="wd"
          type="text"
          value={word}
          onChange={(e) => updateWord(e.target.value)}
          placeholder="マンション名を入力してください"
        />
        <button className={styles.submit} type="submit">
          検索
        </button>
        {isVisible && (
          <Suggestion
            word={word}
            setWord={setWord}
            setIsVisible={setIsVisible}
          />
        )}
      </form>
      <div className={styles.tags}>
        {filteredTownList.map((town) => {
          return (
            <Link
              key={town.id}
              href={buildLibraryPagePath("towns", town.id)}
              prefetch={false}
              passHref
            >
              <button className={styles.link} onClick={clickTown}>
                {town.name}
              </button>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default FreeWord;
