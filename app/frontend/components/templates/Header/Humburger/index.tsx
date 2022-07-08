import Link from "next/link";
import { useState } from "react";
import classnames from "classnames";
import { clickMembers } from "~/lib/utils";
import { useToggles } from "~/components/Context/ToggleContext";
import { GoogleAnalyticsEvent } from "~/lib/types";
import Item from "~/components/templates/Header/Humburger/Item";
import ButtonRect from "~/components/commons/ButtonRect";
import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import FindFromLines from "~/components/templates/Header/Humburger/FindFromLines";
import FindFromSchools from "~/components/templates/Header/Humburger/FindFromSchools";
import FindFromBrands from "~/components/templates/Header/Humburger/FindFromBrands";

import prefecturesList from "~/components/molecules/Search/prefectureList.json";
import styles from "./index.module.scss";

type TabType = "findMansions" | "usefulInfo";

const Humburger: React.FC = () => {
  const { toggle: isOpen, setToggle: setIsOpen } = useToggles();
  const [tabState, setTabState] = useState<TabType>("findMansions");

  const onClickMembersEvent = (label: GoogleAnalyticsEvent["label"]) => {
    clickMembers({
      category: "msl_hamburger",
      action: "msl_cta_click",
      label: label,
      value: 1,
    });
  };

  return (
    <>
      <div className={styles.open}>
        <button onClick={() => setIsOpen(true)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div
        className={classnames(
          styles.container,
          isOpen ? "visible" : "invisible"
        )}
      >
        <div className={styles.close}>
          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <Link href={"/"} as={"/"} prefetch={false}>
              <Item text={"マンションライブラリーTOP"} underline={"solid"} />
            </Link>
          </div>
          <div className={styles.tabArea}>
            <div className={styles.tabContent}>
              <ButtonRect
                text="物件を探す"
                color={"dark-brown"}
                outline={tabState !== "findMansions"}
                onClick={() => setTabState("findMansions")}
              />
              <ButtonRect
                text="お役立ち情報"
                color={"dark-brown"}
                outline={tabState !== "usefulInfo"}
                onClick={() => setTabState("usefulInfo")}
              />
            </div>
          </div>
          <div className={styles.body}>
            <div
              className={classnames(
                styles.findMansions,
                tabState === "findMansions" ? "visible" : "invisible"
              )}
            >
              <AccordionItem text={"エリアから探す"} underline="solid">
                {prefecturesList.prefectures.map(({ name, jisCode }, i) => (
                  <Link
                    key={i}
                    href={`/prefectures/[jisCode]`}
                    as={`/prefectures/${jisCode}`}
                    passHref
                  >
                    <Item
                      text={name}
                      underline={"dashed"}
                      fontSize="sm"
                      onClick={() => setIsOpen(false)}
                    />
                  </Link>
                ))}
              </AccordionItem>
              <FindFromLines />
              <FindFromSchools />
              <FindFromBrands />
            </div>
            <div
              className={classnames(
                styles.usefulInfo,
                tabState === "usefulInfo" ? "visible" : "invisible"
              )}
            >
              <a href="/column">
                <Item text={"コラムを見る"} underline="solid" />
              </a>
            </div>
            <div className={styles.commons}>
              <Item
                text={
                  <>
                    未公開物件を含む理想の物件
                    <br />
                    を探している方はこちら
                  </>
                }
                underline={"solid"}
                onClick={() => onClickMembersEvent("msl_mikokai")}
              />
              <Item
                text={
                  <>
                    複数の不動産会社から物件を
                    <br />
                    提案して欲しい方はこちら
                  </>
                }
                underline={"solid"}
                onClick={() => onClickMembersEvent("msl_mikokai")}
              />
              <Item
                text={"マンション売却を検討中の方はこちら"}
                underline={"solid"}
                onClick={() => onClickMembersEvent("msl_mansion_buy")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Humburger;
