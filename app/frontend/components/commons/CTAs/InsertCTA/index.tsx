import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";

const InsertCTA: React.FC = () => {
  const clickCTA = () => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_ichiran",
      label: "msl_lp_center",
      value: 1,
    });
  };
  return (
    <section className={styles.container}>
      <p className={styles.description}>
        ＼ ここには掲載していない未公開物件があります！ ／
      </p>
      <button className={styles.btn} onClick={clickCTA}>
        会員登録してオファー限定情報を手に入れる
      </button>
    </section>
  );
};

export default InsertCTA;
