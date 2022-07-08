import { useDeepCompareMemo } from "use-deep-compare";
import compact from "lodash/compact";
import styles from "./index.module.scss";
import SalesSummaryBuilder from "~/lib/mansions/SalesSummaryBuilder";
import {
  buildLibraryPagePath,
  buildAccess,
  buildConstructedDate,
} from "~/lib/utils";
import { MsLibraryMansionsSimilarMansionsFragment } from "~/graphql/generated";
import MansionSlider from "~/components/pages/mansions/MansionSlider";
import SidelineHeading from "~/components/commons/headings/SidelineHeading";
import { GoogleAnalyticsEvent } from "~/lib/types";

export interface SimilarMansionsProps {
  data: MsLibraryMansionsSimilarMansionsFragment;
}

const SimilarMansions: React.FC<SimilarMansionsProps> = ({
  data,
}: SimilarMansionsProps) => {
  const mansions = compact(
    data?.similarMansions?.edges?.map((edge) =>
      edge !== null ? edge.node : null
    )
  );

  const eventParams: GoogleAnalyticsEvent = {
    action: "msl_link_click",
    category: "msl_shosai",
    label: "msl_near_bukken",
    value: 1,
  };

  const mansionCards = useDeepCompareMemo(() => {
    return mansions.map((mansion) => {
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

      return {
        href,
        name,
        constructedDate,
        salesInfo,
        address,
        access,
        eventParams,
      };
    });
  }, [mansions]);

  return (
    <section className={styles.container}>
      <h3>
        <SidelineHeading>この物件に似ている物件</SidelineHeading>
      </h3>
      <MansionSlider mansionCards={mansionCards} />
    </section>
  );
};

export default SimilarMansions;
