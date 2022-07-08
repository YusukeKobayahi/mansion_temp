import Image from "next/image";
import { useState } from "react";
import styles from "./index.module.scss";
import Suggestion from "~/components/pages/index/FreeWord/Suggestion";

const SearchBox: React.FC = () => {
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

  return (
    <section className={styles.container} id="list">
      <p className={styles.title}>マンション名を検索する</p>
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
          <Image
            src={"/ms-library/images/search-white.svg"}
            alt={"検索"}
            width={35}
            height={35}
          />
        </button>
        {isVisible && (
          <Suggestion
            word={word}
            setWord={setWord}
            setIsVisible={setIsVisible}
          />
        )}
      </form>
    </section>
  );
};

export default SearchBox;
