import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { clickMembers } from "~/lib/utils";
import classnames from "classnames";

const PopupCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowY, setWindowY] = useState(0);

  const updateWindow = () => (window ? setWindowY(window.scrollY) : undefined);
  useEffect(() => {
    if (window) addEventListener("scroll", updateWindow);
    return () => removeEventListener("scroll", updateWindow);
  }, []);

  const clickCTA = () => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_ichiran",
      label: "msl_pop_top",
      value: 1,
    });
  };
  const id = "popupCta";
  const isScrollOvered = () => {
    const popup = document.getElementById(id);
    if (!popup) return false;
    const popupY = popup.offsetTop;
    return popupY < windowY;
  };
  useEffect(() => {
    const from = sessionStorage.getItem("from");
    if (from && isScrollOvered()) setIsVisible(true);
  }, [windowY]);

  return (
    <div id={id}>
      {isVisible && (
        <section className={styles.container}>
          <button
            className={styles.mask}
            onClick={() => {
              setIsVisible(false);
              sessionStorage.removeItem("from");
            }}
          ></button>
          <div className={styles.main}>
            <div className={styles.inner}>
              <button
                className={styles.close}
                onClick={() => {
                  setIsVisible(false);
                  sessionStorage.removeItem("from");
                }}
              >
                ×
              </button>
              <p className={styles.title}>
                ＼ ここには掲載していない未公開物件があります！／
              </p>
              <button
                className={classnames(styles.btn, styles.cta)}
                onClick={clickCTA}
              >
                会員登録してオファー限定情報を手に入れる
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PopupCTA;
