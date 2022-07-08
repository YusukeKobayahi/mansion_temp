import { useEffect, useState } from "react";
import { clickMembers } from "~/lib/utils";
import classnames from "classnames";
import styles from "./index.module.scss";
import { GoogleAnalyticsEvent } from "~/lib/types";

type FloatCTAProps = {
  uniqueCode: string;
};

const FloatCTA: React.FC<FloatCTAProps> = ({ uniqueCode }: FloatCTAProps) => {
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
  }, [uniqueCode]);
  const clickCTA = (label: GoogleAnalyticsEvent["label"]) => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_shosai",
      label: label,
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
      <div className={styles.inner}>
        <button
          className={classnames(styles.btn, styles.formBtn)}
          onClick={() => clickCTA("msl_flooting_left")}
        >
          この物件の最新情報を
          <br className={"spOnly"} />
          受け取る
        </button>
        <button
          className={classnames(styles.btn, styles.lpBtn)}
          onClick={() => clickCTA("msl_flooting_right")}
        >
          未公開物件の
          <br className={"spOnly"} />
          提案を手に入れる
        </button>
      </div>
    </section>
  );
};

export default FloatCTA;
