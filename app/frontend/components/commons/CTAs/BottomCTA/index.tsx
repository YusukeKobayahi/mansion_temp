import Image from "next/image";
import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";

const BottomCTA: React.FC = () => {
  const clickCTA = () => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_ichiran",
      label: "msl_banner",
      value: 1,
    });
  };
  return (
    <button className={styles.container} onClick={clickCTA}>
      <div className={styles.image}>
        <Image
          src={"/ms-library/images/bottom-banner.png"}
          width={650}
          height={167}
          alt={"未公開物件を不動産会社から紹介"}
        />
      </div>
      <div className={styles.bottom}>
        <p className={styles.texts}>
          未公開物件に1番に申し込みができる！
          <br />
          Housiiは複数の不動産会社からあなたにあった物件を提案するサービスです。良質な未公開物件に1番早く申し込むことができます。
        </p>
      </div>
      <div className={styles.btn_container}>
        <div className={styles.btn}>まずは無料会員登録で希望を伝えてみる</div>
      </div>
    </button>
  );
};

export default BottomCTA;
