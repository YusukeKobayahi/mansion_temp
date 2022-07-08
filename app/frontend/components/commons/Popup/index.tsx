import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import styles from "~/components/commons/Popup/index.module.scss";
import { PopupContext } from "~/components/Context/PopupContext";
import { clickMembers } from "~/lib/utils";

type PopupProps = {
  pages?: string;
  isPopup?: boolean;
};

const Popup: React.FC<PopupProps> = ({ pages, isPopup }: PopupProps) => {
  const clickCTA = () => {
    clickMembers({
      action: "msl_cta_click",
      category: "msl_popup",
      label: "msl_popup_button",
      value: 1,
    });
  };

  const [popupState, setPopupState] = useState(false || isPopup);
  const { isAlradyPopup, setIsAlradyPopup } = useContext(PopupContext);

  const closePopupState = () => {
    setPopupState(false);
    history.back();
  };

  useEffect(() => {
    if (pages == "cities" || pages == "mansions") {
      if (/google\.|yahoo\./.test(document.referrer)) {
        if (location.hash !== "#google" && !isAlradyPopup) {
          setIsAlradyPopup(true);
          history.pushState(null, "", location.href + "#google_popup");
          history.pushState(null, "", location.href);
          location.replace("#google");
        }
      }
      const popstateListener = () => {
        if (location.hash == "#google_popup") {
          setPopupState(true);
        }
      };
      window.addEventListener("popstate", popstateListener);
      return () => {
        window.removeEventListener("popstate", popstateListener);
      };
    }
  }, [pages]);
  return (
    <>
      {popupState && (
        <section className={styles.container}>
          <button onClick={closePopupState} className={styles.mask}></button>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <button onClick={closePopupState} className={styles.close}>
                <Image
                  src={"/ms-library/images/close.png"}
                  alt={"×"}
                  width={27}
                  height={27}
                />
              </button>
              <div className={styles.title}>
                <div className={styles.text}>
                  <div className={styles.decolation}>
                    <Image
                      src={"/ms-library/images/decolation.png"}
                      alt={"×"}
                      width={60}
                      height={62}
                    />
                  </div>
                  <span className={styles.large}>60</span>秒
                  <span className={styles.small}>で</span>
                  簡単登録
                </div>
              </div>
              <p className={styles.description}>
                Housiiの<span>無料会員</span>になると・・・
              </p>
              <div className={styles.columns}>
                <div className={styles.column}>
                  <Image
                    src={"/ms-library/images/deliver.png"}
                    alt={"未公開無料物件をお届け"}
                    width={100}
                    height={100}
                  />
                  <p>
                    Housiiだけの <br />
                    未公開物件
                    <br className={"spOnly"} />
                    などの
                    <br />
                    優良物件を
                    <br className={"spOnly"} />
                    お届け
                  </p>
                </div>
                <div className={styles.column}>
                  <Image
                    src={"/ms-library/images/offer.png"}
                    alt={"あなたにあった物件をオファー！"}
                    width={96}
                    height={105}
                  />
                  <p>
                    待ってるだけで
                    <br />
                    あなたにあった物件を
                    <br />
                    オファー！
                  </p>
                </div>
                <div className={styles.column}>
                  <Image
                    src={"/ms-library/images/news.png"}
                    alt={"販売情報をいち早くお知らせ"}
                    width={103}
                    height={100}
                  />
                  <p>
                    気になる物件の
                    <br />
                    販売情報を
                    <br />
                    いち早く
                    <br className={"spOnly"} />
                    お知らせ
                  </p>
                </div>
              </div>
              <div className={styles.cta}>
                <p>＼ メルアド登録から！ ／</p>
                <button className={styles.btn} onClick={clickCTA}>
                  無料で会員登録はこちら
                  <div className={styles.arrow}>
                    <Image
                      src={"/ms-library/images/arrow.png"}
                      alt={"→"}
                      width={30}
                      height={30}
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Popup;
