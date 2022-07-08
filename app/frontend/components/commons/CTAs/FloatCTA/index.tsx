import { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";

type FloatCTAProps = {
  page: "msl_ichiran" | "msl_prefectures";
};

const FloatCTA: React.FC<FloatCTAProps> = ({ page }: FloatCTAProps) => {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    const scrollEvent = () => {
      if (window.pageYOffset > 0) setDisplay(true);
      else setDisplay(false);
    };
    window.addEventListener("scroll", scrollEvent);

    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  const clickCTA = () => {
    clickMembers({
      action: "msl_cta_click",
      category: page,
      label: "msl_lp_flooting",
      value: 1,
    });
  };
  return (
    <section
      className={classnames(
        styles.container,
        display ? styles.displayStyle : ""
      )}
    >
      <p className={styles.description}>
        ＼ 複数の不動産会社があなたの理想の物件を提案／
      </p>
      <button className={styles.btn} onClick={clickCTA}>
        <span>
          完全
          <br />
          無料
        </span>
        まずは希望の条件を登録してみる
      </button>
    </section>
  );
};

export default FloatCTA;
