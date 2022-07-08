import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { FreeWordDocument, FreeWordQuery } from "~/graphql/generated";
import { ReactSetStateType } from "~/lib/types";
import styles from "./index.module.scss";

type SuggestionProps = {
  word: string;
  setWord: ReactSetStateType<string>;
  setIsVisible: ReactSetStateType<boolean>;
};

const Suggestion: React.FC<SuggestionProps> = ({
  word,
  setWord,
  setIsVisible,
}: SuggestionProps) => {
  const [currentSuggestion, setCurrentSuggestion] = useState([""]);
  const limit = 20;
  const { data, error, loading } = useQuery(FreeWordDocument, {
    variables: { word, limit },
  });
  useEffect(() => {
    const freeWordData: FreeWordQuery = { ...data };
    if (freeWordData.freeWord && !error && !loading) {
      setCurrentSuggestion(freeWordData.freeWord.map((a) => a.value));
    }
  }, [data, error, loading]);
  const clickSuggestion = (s: string) => {
    setWord(s);
    setIsVisible(false);
  };
  const results = currentSuggestion.map((s, i) => {
    return (
      <button
        className={styles.btn}
        key={i}
        onClick={() => clickSuggestion(s)}
        type={"button"}
      >
        {s}
      </button>
    );
  });
  return currentSuggestion.filter(Boolean).length > 0 ? (
    <section className={styles.container}>
      <button
        className={styles.mask}
        onClick={() => setIsVisible(false)}
      ></button>
      <div className={styles.results}>{results}</div>
    </section>
  ) : null;
};

export default Suggestion;
