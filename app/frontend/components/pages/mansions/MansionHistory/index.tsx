import { useEffect, useState } from "react";
import { useDeepCompareMemo } from "use-deep-compare";
import compact from "lodash/compact";
import styles from "./index.module.scss";
import SalesSummaryBuilder, {
  LayoutSummary,
} from "~/lib/mansions/SalesSummaryBuilder";
import {
  buildLibraryPagePath,
  buildAccess,
  buildConstructedDate,
} from "~/lib/utils";
import { MsLibraryMansionsMansionHistoryFragment } from "~/graphql/generated";
import MansionSlider from "~/components/pages/mansions/MansionSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import { GoogleAnalyticsEvent } from "~/lib/types";

export interface MansionHistoryProps {
  data: MsLibraryMansionsMansionHistoryFragment;
}

type MansionDataProps = {
  href?: string;
  name?: string;
  address?: string;
  salesInfo?: LayoutSummary[];
  constructedDate?: string;
  access?: string;
};

const MansionHistory: React.FC<MansionHistoryProps> = ({
  data,
}: MansionHistoryProps) => {
  const mansion = data;
  const href = buildLibraryPagePath("mansions", mansion.uniqueCode);
  const name = mansion.name;
  const builder = new SalesSummaryBuilder(mansion.salesHistorySummaries);
  const salesInfo = builder.buildLayoutSummaries();
  const access = buildAccess(mansion.access);
  const constructedDate = buildConstructedDate(
    mansion.constructedIn,
    mansion.age
  );
  const address = compact([
    mansion.prefecture.name,
    mansion.city.name,
    mansion.town.name,
    mansion.street?.name,
    mansion.blockNumber,
  ]).join("");

  const mansionData: MansionDataProps = {
    href,
    name,
    address,
    salesInfo,
    constructedDate,
    access,
  };
  const maxStrageNum = 10;
  const updateMansionHistory = () => {
    try {
      let mansionHistory: MansionDataProps[] = JSON.parse(
        localStorage.getItem("mansionHistory")
          ? String(localStorage.getItem("mansionHistory"))
          : "[]"
      );
      mansionHistory = mansionHistory.filter(
        (el) => el.href !== mansionData.href
      );
      mansionHistory.push(mansionData);
      if (mansionHistory.length > maxStrageNum)
        mansionHistory = mansionHistory.slice(0, maxStrageNum);
      localStorage.setItem("mansionHistory", JSON.stringify(mansionHistory));
    } catch {
      // ESLintでエラーが出てしまうため、コメントアウト
    }
  };
  const [mansionHistory, setMansionHistory] = useState<MansionDataProps[]>([]);
  useEffect(() => {
    updateMansionHistory();
    let mansionHistory;
    try {
      mansionHistory = JSON.parse(
        localStorage.getItem("mansionHistory")
          ? String(localStorage.getItem("mansionHistory"))
          : "[]"
      );
    } catch {
      mansionHistory = [];
    }
    setMansionHistory(mansionHistory);
  }, [mansion.uniqueCode]);

  const displayMansionHistory = [...mansionHistory].reverse().splice(1);
  const eventParams: GoogleAnalyticsEvent = {
    action: "msl_link_click",
    category: "msl_shosai",
    label: "msl_history_bukken",
    value: 1,
  };
  const mansionCards = useDeepCompareMemo(() => {
    return displayMansionHistory.map(
      ({ href, name, constructedDate, salesInfo, address, access }) => {
        return {
          href,
          name,
          constructedDate,
          salesInfo,
          address,
          access,
          eventParams,
        };
      }
    );
  }, [mansionHistory]);

  return mansionCards.length > 0 ? (
    <section className={styles.container}>
      <BoxHeading>確認した物件</BoxHeading>
      <MansionSlider mansionCards={mansionCards} />
    </section>
  ) : null;
};

export default MansionHistory;
