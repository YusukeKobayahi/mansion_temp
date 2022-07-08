import styles from "./index.module.scss";
import classnames from "classnames";
import { clickMembers } from "~/lib/utils";
import { GoogleAnalyticsEvent } from "~/lib/types";

type MembersCTAProps = {
  name: string;
};

const MembersCTA: React.FC<MembersCTAProps> = ({ name }: MembersCTAProps) => {
  const isLongText = (() => {
    if (name.length > 15) return true;
    else return false;
  })();
  const clickCTA = (label: GoogleAnalyticsEvent["label"]) => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_ichiran",
      label: "msl_lp_left",
      value: 1,
    });
  };
  return (
    <section className={classnames(styles.container, "pcOnly")}>
      <div className={styles.cta_offer}>
        <p className={styles.description}>
          {isLongText && name}＼ {!isLongText && name}の未公開物件が多数 ／
        </p>
        <button className={styles.btn} onClick={() => clickCTA("msl_lp_left")}>
          <span>
            完全
            <br />
            無料
          </span>
          未公開物件の情報が
          <br />
          欲しい方はこちら
        </button>
      </div>
      <div className={styles.cta_register}>
        <p className={styles.description}>
          ＼複数の不動産会社に相談ができる！ ／
        </p>
        <button className={styles.btn} onClick={() => clickCTA("msl_lp_right")}>
          <span>
            完全
            <br />
            無料
          </span>
          会員登録して理想の
          <br />
          マンションを探す
        </button>
      </div>
    </section>
  );
};

export default MembersCTA;
