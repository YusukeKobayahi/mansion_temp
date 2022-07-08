import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";
import classnames from "classnames";
import { GoogleAnalyticsEvent } from "~/lib/types";

const MenuCTA: React.FC = () => {
  const clickCTA = (label: GoogleAnalyticsEvent["label"]) => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_ichiran",
      label: label,
      value: 1,
    });
  };
  return (
    <section className={classnames(styles.container, "pcOnly")}>
      <button className={styles.btn} onClick={() => clickCTA("msl_lp_mikokai")}>
        未公開物件の
        <br />
        情報が欲しい
      </button>
      <button className={styles.btn} onClick={() => clickCTA("msl_lp_gensen")}>
        複数の不動産会社
        <br />
        に相談したい
      </button>
    </section>
  );
};

export default MenuCTA;
