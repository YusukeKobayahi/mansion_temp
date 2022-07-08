import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

const Form: React.FC = () => {
  const [word, setWord] = useState("");
  const actionUrl = "/ms-library/freeword/";
  return (
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
        onChange={(e) => setWord(e.target.value)}
        placeholder="マンション名を入力してください"
      />
      <button className={styles.submit} type="submit">
        <Image
          className={styles.search}
          src={"/ms-library/images/search.svg"}
          alt={"housii"}
          width={18}
          height={18}
          loading={"eager"}
        />
      </button>
    </form>
  );
};

export default Form;
