import compact from "lodash/compact";
import styles from "./index.module.scss";
import SalesSummaryBuilder from "~/lib/mansions/SalesSummaryBuilder";
import {
  buildLibraryPagePath,
  buildAccess,
  buildConstructedDate,
} from "~/lib/utils";
import { MsLibraryTownsLinkedBuildingsFragment } from "~/graphql/generated";
import MansionSlider from "~/components/pages/mansions/MansionSlider";
import BoxHeading from "~/components/commons/headings/BoxHeading";
import { GoogleAnalyticsEvent } from "~/lib/types";

export interface MansionHistoryProps {
  data: MsLibraryTownsLinkedBuildingsFragment;
}

const MansionHistory: React.FC<MansionHistoryProps> = ({
  data,
}: MansionHistoryProps) => {
  if (!data.linkedBuildings || data.linkedBuildings.length === 0) return null;

  const mansions = data.linkedBuildings;

  const eventParams: GoogleAnalyticsEvent = {
    action: "msl_link_click",
    category: "msl_shosai",
    label: "msl_history_bukken",
    value: 1,
  };

  const mansionCards = mansions.map((mansion) => {
    const href = buildLibraryPagePath("mansions", mansion.uniqueCode);
    const constructedDate = buildConstructedDate(
      mansion.constructedIn,
      mansion.age
    );
    const builder = new SalesSummaryBuilder(mansion.salesHistorySummaries);
    const salesInfo = builder.buildLayoutSummaries();
    const address = compact([
      mansion.prefecture.name,
      mansion.city.name,
      mansion.town.name,
      mansion.street?.name,
      mansion.blockNumber,
    ]).join("");
    const access = buildAccess(mansion.access);
    return {
      href: href,
      name: mansion.name,
      constructedDate: constructedDate,
      salesInfo: salesInfo,
      address: address,
      access: access,
      eventParams: eventParams,
    };
  });

  return mansionCards.length > 0 ? (
    <section className={styles.container}>
      <BoxHeading>
        {data.city.prefecture.name}
        {data.city.name}
        {data.name}
        のおすすめのマンション
      </BoxHeading>
      <MansionSlider mansionCards={mansionCards} />
    </section>
  ) : null;
};

export default MansionHistory;
