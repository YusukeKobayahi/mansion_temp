import Router from "next/router";
import ButtonRadius from "~/components/commons/ButtonRadius";
import { useCheckedValues } from "~/components/Context/CheckedValuesContext";
import { useToggles } from "~/components/Context/ToggleContext";
import { buildLibraryPagePath } from "~/lib/utils";

import styles from "./index.module.scss";

const querySet = {
  schools: "psc",
  stations: "st",
};

type SearchButtonProps = {
  subject: "schools" | "stations";
};
const SearchButton: React.FC<SearchButtonProps> = ({
  subject,
}: SearchButtonProps) => {
  const { checkedValues } = useCheckedValues();
  const { setToggle } = useToggles();

  const search = () => {
    if (checkedValues.length == 0) return;
    const path = buildLibraryPagePath(subject, checkedValues[0]);
    const query = { [querySet[subject]]: checkedValues.join(",") };
    Router.push(
      checkedValues.length !== 1
        ? {
            pathname: path,
            query: query,
          }
        : path
    );
    setToggle(false); //ハンバーガーメニューのモーダルを閉じる
  };
  return (
    <div className={styles.searchButtonOutline}>
      <div className={styles.searchButtonInline}>
        <ButtonRadius
          text={"検索する"}
          disabled={checkedValues.length === 0}
          color={"brown"}
          outline={true}
          onClick={() => search()}
        />
      </div>
    </div>
  );
};

export default SearchButton;
