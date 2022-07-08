import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";
import { GoogleAnalyticsEvent } from "~/lib/types";
type MembersCTAProps = {
  mansionName: string;
  pageView: number;
};

const MembersCTA: React.FC<MembersCTAProps> = ({
  mansionName,
  pageView,
}: MembersCTAProps) => {
  const clickCTA = (label: GoogleAnalyticsEvent["label"]) => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_shosai",
      label: label,
      value: 1,
    });
  };
  return (
    <section className={styles.container}>
      <div>
        <p className={styles.description}>
          {pageView}人がこの物件の購入を検討しています！
        </p>
      </div>
      <div className={styles.cta_area}>
        <div className={styles.cta_offer}>
          <p className={styles.description}>
            {mansionName}をご検討の皆様
            <br />＼ 条件の近い未公開物件があります！ ／
          </p>
          <button
            className={styles.btn}
            onClick={() => {
              clickCTA("msl_lp_souba_left");
            }}
          >
            <span>
              完全
              <br />
              無料
            </span>
            会員登録して物件情報を受け取る
          </button>
        </div>
        <div className={styles.cta_register}>
          <p className={styles.description}>
            複数の不動産会社が
            <br />＼ あなたの理想の物件を提案 ／
          </p>
          <button
            className={styles.btn}
            onClick={() => {
              clickCTA("msl_lp_souba_right");
            }}
          >
            <span>
              完全
              <br />
              無料
            </span>
            会員登録して理想の物件を見つける
          </button>
        </div>
      </div>
    </section>
  );
};

export default MembersCTA;
