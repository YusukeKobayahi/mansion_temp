import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";
import Link from "~/components/commons/Link";

const MembersCTA: React.FC = () => {
  return (
    <section className={styles.container}>
      <div className={styles.cta}>
        <p className={styles.description}>
          ＼ メールアドレス設定と条件入力で会員登録完了 ／
        </p>
        <button
          className={styles.btn}
          onClick={() => {
            clickMembers({
              action: "msl_cta_click",
              category: "msl_top",
              label: "msl_lp",
              value: 1,
            });
          }}
        >
          <span>
            完全
            <br />
            無料
          </span>
          理想の家探しスタート
        </button>
        <Link
          text="Housiiについての詳しい情報はこちらから"
          onClick={() => {
            clickMembers({
              action: "msl_cta_click",
              category: "msl_top",
              label: "msl_lp",
              value: 1,
            });
          }}
        />
      </div>
    </section>
  );
};

export default MembersCTA;
